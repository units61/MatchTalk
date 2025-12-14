export declare class UserService {
    /**
     * Kullanıcı profilini güncelle
     */
    updateProfile(userId: string, data: {
        name?: string;
        avatar?: string | null;
    }): Promise<{
        email: string;
        name: string;
        gender: string;
        id: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Şifre değiştir
     */
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        success: boolean;
    }>;
    /**
     * Email değiştir
     */
    changeEmail(userId: string, newEmail: string, password: string): Promise<{
        success: boolean;
    }>;
    /**
     * Kullanıcı profil bilgilerini getir
     */
    getUserProfile(userId: string): Promise<{
        email: string;
        name: string;
        gender: string;
        id: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Public kullanıcı profil bilgilerini getir (başka kullanıcılar için)
     */
    getPublicProfile(userId: string): Promise<{
        level: number;
        name: string;
        gender: string;
        id: string;
        avatar: string | null;
        xp: number;
        createdAt: Date;
    }>;
}
export declare const userService: UserService;
//# sourceMappingURL=userService.d.ts.map