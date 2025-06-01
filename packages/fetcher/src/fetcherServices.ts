import { getLocalStorage, StorageKeys } from '@suiEarnLish/utils';

export class Fetcher {
  private baseUrl: string;
  private signature?: string | null;

  constructor(baseUrl = 'https://suiearnlish.onrender.com', signature?: string) {
    this.baseUrl = baseUrl;
    this.signature =
      signature || (getLocalStorage(StorageKeys.SIGNATURE) as string);
  }

  async get<T = any>({
    path,
    headers = {},
  }: {
    path: string;
    headers?: HeadersInit & { 'x-signature'?: string };
  }) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': this.signature as string,
        ...headers,
      },
    });
    return res.json() as Promise<T>;
  }

  async post<T = any>({
    path,
    body,
    headers = {},
  }: {
    path: string;
    body: any;
    headers?: HeadersInit & { 'x-signature'?: string };
  }) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': this.signature as string,
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return res.json() as Promise<T>;
  }

  async upload<T = any>({
    path,
    file,
    fieldName = 'file',
    extraFields,
  }: {
    path: string;
    file: Blob | File;
    fieldName?: string;
    extraFields?: Record<string, string>;
  }): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (extraFields) {
      for (const [key, value] of Object.entries(extraFields)) {
        formData.append(key, value);
      }
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: formData,
      headers: {
        'x-signature': this.signature as string,
      },
    });

    return res.json() as Promise<T>;
  }
}

export type IFetcher = InstanceType<typeof Fetcher>;
