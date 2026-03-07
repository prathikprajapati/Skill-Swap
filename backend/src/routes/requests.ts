import { Router } from "express";
import { body, param } from "express-validator";
import {
  sendRequest,
  getIncomingRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  cancelRequest,
} from "../controllers/requestsController";
import { authenticateToken, requireActiveUser } from "../middleware/auth";

const router = Router();

// All request routes require authentication AND active (non-deleted) user
router.use(authenticateToken);
router.use(requireActiveUser);

// POST /requests - Send match request
// receiver_id must be a valid UUID to prevent Prisma 500 errors
router.post("/", [body("receiver_id").isUUID()], sendRequest);

// GET /requests/incoming - List incoming requests
router.get("/incoming", getIncomingRequests);

// GET /requests/sent - List sent requests
router.get("/sent", getSentRequests);

// PUT /requests/:id/accept - Accept request
router.put("/:id/accept", [param("id").isUUID()], acceptRequest);

// PUT /requests/:id/reject - Reject request
router.put("/:id/reject", [param("id").isUUID()], rejectRequest);

// PATCH /requests/:id - Cancel a pending request (sender only)
router.patch("/:id", [param("id").isUUID()], cancelRequest);

export default router;
