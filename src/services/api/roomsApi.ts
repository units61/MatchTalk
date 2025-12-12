import {apiClient} from '../../lib/apiClient';
import {Room, CreateRoomInput} from '../../types/room';

export const roomsApi = {
  /**
   * Aktif odaları listele
   */
  async getRooms(): Promise<Room[]> {
    return await apiClient.get<Room[]>('/rooms');
  },

  /**
   * Oda detaylarını getir
   */
  async getRoomById(id: string): Promise<Room> {
    return await apiClient.get<Room>(`/rooms/${id}`);
  },

  /**
   * Oda oluştur
   */
  async createRoom(input: CreateRoomInput): Promise<Room> {
    return await apiClient.post<Room>('/rooms', input);
  },

  /**
   * Odaya katıl
   */
  async joinRoom(roomId: string): Promise<Room> {
    return await apiClient.post<Room>(`/rooms/${roomId}/join`);
  },

  /**
   * Odadan ayrıl
   */
  async leaveRoom(roomId: string): Promise<{success: boolean}> {
    return await apiClient.post<{success: boolean}>(`/rooms/${roomId}/leave`);
  },
};

