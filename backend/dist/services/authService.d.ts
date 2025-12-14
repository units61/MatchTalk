import { RegisterInput, LoginInput } from '../schemas/auth';
export declare class AuthService {
    /**
     * Kullanıcı kaydı
     */
    register(input: RegisterInput): Promise<{
        user: {
            email: string;
            name: string;
            gender: string;
            id: string;
            createdAt: Date;
        };
        token: string;
    }>;
    /**
     * Kullanıcı girişi
     */
    login(input: LoginInput): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            gender: string;
            createdAt: Date;
        };
        token: string;
    }>;
    /**
     * JWT token oluşturma
     */
    private generateToken;
    /**
     * Kullanıcı bilgilerini getirme
     */
    getUserById(userId: string): Promise<{
        email: string;
        name: string;
        gender: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Prisma bağlantı hatası kontrolü
     */
    private isPrismaConnectionError;
}
export declare const authService: AuthService;
//# sourceMappingURL=authService.d.ts.map