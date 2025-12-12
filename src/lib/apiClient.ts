import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {storage} from './storage';

const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.API_BASE_URL) || 'http://localhost:4000';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Token ekleme
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await storage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor - Error handling
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<ApiResponse<unknown>>) => {
        if (error.response) {
          // Server responded with error
          const status = error.response.status;
          
          if (status === 401) {
            // Unauthorized - Clear token and redirect to login
            await storage.removeItem('auth_token');
            // You can dispatch a logout action here if using a global state
          }

          // Return the error response
          return Promise.reject(error);
        } else if (error.request) {
          // Request made but no response
          return Promise.reject(new Error('Network error. Please check your connection.'));
        } else {
          // Something else happened
          return Promise.reject(error);
        }
      },
    );
  }

  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Unknown error');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          throw new Error(apiError.error || error.message || 'Unknown error');
        }
        if (error.request) {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw error;
    }
  }

  async post<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data, config);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Unknown error');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          throw new Error(apiError.error || error.message || 'Unknown error');
        }
        if (error.request) {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw error;
    }
  }

  async put<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error || 'Unknown error');
  }

  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error || 'Unknown error');
  }

  async setToken(token: string | null) {
    if (token) {
      await storage.setItem('auth_token', token);
    } else {
      await storage.removeItem('auth_token');
    }
  }

  async getToken(): Promise<string | null> {
    return await storage.getItem('auth_token');
  }
}

export const apiClient = new ApiClient();

