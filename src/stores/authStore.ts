import {create} from 'zustand';
import {
  User,
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
  ChangePasswordInput,
  ChangeEmailInput,
} from '../types/user';
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
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
  changePassword: (input: ChangePasswordInput) => Promise<void>;
  changeEmail: (input: ChangeEmailInput) => Promise<void>;
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

      // Validate token format (basic check)
      if (!isValidTokenFormat(token)) {
        console.warn('[AuthStore] Invalid token format, logging out');
        await authApi.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
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
      // Token geçersiz veya expired, logout yap
      console.warn('[AuthStore] Token validation failed, logging out:', error);
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

  updateProfile: async (input: UpdateProfileInput) => {
    set({loading: true, error: null});
    try {
      const user = await authApi.updateProfile(input);
      set({user, loading: false});
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Profil güncellenemedi',
      });
      throw error;
    }
  },

  changePassword: async (input: ChangePasswordInput) => {
    set({loading: true, error: null});
    try {
      await authApi.changePassword(input);
      set({loading: false});
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Şifre değiştirilemedi',
      });
      throw error;
    }
  },

  changeEmail: async (input: ChangeEmailInput) => {
    set({loading: true, error: null});
    try {
      const result = await authApi.changeEmail(input);
      set((state) => ({
        user: state.user ? {...state.user, email: result.email} : state.user,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'E-posta değiştirilemedi',
      });
      throw error;
    }
  },
}));

/**
 * Basic token format validation
 * JWT tokens typically have 3 parts separated by dots
 */
function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Basic JWT format check (3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }
  
  // Check if parts are not empty
  return parts.every(part => part.length > 0);
}

// Make authStore available globally for apiClient interceptor
if (typeof window !== 'undefined') {
  (window as any).authStore = useAuthStore;
}

