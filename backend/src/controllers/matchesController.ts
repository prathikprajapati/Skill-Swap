import type { Response } from "express";
import { PrismaClient } from "@prisma/client";

import type { AuthRequest } from "../types/auth";

const prisma = new PrismaClient();

export const getRecommendedMatches = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get current user's skills
    const userSkills = await prisma.userSkill.findMany({
      where: { user_id: userId },
      include: { skill: true },
    });

    const offeredSkillIds = userSkills
      .filter((us) => us.skill_type === "offer")
      .map((us) => us.skill_id);

    const wantedSkillIds = userSkills
      .filter((us) => us.skill_type === "want")
      .map((us) => us.skill_id);

    // Get existing matches to exclude
    const existingMatches = await prisma.match.findMany({
      where: {
        OR: [{ user1_id: userId }, { user2_id: userId }],
      },
    });
    const matchedUserIds = existingMatches.map((m) =>
      m.user1_id === userId ? m.user2_id : m.user1_id,
    );

    // Get pending requests to exclude
    const pendingRequests = await prisma.matchRequest.findMany({
      where: {
        OR: [
          { sender_id: userId, status: "pending" },
          { receiver_id: userId, status: "pending" },
        ],
      },
    });
    const requestedUserIds = pendingRequests.map((r) =>
      r.sender_id === userId ? r.receiver_id : r.sender_id,
    );

    // Combine excluded user IDs
    const excludedUserIds = [...matchedUserIds, ...requestedUserIds, userId];

    // Find users who have skills we want and want skills we offer
    const potentialMatches = await prisma.user.findMany({
      where: {
        AND: [
          { id: { notIn: excludedUserIds } },
          {
            OR: [
              // Users who offer skills we want
              {
                user_skills: {
                  some: {
                    skill_id: { in: wantedSkillIds },
                    skill_type: "offer",
                  },
                },
              },
              // Users who want skills we offer
              {
                user_skills: {
                  some: {
                    skill_id: { in: offeredSkillIds },
                    skill_type: "want",
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        user_skills: {
          where: {
            OR: [{ skill_type: "offer" }, { skill_type: "want" }],
          },
          include: { skill: true },
        },
      },
      take: 20,
    });

    // Calculate match scores
    const matchesWithScores = potentialMatches.map((user) => {
      const userOfferedSkills = user.user_skills.filter(
        (us) => us.skill_type === "offer",
      );
      const userWantedSkills = user.user_skills.filter(
        (us) => us.skill_type === "want",
      );
      const userOfferedSkillIds = userOfferedSkills.map((us) => us.skill_id);
      const userWantedSkillIds = userWantedSkills.map((us) => us.skill_id);

      // Get matched offers (user offers what we want)
      const matchedOffers = userOfferedSkills
        .filter((us) => wantedSkillIds.includes(us.skill_id))
        .map((us) => us.skill.name);

      // Get matched wants (user wants what we offer)
      const matchedWants = userWantedSkills
        .filter((us) => offeredSkillIds.includes(us.skill_id))
        .map((us) => us.skill.name);

      // Mutual matches count
      const mutualMatches = matchedOffers.length + matchedWants.length;

      // Skill overlap
      const allUserSkills = [...userOfferedSkillIds, ...userWantedSkillIds];
      const allCurrentSkills = [...offeredSkillIds, ...wantedSkillIds];
      const overlap = allUserSkills.filter((id) =>
        allCurrentSkills.includes(id),
      ).length;
      const maxSkills = Math.max(allUserSkills.length, allCurrentSkills.length);
      const skillOverlap = maxSkills > 0 ? overlap / maxSkills : 0;

      // Profile completion
      const profileCompletion = user.profile_completion / 100;

      // Calculate score (0-100 integer)
      const rawScore =
        mutualMatches * 0.5 + skillOverlap * 0.3 + profileCompletion * 0.2;
      const score = Math.round(rawScore * 100);

      return {
        userId: user.id,
        score,
        matchedOffers,
        matchedWants,
        name: user.name,
        avatar: user.avatar,
        profile_completion: user.profile_completion,
      };
    });

    // Sort by score (descending), then by profile completion
    const sortedMatches = matchesWithScores
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.profile_completion - a.profile_completion;
      })
      .slice(0, 10);

    res.json(sortedMatches);
  } catch (error) {
    console.error("Get recommended matches error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
