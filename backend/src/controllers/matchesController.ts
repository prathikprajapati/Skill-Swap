import type { Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import type { AuthRequest } from '../types/auth';

const prisma = new PrismaClient();

export const getRecommendedMatches = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get current user's skills
    const userSkills = await prisma.userSkill.findMany({
      where: { user_id: userId },
      include: { skill: true }
    });

    const offeredSkillIds = userSkills
      .filter(us => us.skill_type === 'offer')
      .map(us => us.skill_id);

    const wantedSkillIds = userSkills
      .filter(us => us.skill_type === 'want')
      .map(us => us.skill_id);

    // Find users who have skills we want and want skills we have
    const potentialMatches = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            OR: [
              // Users who offer skills we want
              {
                offered_skills: {
                  some: {
                    skill_id: { in: wantedSkillIds }
                  }
                }
              },
              // Users who want skills we offer
              {
                wanted_skills: {
                  some: {
                    skill_id: { in: offeredSkillIds }
                  }
                }
              }
            ]
          }
        ]
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        profile_completion: true,
        offered_skills: {
          include: { skill: true }
        },
        wanted_skills: {
          include: { skill: true }
        }
      },
      take: 20
    });

    // Calculate match scores
    const matchesWithScores = potentialMatches.map(user => {
      const userOfferedSkillIds = user.offered_skills.map(us => us.skill_id);
      const userWantedSkillIds = user.wanted_skills.map(us => us.skill_id);

      // Mutual matches
      const mutualOffers = userOfferedSkillIds.filter(id => wantedSkillIds.includes(id)).length;
      const mutualWants = userWantedSkillIds.filter(id => offeredSkillIds.includes(id)).length;
      const mutualMatches = mutualOffers + mutualWants;

      // Skill overlap
      const allUserSkills = [...userOfferedSkillIds, ...userWantedSkillIds];
      const allCurrentSkills = [...offeredSkillIds, ...wantedSkillIds];
      const overlap = allUserSkills.filter(id => allCurrentSkills.includes(id)).length;
      const maxSkills = Math.max(allUserSkills.length, allCurrentSkills.length);
      const skillOverlap = maxSkills > 0 ? overlap / maxSkills : 0;

      // Profile completion
      const profileCompletion = user.profile_completion / 100;

      // Calculate score
      const score = (mutualMatches * 0.5) + (skillOverlap * 0.3) + (profileCompletion * 0.2);

      return {
        ...user,
        match_score: Math.round(score * 100) / 100,
        mutual_matches: mutualMatches,
        skill_overlap: Math.round(skillOverlap * 100)
      };
    });

    // Sort by score and return top matches
    const sortedMatches = matchesWithScores
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 10);

    res.json(sortedMatches);
  } catch (error) {
    console.error('Get recommended matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
