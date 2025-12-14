import Redis from 'ioredis';
import { config } from '../config';
import { logger } from '../logger';

// Redis istemcisi (Genel kullanım için)
export const redis = new Redis(config.redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
});

redis.on('connect', () => {
    logger.info('✅ Redis bağlantısı başarılı');
});

redis.on('error', (err) => {
    logger.error('❌ Redis hatası:', err);
});

// Pub/Sub için ayrı bağlantılar gerekli (Socket.io Adapter için)
export const redisPub = new Redis(config.redisUrl, { lazyConnect: true });
export const redisSub = new Redis(config.redisUrl, { lazyConnect: true });
