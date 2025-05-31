export class Fetcher {
  constructor(private baseUrl = 'http://localhost:9898/') {}

  async get<T = any>(path: string, headers: HeadersInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
    });
    return res.json() as Promise<T>;
  }

  async post<T = any>(path: string, body: any, headers: HeadersInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return res.json() as Promise<T>;
  }

  async upload<T = any>(path: string, file: Blob | File, fieldName = 'file') {
    const formData = new FormData();
    formData.append(fieldName, file);

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: formData,
    });

    return res.json() as Promise<T>;
  }
}

export type IFetcher = InstanceType<typeof Fetcher>