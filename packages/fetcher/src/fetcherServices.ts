const SIGNATURE = "ALXaX/F5lx7TE0DzKucuFQEAcVydcO7I8wjoSmX/PLdwzwa+jsNdPIAFI7opG4SLyhW6p8SKMM1l+1Pwl4UtFgF1vBmH9uGyk1OMdmL1hnxVjYBSe9dxCIby4PmLywtesg=="

export class Fetcher {
  constructor(private baseUrl = 'https://suiearnlish.onrender.com') {}

  async get<T = any>(path: string, headers: HeadersInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': SIGNATURE,
        ...headers,
      },
    });
    return res.json() as Promise<T>;
  }

  async post<T = any>(path: string, body: any, headers: HeadersInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': SIGNATURE,
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return res.json() as Promise<T>;
  }

  async upload<T = any>(
    path: string,
    file: Blob | File,
    fieldName = 'file',
    extraFields?: Record<string, string>
  ): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    // Add extra fields like originalText
    if (extraFields) {
      for (const [key, value] of Object.entries(extraFields)) {
        formData.append(key, value);
      }
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: formData,
      headers: {
        'x-signature': SIGNATURE,
      },
    });

    return res.json() as Promise<T>;
  }
}

export type IFetcher = InstanceType<typeof Fetcher>;