import {apiClient} from '../../lib/apiClient';
import {User, LoginResponse, RegisterInput, LoginInput} from '../../types/user';

export const authApi = {
  /**
   * Kullanıcı kaydı
   */
  async register(input: RegisterInput): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register', input);
    // Token'ı kaydet
    await apiClient.setToken(response.token);
    return response;
  },

  /**
   * Kullanıcı girişi
   */
  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[authApi] Login request:', input);
      }
      const response = await apiClient.post<LoginResponse>('/auth/login', input);
      if (process.env.NODE_ENV === 'development') {
        console.log('[authApi] Login response:', response);
      }
      // Token'ı kaydet
      await apiClient.setToken(response.token);
      return response;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[authApi] Login error:', error);
      }
      throw error;
    }
  },

  /**
   * Mevcut kullanıcı bilgilerini getir
   */
  async getMe(): Promise<User> {
    return await apiClient.get<User>('/auth/me');
  },

  /**
   * Çıkış yap
   */
  async logout(): Promise<void> {
    await apiClient.setToken(null);
  },
};

