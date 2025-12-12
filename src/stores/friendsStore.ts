import {create} from 'zustand';
import {User} from '../types/user';
import {friendsApi} from '../services/api/friendsApi';

interface FriendsState {
  friends: User[];
  searchResults: User[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchFriends: () => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  addFriend: (friendId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  clearSearch: () => void;
  clearError: () => void;
}

export const useFriendsStore = create<FriendsState>((set) => ({
  friends: [],
  searchResults: [],
  loading: false,
  error: null,

  fetchFriends: async () => {
    try {
      set({loading: true, error: null});
      const friendList = await friendsApi.getFriends();
      const friends = friendList.map((f) => f.friend);
      set({friends, loading: false, error: null});
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Arkadaşlar yüklenemedi',
      });
    }
  },

  searchUsers: async (query: string) => {
    try {
      if (!query.trim()) {
        set({searchResults: []});
        return;
      }

      set({loading: true, error: null});
      const users = await friendsApi.searchUsers(query);
      set({searchResults: users, loading: false, error: null});
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Arama başarısız',
        searchResults: [],
      });
    }
  },

  addFriend: async (friendId: string) => {
    try {
      set({loading: true, error: null});
      const response = await friendsApi.addFriend(friendId);
      set((state) => ({
        friends: [...state.friends, response.friend],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Arkadaş eklenemedi',
      });
      throw error;
    }
  },

  removeFriend: async (friendId: string) => {
    try {
      set({loading: true, error: null});
      await friendsApi.removeFriend(friendId);
      set((state) => ({
        friends: state.friends.filter((f) => f.id !== friendId),
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Arkadaşlık kaldırılamadı',
      });
      throw error;
    }
  },

  clearSearch: () => {
    set({searchResults: []});
  },

  clearError: () => {
    set({error: null});
  },
}));

