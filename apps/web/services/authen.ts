import { IFetcher, Fetcher } from '@suiEarnLish/fetcher';
export class AuthenticationService {
  constructor(private fetcher: IFetcher = new Fetcher()) {}

  async verifyUser(data: { address: string; signature: string }) {
    return this.fetcher.post({ path: '/api/auth/verify', body: data });
  }
}
