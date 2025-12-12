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
    const response = await apiClient.post<LoginResponse>('/auth/login', input);
    // Token'ı kaydet
    await apiClient.setToken(response.token);
    return response;
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

