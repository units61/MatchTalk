export declare const XP_REWARDS: {
    readonly ROOM_COMPLETION: 50;
    readonly FRIEND_ADDED: 25;
    readonly INVITE_SENT: 10;
    readonly FIRST_ROOM: 100;
    readonly FIRST_FRIEND: 50;
};
export declare function calculateLevel(xp: number): number;
export declare class BadgeService {
    /**
     * XP hesapla ve kullanıcıya ekle
     */
    addXP(userId: string, amount: number, action: string): Promise<{
        xp: number;
        level: number;
        leveledUp: boolean;
    }>;
    /**
     * Badge ver
     */
    awardBadge(userId: string, badgeId: string): Promise<void>;
    /**
     * Level up badge'lerini kontrol et
     */
    private checkLevelUpBadges;
    /**
     * Kullanıcının badge'lerini getir
     */
    getUserBadges(userId: string): Promise<{
        id: string;
        name: string;
        description: string;
        icon: string;
        earnedAt: Date;
    }[]>;
    /**
     * Tüm badge'leri getir
     */
    getAllBadges(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string;
        icon: string;
        xpReward: number;
    }[]>;
    /**
     * Leaderboard getir
     */
    getLeaderboard(limit?: number): Promise<{
        level: number;
        name: string;
        id: string;
        avatar: string | null;
        xp: number;
        rank: number;
    }[]>;
    /**
     * Kullanıcı istatistiklerini getir (XP, level, badge sayısı)
     */
    getUserStats(userId: string): Promise<{
        xp: number;
        level: number;
        badgeCount: number;
        xpForNextLevel: number;
        nextLevelXP: number;
    }>;
}
export declare const badgeService: BadgeService;
//# sourceMappingURL=badgeService.d.ts.map