import { Router } from 'express';
import { body, param } from 'express-validator';
import { getSkills, addUserSkill, removeUserSkill, getUserSkills } from '../controllers/skillsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /skills - List all available skills
router.get('/', getSkills);

// All user skill routes require authentication
router.use(authenticateToken);

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
