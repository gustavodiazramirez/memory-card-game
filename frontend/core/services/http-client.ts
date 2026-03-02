import { API_CONFIG } from "../config/api.config";
import { tokenService } from "./token.service";

interface RequestConfig extends RequestInit {
  _retry?: boolean;
}

class HttpClient {
  private baseURL: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private processQueue(error: Error | null, token: string | null = null): void {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = tokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${this.baseURL}/sessions/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;

    tokenService.setAccessToken(newAccessToken);
    
    // Si el backend devuelve un nuevo refreshToken, actualizarlo también
    if (data.refreshToken) {
      tokenService.setTokens(newAccessToken, data.refreshToken);
    }

    return newAccessToken;
  }

  private async handleUnauthorized(
    url: string,
    config: RequestConfig,
  ): Promise<Response> {
    if (config._retry) {
      tokenService.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Authentication failed");
    }

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      }).then(() => {
        return this.request(url, { ...config, _retry: true });
      });
    }

    this.isRefreshing = true;
    config._retry = true;

    try {
      const newToken = await this.refreshToken();
      this.processQueue(null, newToken);
      this.isRefreshing = false;
      return this.request(url, config);
    } catch (error) {
      this.processQueue(error as Error, null);
      this.isRefreshing = false;
      tokenService.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw error;
    }
  }

  async request(url: string, config: RequestConfig = {}): Promise<Response> {
    const accessToken = tokenService.getAccessToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Merge existing headers
    if (config.headers) {
      const existingHeaders = new Headers(config.headers);
      existingHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    }

    if (accessToken && !config._retry) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    const response = await fetch(fullUrl, {
      ...config,
      headers,
    });

    if (response.status === 401 && !config._retry) {
      return this.handleUnauthorized(url, config);
    }

    return response;
  }

  async get(url: string, config?: RequestConfig): Promise<Response> {
    return this.request(url, { ...config, method: "GET" });
  }

  async post(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response> {
    return this.request(url, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<Response> {
    return this.request(url, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(url: string, config?: RequestConfig): Promise<Response> {
    return this.request(url, { ...config, method: "DELETE" });
  }
}

export const httpClient = new HttpClient(API_CONFIG.BASE_URL);
