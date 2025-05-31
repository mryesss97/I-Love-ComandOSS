import { Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { OPENAI_API_KEY } from '../config/env';
import { compareText } from '../utils/compare';

export const handleTranscribe = async (req: Request, res: Response): Promise<void> => {
  const audioFile = req.file;
  const { originalText } = req.body;

  if (!audioFile || !originalText) {
    res.status(400).json({ error: 'Missing audio or originalText' });
    return;
  }

  // Step 1: Send to Whisper
  const formData = new FormData();
  formData.append('file', fs.createReadStream(audioFile.path));
  formData.append('model', 'whisper-1');

  try {
    const whisperRes = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    const transcribedText = whisperRes.data.text;

    // Step 2: Compare
    const result = compareText(originalText, transcribedText);

    // Step 3: Return feedback
    res.json({
      transcribedText,
      ...result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
};