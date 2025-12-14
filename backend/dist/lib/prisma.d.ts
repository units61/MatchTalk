import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient<{
    log: any[];
    errorFormat: "pretty";
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, any, import("@prisma/client/runtime/library").DefaultArgs>;
/**
 * Veritabanı bağlantısını test et
 */
export declare function testDatabaseConnection(): Promise<boolean>;
/**
 * Graceful shutdown için Prisma bağlantısını kapat
 */
export declare function disconnectPrisma(): Promise<void>;
export { prisma };
//# sourceMappingURL=prisma.d.ts.map