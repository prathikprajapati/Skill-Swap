import type { Response } from "express";
import { validationResult } from "express-validator";
import { PrismaClient, SkillType } from "@prisma/client";

import type { AuthRequest } from "../types/auth";

const prisma = new PrismaClient();

export const getSkills = async (req: AuthRequest, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: "asc" },
    });

    res.json(skills);
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addUserSkill = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { skill_id, skill_type, proficiency_level } = req.body;

    // Check if skill exists
    const skill = await prisma.skill.findUnique({
      where: { id: skill_id },
    });

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    // Check if user already has this skill
    const existingSkill = await prisma.userSkill.findUnique({
      where: {
        user_id_skill_id_skill_type: {
          user_id: userId,
          skill_id,
          skill_type: skill_type as SkillType,
        },
      },
    });

    if (existingSkill) {
      return res.status(409).json({ error: "User already has this skill" });
    }

    const userSkill = await prisma.userSkill.create({
      data: {
        user_id: userId,
        skill_id,
        skill_type: skill_type as SkillType,
        proficiency_level: proficiency_level || "beginner",
      },
      include: {
        skill: true,
      },
    });

    res.status(201).json(userSkill);
  } catch (error) {
    console.error("Add user skill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeUserSkill = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const skillId = req.params.id;

    const userSkill = await prisma.userSkill.findFirst({
      where: {
        id: skillId,
        user_id: userId,
      },
    });

    if (!userSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    await prisma.userSkill.delete({
      where: { id: skillId },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Remove user skill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserSkills = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userSkills = await prisma.userSkill.findMany({
      where: { user_id: userId },
      include: {
        skill: true,
      },
      orderBy: { created_at: "desc" },
    });

    res.json(userSkills);
  } catch (error) {
    console.error("Get user skills error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
