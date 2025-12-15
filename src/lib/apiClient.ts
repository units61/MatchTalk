import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from './config';
import {handleError, createErrorHandler} from '../utils/errorHandler';
import {API_CONFIG} from '../constants/app';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition?: (error: AxiosError) => boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  retries: API_CONFIG.RETRY_ATTEMPTS,
  retryDelay: API_CONFIG.RETRY_DELAY,
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status < 600) ||
      error.code === 'ECONNABORTED' || // Timeout
      error.code === 'ERR_NETWORK' // Network error
    );
  },
};

class ApiClient {
  private client: AxiosInstance;
  private errorHandler = createErrorHandler({component: 'ApiClient'});

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Retry request with exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      const axiosError = error as AxiosError;
      
      // Check if we should retry
      if (
        attempt <= retryConfig.retries &&
        retryConfig.retryCondition?.(axiosError)
      ) {
        // Calculate delay with exponential backoff
        const delay = retryConfig.retryDelay * Math.pow(2, attempt - 1);
        
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
        
        // Retry
        return this.retryRequest(requestFn, retryConfig, attempt + 1);
      }
      
      // No more retries, throw error
      throw error;
    }
  }

  private setupInterceptors() {
    // Request interceptor - Token ekleme
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('auth_token');
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
            // Unauthorized - Try to refresh token first (if refresh endpoint exists)
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
              try {
                // TODO: Implement token refresh when backend endpoint is available
                // const {authApi} = await import('../services/api/authApi');
                // await authApi.refreshToken();
                // Retry the original request
                // return this.client.request(error.config!);
              } catch (refreshError) {
                // Refresh failed, clear token and logout
                await AsyncStorage.removeItem('auth_token');
                // Dispatch logout action if available
                if (typeof window !== 'undefined' && (window as any).authStore) {
                  (window as any).authStore.getState().logout();
                }
              }
            } else {
              await AsyncStorage.removeItem('auth_token');
            }
          }

          // Use error handler for user-friendly messages
          const {userMessage} = this.errorHandler(error, {
            action: 'api_request',
            additionalData: {
              status,
              url: error.config?.url,
            },
          });

          // Create new error with user-friendly message
          const apiError = error.response.data as ApiResponse<unknown>;
          const errorMessage = apiError?.error || userMessage;
          const enhancedError = new Error(errorMessage);
          (enhancedError as any).status = status;
          (enhancedError as any).originalError = error;
          
          return Promise.reject(enhancedError);
        } else if (error.request) {
          // Request made but no response
          const {userMessage} = this.errorHandler(error, {
            action: 'api_request',
            additionalData: {
              url: error.config?.url,
            },
          });
          return Promise.reject(new Error(userMessage));
        } else {
          // Something else happened
          const {userMessage} = this.errorHandler(error, {
            action: 'api_request',
          });
          return Promise.reject(new Error(userMessage));
        }
      },
    );
  }

  async get<T>(url: string, config?: InternalAxiosRequestConfig, retryConfig?: RetryConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] GET ${url}`);
      }

      const response = await this.retryRequest(
        () => this.client.get<ApiResponse<T>>(url, config),
        retryConfig
      );
      
      // Development modda response loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] GET ${url} Response:`, response.data);
      }

      // Response format kontrolü
      if (!response.data) {
        throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
      }

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'İşlem başarısız oldu');
    } catch (error) {
      // Development modda hata loglama
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] GET ${url} Error:`, error);
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          const errorMessage = apiError.error || error.message || 'Bilinmeyen bir hata oluştu';
          throw new Error(errorMessage);
        }
        if (error.request) {
          throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Beklenmeyen bir hata oluştu');
    }
  }

  async post<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig, retryConfig?: RetryConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] POST ${url}`, data);
      }

      const response = await this.retryRequest(
        () => this.client.post<ApiResponse<T>>(url, data, config),
        retryConfig
      );
      
      // Development modda response loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] POST ${url} Response:`, response.data);
      }

      // Response format kontrolü
      if (!response.data) {
        throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
      }

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      // success: false durumu
      throw new Error(response.data.error || 'İşlem başarısız oldu');
    } catch (error) {
      // Development modda hata loglama
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] POST ${url} Error:`, error);
        if (error instanceof AxiosError && error.response) {
          console.error(`[API] POST ${url} Response Status:`, error.response.status);
          console.error(`[API] POST ${url} Response Data:`, JSON.stringify(error.response.data, null, 2));
          console.error(`[API] POST ${url} Response Headers:`, error.response.headers);
        }
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          // Backend'den gelen hata mesajını kullan
          // Eğer response.data bir object ise ve error property'si varsa kullan
          let errorMessage = 'Bilinmeyen bir hata oluştu';
          
          if (apiError && typeof apiError === 'object') {
            // ApiResponse formatı: {success: false, error: "..."}
            if ('error' in apiError && typeof apiError.error === 'string') {
              errorMessage = apiError.error;
            } else if ('message' in apiError && typeof apiError.message === 'string') {
              errorMessage = apiError.message;
            }
          } else if (typeof apiError === 'string') {
            errorMessage = apiError;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          throw new Error(errorMessage);
        }
        if (error.request) {
          throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
        }
      }
      // Eğer error zaten bir Error instance ise, olduğu gibi fırlat
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Beklenmeyen bir hata oluştu');
    }
  }

  async put<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig, retryConfig?: RetryConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] PUT ${url}`, data);
      }

      const response = await this.retryRequest(
        () => this.client.put<ApiResponse<T>>(url, data, config),
        retryConfig
      );
      
      // Development modda response loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] PUT ${url} Response:`, response.data);
      }

      // Response format kontrolü
      if (!response.data) {
        throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
      }

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'İşlem başarısız oldu');
    } catch (error) {
      // Development modda hata loglama
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] PUT ${url} Error:`, error);
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          const errorMessage = apiError.error || error.message || 'Bilinmeyen bir hata oluştu';
          throw new Error(errorMessage);
        }
        if (error.request) {
          throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Beklenmeyen bir hata oluştu');
    }
  }

  async delete<T>(url: string, config?: InternalAxiosRequestConfig, retryConfig?: RetryConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] DELETE ${url}`);
      }

      const response = await this.retryRequest(
        () => this.client.delete<ApiResponse<T>>(url, config),
        retryConfig
      );
      
      // Development modda response loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] DELETE ${url} Response:`, response.data);
      }

      // Response format kontrolü
      if (!response.data) {
        throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
      }

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'İşlem başarısız oldu');
    } catch (error) {
      // Development modda hata loglama
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] DELETE ${url} Error:`, error);
      }

      if (error instanceof AxiosError) {
        if (error.response?.data) {
          const apiError = error.response.data as ApiResponse<unknown>;
          const errorMessage = apiError.error || error.message || 'Bilinmeyen bir hata oluştu';
          throw new Error(errorMessage);
        }
        if (error.request) {
          throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Beklenmeyen bir hata oluştu');
    }
  }

  async setToken(token: string | null) {
    if (token) {
      await AsyncStorage.setItem('auth_token', token);
    } else {
      await AsyncStorage.removeItem('auth_token');
    }
  }

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  }
}

export const apiClient = new ApiClient();

