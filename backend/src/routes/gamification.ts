import { Router } from "express";
import { authenticateToken, requireActiveUser } from "../middleware/auth";

import {
  getUserStats,
  getXPHistory,
  getLeaderboard,
} from "../controllers/gamificationController";

const router = Router();

// Get user's gamification stats
// Requires active (non-deleted) user
router.get("/stats", authenticateToken, requireActiveUser, getUserStats);

// Get XP transaction history
// XP can only be earned via domain events (achievements, matches)
// No public endpoint to award XP - prevents exploitation
router.get("/xp/history", authenticateToken, requireActiveUser, getXPHistory);

// Get leaderboard
// Requires active (non-deleted) user
router.get("/leaderboard", authenticateToken, requireActiveUser, getLeaderboard);

export default router;
