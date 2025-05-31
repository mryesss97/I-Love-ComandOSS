import { IFetcher, Fetcher } from '@suiEarnLish/fetcher';
export class LessonService {
  constructor(private fetcher: IFetcher = new Fetcher()) {}

  async submitLessonScore(data: {
    sentenceId: string;
    score: number;
    address: string;
  }) {
    console.log('walletAddress', { data });
    return this.fetcher.post('/api/lesson/submit', data);
  }

  async getLeaderboard() {
    return this.fetcher.get('/api/lesson/leaderboard');
  }

  async getLessonScoreByUser(address: string): Promise<{ score: number }> {
    return this.fetcher.get(`/api/lesson/score?address=${address}`);
  }

 
}
