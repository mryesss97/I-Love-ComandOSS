// src/routes/result.route.ts
import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, score, type } = req.body;

  try {
    const result = await prisma.result.create({
      data: {
        userId,
        score,
        type,
      },
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

export default router;