import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from './config';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
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
            // Unauthorized - Clear token and redirect to login
            await AsyncStorage.removeItem('auth_token');
            // You can dispatch a logout action here if using a global state
          }

          // Return the error response
          return Promise.reject(error);
        } else if (error.request) {
          // Request made but no response
          return Promise.reject(new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.'));
        } else {
          // Something else happened
          return Promise.reject(error);
        }
      },
    );
  }

  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] GET ${url}`);
      }

      const response = await this.client.get<ApiResponse<T>>(url, config);
      
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

  async post<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] POST ${url}`, data);
      }

      const response = await this.client.post<ApiResponse<T>>(url, data, config);
      
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

  async put<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] PUT ${url}`, data);
      }

      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      
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

  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      // Development modda request loglama
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] DELETE ${url}`);
      }

      const response = await this.client.delete<ApiResponse<T>>(url, config);
      
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

