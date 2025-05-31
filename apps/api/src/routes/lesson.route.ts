import { Router } from 'express';

import { getSentences, submitAnswer } from '../services/lesson.service';
import { verifySignatureMiddleware } from '../middlewares/verifySignature';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/lesson/sentences
router.get('/sentences', getSentences);
router.post('/submit', verifySignatureMiddleware, asyncHandler(submitAnswer));
export default router;
