import {create} from 'zustand';
import {User, LoginInput, RegisterInput} from '../types/user';
import {authApi} from '../services/api/authApi';
import {apiClient} from '../lib/apiClient';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (input: LoginInput) => {
    try {
      set({loading: true, error: null});
      const response = await authApi.login(input);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Giriş başarısız',
        isAuthenticated: false,
        user: null,
        token: null,
      });
      throw error;
    }
  },

  register: async (input: RegisterInput) => {
    try {
      set({loading: true, error: null});
      const response = await authApi.register(input);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Kayıt başarısız',
        isAuthenticated: false,
        user: null,
        token: null,
      });
      throw error;
    }
  },

  logout: async () => {
    await authApi.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  loadUser: async () => {
    try {
      const token = await apiClient.getToken();
      if (!token) {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        return;
      }

      set({loading: true});
      const user = await authApi.getMe();
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      // Token geçersiz, logout yap
      await authApi.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  },

  clearError: () => {
    set({error: null});
  },
}));

