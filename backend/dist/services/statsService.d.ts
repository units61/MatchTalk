export declare class StatsService {
    /**
     * Kullanıcı istatistiklerini hesapla
     */
    getUserStats(userId: string): Promise<{
        totalRooms: number;
        totalHours: number;
        totalMinutes: number;
        totalFriends: number;
    }>;
}
export declare const statsService: StatsService;
//# sourceMappingURL=statsService.d.ts.map