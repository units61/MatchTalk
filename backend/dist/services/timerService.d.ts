import { Server as SocketIOServer } from 'socket.io';
declare class TimerService {
    private timers;
    private io;
    private voteStarted;
    /**
     * WebSocket server'ı set et (timer güncellemeleri için)
     */
    setIO(io: SocketIOServer): void;
    /**
     * Oda timer'ını başlat
     */
    startTimer(roomId: string): Promise<void>;
    /**
     * Timer'ı durdur
     */
    stopTimer(roomId: string): Promise<void>;
    /**
     * Timer'ı güncelle (her saniye çağrılır)
     */
    updateTimer(roomId: string): Promise<void>;
    /**
     * Timer bittiğinde işlem yap
     */
    private handleTimerExpiration;
    /**
     * Timer durumunu getir
     */
    getTimer(roomId: string): Promise<{
        roomId: string;
        timeLeft: number;
        duration: number;
        isRunning: boolean;
    } | null>;
    /**
     * Tüm aktif timer'ları başlat (server başlangıcında)
     * Sadece timer başlamış odalar için (timeLeftSec > 0 ve timeLeftSec < durationSec)
     */
    startAllActiveTimers(): Promise<void>;
    /**
     * Tüm timer'ları durdur (server kapanışında)
     */
    stopAllTimers(): Promise<void>;
}
export declare const timerService: TimerService;
export {};
//# sourceMappingURL=timerService.d.ts.map