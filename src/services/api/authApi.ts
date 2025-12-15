import {apiClient} from '../../lib/apiClient';
import {
  User,
  LoginResponse,
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
  ChangeEmailInput,
} from '../../types/user';

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

  /**
   * Profil güncelle
   */
  async updateProfile(input: UpdateProfileInput): Promise<User> {
    const updated = await apiClient.put<User>('/users/profile', input);
    return updated;
  },

  /**
   * Şifre değiştir
   */
  async changePassword(input: ChangePasswordInput): Promise<{success: boolean}> {
    return await apiClient.put<{success: boolean}>('/users/password', input);
  },

  /**
   * E-posta değiştir
   */
  async changeEmail(input: ChangeEmailInput): Promise<{success: boolean; email: string}> {
    return await apiClient.put<{success: boolean; email: string}>('/users/email', input);
  },

  /**
   * Token yenileme (backend endpoint hazır olduğunda kullanılacak)
   */
  async refreshToken(): Promise<LoginResponse> {
    // TODO: Backend'de /auth/refresh endpoint'i eklendiğinde implement edilecek
    const response = await apiClient.post<LoginResponse>('/auth/refresh');
    await apiClient.setToken(response.token);
    return response;
  },
};

