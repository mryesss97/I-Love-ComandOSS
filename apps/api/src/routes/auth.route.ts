import { Router } from 'express';
import { verifyLogin } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/verify', asyncHandler(verifyLogin));

export default router;