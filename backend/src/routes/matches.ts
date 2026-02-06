import { Router } from 'express';
import { getRecommendedMatches } from '../controllers/matchesController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All match routes require authentication
router.use(authenticateToken);

// GET /matches/recommended - Get recommended matches
router.get('/recommended', getRecommendedMatches);

export default router;
