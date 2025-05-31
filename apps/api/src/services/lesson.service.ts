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
      res.status(400).json({ error: 'Missing address in query' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { wallet: userAddress },
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const allUserScores = await prisma.answer.groupBy({
      by: ['userId'],
      _sum: { score: true },
      orderBy: { _sum: { score: 'desc' } },
    });

    const currentUserScore = allUserScores.find(
      (entry) => entry.userId === user.id
    );

    const rank =
      allUserScores.findIndex((entry) => entry.userId === user.id) + 1;

    const answers = await prisma.answer.findMany({
      where: { userId: user.id },
    });

    const totalScore = currentUserScore?._sum.score || 0;

    res.json({
      totalScore,
      count: answers.length,
      rank,
    });
  } catch (err) {
    next(err);
  }
};

export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const address = req.query.address as string | undefined;

    const allScores = await prisma.answer.groupBy({
      by: ['userId'],
      _sum: { score: true },
      orderBy: { _sum: { score: 'desc' } },
    });

    const leaderboard = await Promise.all(
      allScores.slice(0, 10).map(async (entry, index) => {
        const user = await prisma.user.findUnique({
          where: { id: entry.userId },
        });

        return {
          rank: index + 1,
          wallet: user?.wallet || 'Unknown',
          score: entry._sum.score,
        };
      })
    );

    let currentUser = null;

    if (address) {
      const user = await prisma.user.findUnique({
        where: { wallet: address },
      });

      if (user) {
        const rankIndex = allScores.findIndex((s) => s.userId === user.id);
        const score = allScores[rankIndex]?._sum.score || 0;

        currentUser = {
          rank: rankIndex + 1,
          wallet: address,
          score,
        };
      }
    }

    res.json({ leaderboard, currentUser });
  } catch (err) {
    console.error('[getLeaderboard]', err);
    next(err);
  }
};
