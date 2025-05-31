import { IFetcher, Fetcher } from '@suiEarnLish/fetcher';
export class LessonService {
  constructor(private fetcher: IFetcher = new Fetcher()) {}

  async submitLessonScore(data: {
    lessonId: string;
    score: number;
    walletAddress: string;
  }) {
    return this.fetcher.post('/api/lessons/submit', data);
  }

  async getLeaderboard() {
    return this.fetcher.get('/api/leaderboard');
  }
}
