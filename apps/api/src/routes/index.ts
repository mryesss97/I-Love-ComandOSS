import { Router } from 'express';
import resultRoute from './result.route';
import transcribeRoute from './transcribe.route';
import lessonRoute from './lesson.route';
import authRoute from './auth.route';


const router = Router();

router.use('/auth', authRoute);
router.use('/result', resultRoute);
router.use('/transcribe', transcribeRoute);
router.use('/lesson', lessonRoute);

export default router;