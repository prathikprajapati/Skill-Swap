import { Router } from "express";
import { body } from "express-validator";
import { authenticateToken, requireActiveUser } from "../middleware/auth";

import {
  getUserStats,
  getXPHistory,
  getLeaderboard,
  awardXP,
  updateStreak,
} from "../controllers/gamificationController";

const router = Router();

// Get user's gamification stats
// Requires active (non-deleted) user
router.get("/stats", authenticateToken, requireActiveUser, getUserStats);

// Award XP to user
// This is an internal endpoint - validates whitelist of allowed actions
router.post(
  "/xp/award",
  [
    body("action").optional().isString(),
    body("amount").optional().isInt({ min: 1, max: 1000 }),
  ],
  authenticateToken,
  requireActiveUser,
  awardXP
);

// Get XP transaction history
// XP can only be earned via domain events (achievements, matches)
// No public endpoint to award XP - prevents exploitation
router.get("/xp/history", authenticateToken, requireActiveUser, getXPHistory);

// Update streak
router.post(
  "/streak",
  authenticateToken,
  requireActiveUser,
  updateStreak
);

// Get leaderboard
// Requires active (non-deleted) user
router.get("/leaderboard", authenticateToken, requireActiveUser, getLeaderboard);

export default router;
