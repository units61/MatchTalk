import { CreateRoomInput, JoinRoomInput } from '../schemas/rooms';
export declare class RoomsService {
    /**
     * Aktif odaları listeleme
     */
    getActiveRooms(): Promise<{
        id: string;
        name: string;
        category: string;
        maxParticipants: number;
        currentParticipants: number;
        timeLeftSec: number;
        durationSec: number;
        extended: boolean;
        participants: {
            id: string;
            name: string;
            gender: string;
        }[];
        maleCount: number;
        femaleCount: number;
        createdAt: Date;
    }[]>;
    /**
     * Oda oluşturma
     */
    createRoom(userId: string, input: CreateRoomInput): Promise<{
        id: string;
        name: string;
        category: string;
        maxParticipants: number;
        currentParticipants: number;
        timeLeftSec: number;
        durationSec: number;
        participants: {
            id: string;
            name: string;
            gender: string;
        }[];
        maleCount: number;
        femaleCount: number;
        createdAt: Date;
    }>;
    /**
     * Odaya katılma
     */
    joinRoom(userId: string, input: JoinRoomInput): Promise<{
        id: string;
        name: string;
        category: string;
        maxParticipants: number;
        currentParticipants: number;
        timeLeftSec: number;
        durationSec: number;
        participants: {
            id: string;
            name: string;
            gender: string;
        }[];
        maleCount: number;
        femaleCount: number;
        createdAt: Date;
    }>;
    /**
     * Odadan ayrılma
     */
    leaveRoom(userId: string, roomId: string): Promise<{
        success: boolean;
    }>;
    /**
     * Oda detaylarını getirme
     */
    getRoomById(roomId: string): Promise<{
        id: string;
        name: string;
        category: string;
        maxParticipants: number;
        currentParticipants: number;
        timeLeftSec: number;
        durationSec: number;
        extended: boolean;
        extensionYes: number;
        extensionNo: number;
        participants: {
            id: string;
            name: string;
            gender: string;
        }[];
        maleCount: number;
        femaleCount: number;
        createdAt: Date;
    }>;
}
export declare const roomsService: RoomsService;
//# sourceMappingURL=roomsService.d.ts.map