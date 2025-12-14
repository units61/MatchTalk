import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';

// Prisma Client yapılandırması
// Log seviyelerini belirle
const logLevels: any[] = [
  { level: 'error', emit: 'event' },
  { level: 'warn', emit: 'event' },
];

if (process.env.NODE_ENV === 'development') {
  logLevels.push({ level: 'query', emit: 'event' });
}

// Prisma Client yapılandırması
const prisma = new PrismaClient({
  log: logLevels,
  errorFormat: 'pretty',
  // Connection pool configuration
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Prisma hata loglarını yakala
prisma.$on('error' as never, (e: any) => {
  logger.error('Prisma error:', e);
});

prisma.$on('warn' as never, (e: any) => {
  logger.warn('Prisma warning:', e);
});

// Query logging (development only)
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query' as never, (e: any) => {
    logger.debug('Prisma query:', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

/**
 * Veritabanı bağlantısını test et
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    // Timeout ile bağlantı testi (5 saniye)
    const connectionPromise = Promise.race([
      (async () => {
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;
        return true;
      })(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      ),
    ]);

    const result = await connectionPromise;
    logger.info('✅ Veritabanı bağlantısı başarılı');
    return result;
  } catch (error: any) {
    logger.error('❌ Veritabanı bağlantı hatası:', error?.message || error);
    // Hata detaylarını logla
    if (error?.code) {
      logger.error(`Hata kodu: ${error.code}`);
    }
    return false;
  }
}

/**
 * Graceful shutdown için Prisma bağlantısını kapat
 */
export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('✅ Prisma bağlantısı kapatıldı');
  } catch (error) {
    logger.error('❌ Prisma disconnect hatası:', error);
  }
}

export { prisma };

