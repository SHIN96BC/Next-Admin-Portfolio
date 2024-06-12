interface HTTPInstance {
  get<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  delete<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  head<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  options<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  post<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R>;
  put<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R>;
  patch<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R>;
}

interface FileInstance {
  fileUpload(
    url: string,
    data: FormData,
    config?: RequestInit,
  ):Promise<boolean>;
}

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  public file: FileInstance;

  public token?: string;

  constructor() {
    this.baseURL = `${process.env.API_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };

    this.file = {
      fileUpload: this.fileUpload.bind(this),
    }
  }

  public setToken (token: string) {
    this.token = token;
  }

  private async request<R = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<R> {
    try {
      const headers: HeadersInit & { Authorization?: string } = {
        ...this.headers,
        'Content-Type': 'application/json',
        ...config?.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(this.baseURL + url, {
        method,
        headers: headers,
        // credentials: 'include',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: R = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private async fileRequest(
    method: string,
    url: string,
    data: FormData,
    config?: RequestInit,
  ): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.headers,
          // 'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
        // credentials: 'include',
        body: data,
        ...config,
      });

      console.log('response = ', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // const responseData: R = await response.json();
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R> {
    return this.request<R>('POST', url, data, config);
  }

  private put<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R> {
    return this.request<R>('PUT', url, data, config);
  }

  private patch<T, R>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R> {
    return this.request<R>('PATCH', url, data, config);
  }

  private fileUpload(
    url: string,
    data: FormData,
    config?: RequestInit,
  ) {
    return this.fileRequest('POST', url, data, config);
  }
}

export default Service;