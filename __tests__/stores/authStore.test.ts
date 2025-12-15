import {renderHook, act} from '@testing-library/react';
import {useAuthStore} from '../../src/stores/authStore';
import {authApi} from '../../src/services/api/authApi';

// Mock authApi
jest.mock('../../src/services/api/authApi');

describe('AuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have initial state', () => {
    const {result} = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('should login successfully', async () => {
    const mockUser = {id: '1', email: 'test@test.com', name: 'Test User', gender: 'male' as const};
    const mockResponse = {user: mockUser, token: 'test-token'};

    (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

    const {result} = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login({email: 'test@test.com', password: 'password'});
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe('test-token');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should handle login error', async () => {
    const mockError = new Error('Login failed');
    (authApi.login as jest.Mock).mockRejectedValue(mockError);

    const {result} = renderHook(() => useAuthStore());

    await act(async () => {
      try {
        await result.current.login({email: 'test@test.com', password: 'wrong'});
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});

