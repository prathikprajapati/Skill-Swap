import { Router } from 'express';
import { body, param } from 'express-validator';
import { sendRequest, getIncomingRequests, getSentRequests, acceptRequest, rejectRequest } from '../controllers/requestsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All request routes require authentication
router.use(authenticateToken);

// POST /requests - Send match request
router.post('/',
  [
    body('receiver_id').isUUID()
  ],
  sendRequest
);

// GET /requests/incoming - List incoming requests
router.get('/incoming', getIncomingRequests);

// GET /requests/sent - List sent requests
router.get('/sent', getSentRequests);

// PUT /requests/:id/accept - Accept request
router.put('/:id/accept',
  [param('id').isUUID()],
  acceptRequest
);

// PUT /requests/:id/reject - Reject request
router.put('/:id/reject',
  [param('id').isUUID()],
  rejectRequest
);

export default router;
