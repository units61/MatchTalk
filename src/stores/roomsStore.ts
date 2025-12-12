import {create} from 'zustand';
import {Room, CreateRoomInput} from '../types/room';
import {roomsApi} from '../services/api/roomsApi';

interface RoomsState {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchRooms: () => Promise<void>;
  createRoom: (input: CreateRoomInput) => Promise<Room>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  setCurrentRoom: (room: Room | null) => void;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  clearError: () => void;
}

export const useRoomsStore = create<RoomsState>((set, get) => ({
  rooms: [],
  currentRoom: null,
  loading: false,
  error: null,

  fetchRooms: async () => {
    try {
      set({loading: true, error: null});
      const rooms = await roomsApi.getRooms();
      set({rooms, loading: false, error: null});
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Odalar yüklenemedi',
      });
    }
  },

  createRoom: async (input: CreateRoomInput) => {
    try {
      set({loading: true, error: null});
      const room = await roomsApi.createRoom(input);
      set((state) => ({
        rooms: [room, ...state.rooms],
        currentRoom: room,
        loading: false,
        error: null,
      }));
      return room;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Oda oluşturulamadı',
      });
      throw error;
    }
  },

  joinRoom: async (roomId: string) => {
    try {
      set({loading: true, error: null});
      const room = await roomsApi.joinRoom(roomId);
      set((state) => ({
        rooms: state.rooms.map((r) => (r.id === roomId ? room : r)),
        currentRoom: room,
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Odaya katılamadı',
      });
      throw error;
    }
  },

  leaveRoom: async (roomId: string) => {
    try {
      set({loading: true, error: null});
      await roomsApi.leaveRoom(roomId);
      set((state) => ({
        rooms: state.rooms.filter((r) => r.id !== roomId),
        currentRoom: state.currentRoom?.id === roomId ? null : state.currentRoom,
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Odadan ayrılamadı',
      });
      throw error;
    }
  },

  setCurrentRoom: (room: Room | null) => {
    set({currentRoom: room});
  },

  updateRoom: (roomId: string, updates: Partial<Room>) => {
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === roomId ? {...r, ...updates} : r)),
      currentRoom:
        state.currentRoom?.id === roomId
          ? {...state.currentRoom, ...updates}
          : state.currentRoom,
    }));
  },

  clearError: () => {
    set({error: null});
  },
}));

