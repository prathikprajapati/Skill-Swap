import { Router } from "express";
import { body } from "express-validator";
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/userController";
import { authenticateToken, requireActiveUser } from "../middleware/auth";
import { uploadAvatar, handleUploadError } from "../middleware/upload";

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

// GET /users/me - Get current user profile
// Requires active (non-deleted) user
router.get("/me", requireActiveUser, getProfile);

// PUT /users/me - Update user profile (with optional avatar upload)
// Requires active (non-deleted) user
router.put(
  "/me",
  requireActiveUser,
  uploadAvatar,
  handleUploadError,
  [body("name").optional().trim().isLength({ min: 1, max: 255 })],
  updateProfile,
);

// PATCH /users/me - Soft delete user account
router.patch("/me", deleteAccount);

export default router;
