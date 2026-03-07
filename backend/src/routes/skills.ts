import { Router } from 'express';
import { body, param } from 'express-validator';
import { getSkills, addUserSkill, removeUserSkill, getUserSkills } from '../controllers/skillsController';
import { authenticateToken, requireActiveUser } from '../middleware/auth';

const router = Router();

// GET /skills - List all available skills (public, no auth required)
router.get('/', getSkills);

// All user skill routes require authentication AND active (non-deleted) user
router.use(authenticateToken);
router.use(requireActiveUser);

// POST /users/me/skills - Add skill to user profile
router.post('/users/me/skills',
  [
    body('skill_id').isUUID(),
    body('skill_type').isIn(['offer', 'want']),
    body('proficiency_level').optional().isIn(['beginner', 'intermediate', 'expert'])
  ],
  addUserSkill
);

// DELETE /users/me/skills/:id - Remove skill from user profile
router.delete('/users/me/skills/:id',
  [param('id').isUUID()],
  removeUserSkill
);

// GET /users/me/skills - Get user's skills
router.get('/users/me/skills', getUserSkills);

export default router;
