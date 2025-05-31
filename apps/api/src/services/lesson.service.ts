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

export const getUserLessonScore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userAddress = req.query.address as string;
    if (!userAddress) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { wallet: userAddress },
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const answers = await prisma.answer.findMany({
      where: { userId: user.id },
    });

    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    res.json({ totalScore, count: answers.length });
  } catch (err) {
    next(err);
  }
};

export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.answer.groupBy({
      by: ['userId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
      take: 10,
    });

    const enriched = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await prisma.user.findUnique({
          where: { id: entry.userId },
        });
        return {
          wallet: user?.wallet,
          totalScore: entry._sum.score,
        };
      })
    );

    res.json({ leaderboard: enriched });
  } catch (err) {
    console.error('[getLeaderboard]', err);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
};
