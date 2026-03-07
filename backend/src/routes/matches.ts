import { Router } from "express";
import { param, body } from "express-validator";
import {
  getRecommendedMatches,
  getMyMatches,
  updateMatchStatus,
} from "../controllers/matchesController";

import {
  getMessages,
  sendMessage,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messagesController";
import { authenticateToken, requireActiveUser } from "../middleware/auth";

const router = Router();

// All match routes require authentication AND active (non-deleted) user
router.use(authenticateToken);
router.use(requireActiveUser);

// GET /matches/recommended - Get recommended matches
router.get("/recommended", getRecommendedMatches);

// GET /matches - Get user's accepted matches
router.get("/", getMyMatches);

// PATCH /matches/:id - Update match status (archive/unmatch)
router.patch("/:id", [param("id").isUUID()], updateMatchStatus);

// GET /matches/:id/messages - Get messages for a match
router.get("/:id/messages", [param("id").isUUID()], getMessages);

export default router;

// Separate router for message operations at root level
export const messagesRouter = Router();
messagesRouter.use(authenticateToken);
messagesRouter.use(requireActiveUser);

// POST /messages - Send message
messagesRouter.post(
  "/",
  [
    body("match_id").isUUID(),
    body("content").trim().isLength({ min: 1, max: 1000 }),
  ],
  sendMessage,
);

// PUT /messages/:id/read - Mark message as read
messagesRouter.put("/:id/read", [param("id").isUUID()], markMessageAsRead);

// DELETE /messages/:id - Delete a message (sender only)
messagesRouter.delete("/:id", [param("id").isUUID()], deleteMessage);
