import { Server as SocketIOServer } from 'socket.io';
export declare class MatchingService {
    private io;
    private QUEUE_MALE;
    private QUEUE_FEMALE;
    /**
     * WebSocket server'ı set et
     */
    setIO(io: SocketIOServer): void;
    /**
     * Eşleştirme kuyruğuna katılma
     */
    joinQueue(userId: string): Promise<{
        success: boolean;
        id: string;
        status: string;
        position: number;
        createdAt: Date;
    }>;
    /**
     * Kuyruktan ayrılma
     */
    leaveQueue(userId: string): Promise<{
        success: boolean;
    }>;
    /**
     * Kuyruk durumunu getirme
     */
    getQueueStatus(userId: string): Promise<{
        inQueue: boolean;
        position: null;
        totalWaiting: number;
        createdAt?: undefined;
    } | {
        inQueue: boolean;
        position: number;
        totalWaiting: number;
        createdAt: Date;
    }>;
    /**
     * Eşleştirme kontrolü ve oda oluşturma
     */
    private checkAndMatch;
    getQueueUsers(): Promise<{
        email: string;
        name: string;
        gender: string;
        id: string;
    }[]>;
}
export declare const matchingService: MatchingService;
//# sourceMappingURL=matchingService.d.ts.map