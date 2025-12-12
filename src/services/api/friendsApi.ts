import {apiClient} from '../../lib/apiClient';
import {User} from '../../types/user';

export interface Friend {
  id: string;
  friend: User;
  createdAt: string;
}

export const friendsApi = {
  /**
   * Arkadaş listesini getir
   */
  async getFriends(): Promise<Friend[]> {
    return await apiClient.get<Friend[]>('/friends');
  },

  /**
   * Kullanıcı ara
   */
  async searchUsers(query: string): Promise<User[]> {
    return await apiClient.get<User[]>(`/friends/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Arkadaş ekle
   */
  async addFriend(friendId: string): Promise<{success: boolean; friend: User}> {
    return await apiClient.post<{success: boolean; friend: User}>('/friends', {
      friendId,
    });
  },

  /**
   * Arkadaşlığı kaldır
   */
  async removeFriend(friendId: string): Promise<{success: boolean}> {
    return await apiClient.delete<{success: boolean}>(`/friends/${friendId}`);
  },
};

