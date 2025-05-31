import { IFetcher, Fetcher } from '@suiEarnLish/fetcher';
export class LessonService {
  constructor(private fetcher: IFetcher = new Fetcher()) {}

  async submitLessonScore(data: {
    sentenceId: string;
    score: number;
    address: string;
  }) {
    return this.fetcher.post('/api/lesson/submit', data);
  }

  async getLeaderboard(address?: string) {
    return this.fetcher.get(`/api/lesson/leaderboard?address=${address}`);
  }

  async getLessonScoreByUser(address: string): Promise<{ score: number }> {
    return this.fetcher.get(`/api/lesson/score?address=${address}`);
  }
}
