import { Router } from "express";
import { body } from "express-validator";
import { getProfile, updateProfile } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import { uploadAvatar, handleUploadError } from "../middleware/upload";

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

// GET /users/me - Get current user profile
router.get("/me", getProfile);

// PUT /users/me - Update user profile (with optional avatar upload)
router.put(
  "/me",
  uploadAvatar,
  handleUploadError,
  [body("name").optional().trim().isLength({ min: 1, max: 255 })],
  updateProfile,
);

export default router;
