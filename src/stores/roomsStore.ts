import {create} from 'zustand';
import {Room, CreateRoomInput} from '../types/room';
import {roomsApi} from '../services/api/roomsApi';

interface RoomsState {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  fetching: boolean; // Separate loading state for fetch operations
  creating: boolean; // Separate loading state for create operations
  joining: boolean; // Separate loading state for join operations
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
  fetching: false,
  creating: false,
  joining: false,
  error: null,

  fetchRooms: async () => {
    try {
      set({fetching: true, error: null});
      const rooms = await roomsApi.getRooms();
      set({rooms, fetching: false, loading: false, error: null});
    } catch (error) {
      set({
        fetching: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Odalar yüklenemedi',
      });
    }
  },

  createRoom: async (input: CreateRoomInput) => {
    try {
      set({creating: true, loading: true, error: null});
      
      // Eğer kullanıcı zaten bir odadaysa, önce o odadan ayrıl
      const state = get();
      if (state.currentRoom) {
        console.log(`[RoomsStore] Kullanıcı zaten ${state.currentRoom.id} odasında. Önce odadan ayrılıyor...`);
        try {
          await roomsApi.leaveRoom(state.currentRoom.id);
          console.log(`[RoomsStore] Başarıyla ${state.currentRoom.id} odasından ayrıldı`);
          // State'i güncelle
          set((prevState) => ({
            rooms: prevState.rooms.filter((r) => r.id !== state.currentRoom!.id),
            currentRoom: null,
          }));
        } catch (leaveError) {
          console.warn(`[RoomsStore] Odadan ayrılırken hata oluştu:`, leaveError);
          // Odadan ayrılma hatası kritik değil, yeni oda oluşturmayı denemeye devam et
        }
      }
      
      // Yeni oda oluştur
      const room = await roomsApi.createRoom(input);
      set((state) => ({
        rooms: [room, ...state.rooms],
        currentRoom: room,
        creating: false,
        loading: false,
        error: null,
      }));
      console.log(`[RoomsStore] Yeni oda oluşturuldu: ${room.id}`);
      return room;
    } catch (error) {
      set({
        creating: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Oda oluşturulamadı',
      });
      console.error(`[RoomsStore] Oda oluşturma hatası:`, error);
      throw error;
    }
  },

  joinRoom: async (roomId: string) => {
    try {
      set({joining: true, loading: true, error: null});
      const room = await roomsApi.joinRoom(roomId);
      set((state) => ({
        rooms: state.rooms.map((r) => (r.id === roomId ? room : r)),
        currentRoom: room,
        joining: false,
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        joining: false,
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

