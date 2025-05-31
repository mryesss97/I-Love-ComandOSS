import { Router } from 'express';
import { uploadAudio } from '../middlewares/upload.middleware';
import { handleTranscribe } from '../services/transcribe.service';

const router = Router();

router.post('/', uploadAudio.single('audio'), handleTranscribe);

export default router;