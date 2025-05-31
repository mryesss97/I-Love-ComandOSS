import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getSentences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sentences = await prisma.sentence.findMany({
      take: 10,
      orderBy: { createdAt: 'asc' },
    });

    res.json(sentences);
  } catch (err) {
    console.error('[getSentences] Error:', err);
    res.status(500).json({ error: 'Failed to fetch sentences' });
  }
};

export const submitAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sentenceId, score, address } = req.body;

  if (!address) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { wallet: address },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const answer = await prisma.answer.create({
    data: {
      userId: user.id,
      sentenceId,
      score,
    },
  });

  res.json({ success: true, answer });
};
