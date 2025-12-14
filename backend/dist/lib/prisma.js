"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.testDatabaseConnection = testDatabaseConnection;
exports.disconnectPrisma = disconnectPrisma;
const client_1 = require("@prisma/client");
const logger_1 = require("../logger");
// Prisma Client yapılandırması
// Log seviyelerini belirle
const logLevels = [
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' },
];
if (process.env.NODE_ENV === 'development') {
    logLevels.push({ level: 'query', emit: 'event' });
}
// Prisma Client yapılandırması
const prisma = new client_1.PrismaClient({
    log: logLevels,
    errorFormat: 'pretty',
    // Connection pool configuration
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
exports.prisma = prisma;
// Prisma hata loglarını yakala
prisma.$on('error', (e) => {
    logger_1.logger.error('Prisma error:', e);
});
prisma.$on('warn', (e) => {
    logger_1.logger.warn('Prisma warning:', e);
});
// Query logging (development only)
if (process.env.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
        logger_1.logger.debug('Prisma query:', {
            query: e.query,
            params: e.params,
            duration: `${e.duration}ms`,
        });
    });
}
/**
 * Veritabanı bağlantısını test et
 */
async function testDatabaseConnection() {
    try {
        // Timeout ile bağlantı testi (5 saniye)
        const connectionPromise = Promise.race([
            (async () => {
                await prisma.$connect();
                await prisma.$queryRaw `SELECT 1`;
                return true;
            })(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 5000)),
        ]);
        const result = await connectionPromise;
        logger_1.logger.info('✅ Veritabanı bağlantısı başarılı');
        return result;
    }
    catch (error) {
        logger_1.logger.error('❌ Veritabanı bağlantı hatası:', error?.message || error);
        // Hata detaylarını logla
        if (error?.code) {
            logger_1.logger.error(`Hata kodu: ${error.code}`);
        }
        return false;
    }
}
/**
 * Graceful shutdown için Prisma bağlantısını kapat
 */
async function disconnectPrisma() {
    try {
        await prisma.$disconnect();
        logger_1.logger.info('✅ Prisma bağlantısı kapatıldı');
    }
    catch (error) {
        logger_1.logger.error('❌ Prisma disconnect hatası:', error);
    }
}
//# sourceMappingURL=prisma.js.map