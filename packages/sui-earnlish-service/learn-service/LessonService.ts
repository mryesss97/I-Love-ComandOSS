import { IFetcher, Fetcher } from '@suiEarnLish/fetcher';
export class LessonService {
  fetcher: IFetcher;
  constructor({
    signature,
    baseUrl = 'http://localhost:9898',
  }: {
    signature?: string;
    baseUrl?: string;
  }) {
    this.fetcher = new Fetcher(baseUrl, signature);
  }

  async submitLessonScore(data: {
    sentenceId: string;
    score: number;
    address: string;
  }) {
    return this.fetcher.post({ path: '/api/lesson/submit', body: data });
  }

  async getLeaderboard(address?: string) {
    return this.fetcher.get({
      path: `/api/lesson/leaderboard?address=${address}`,
    });
  }

  async getLessonScoreByUser(address: string): Promise<{ score: number }> {
    return this.fetcher.get({
      path: `/api/lesson/score?address=${address}`,
    });
  }
}

export type ILessonService = InstanceType<typeof LessonService>;
