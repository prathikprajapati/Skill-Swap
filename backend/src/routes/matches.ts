import { Router } from "express";
import { param, body } from "express-validator";
import { getRecommendedMatches } from "../controllers/matchesController";
import {
  getMessages,
  sendMessage,
  markMessageAsRead,
} from "../controllers/messagesController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// All match routes require authentication
router.use(authenticateToken);

// GET /matches/recommended - Get recommended matches
router.get("/recommended", getRecommendedMatches);

// GET /matches/:id/messages - Get messages for a match
router.get("/:id/messages", [param("id").isUUID()], getMessages);

export default router;

// Separate router for message operations at root level
export const messagesRouter = Router();
messagesRouter.use(authenticateToken);

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
