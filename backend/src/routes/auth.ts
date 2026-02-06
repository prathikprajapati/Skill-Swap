import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

// POST /auth/signup
router.post('/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().isLength({ min: 1, max: 255 })
  ],
  register
);

// POST /auth/login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 1 })
  ],
  login
);

export default router;
