"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSub = exports.redisPub = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("../config");
const logger_1 = require("../logger");
// Redis istemcisi (Genel kullanım için)
exports.redis = new ioredis_1.default(config_1.config.redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
});
exports.redis.on('connect', () => {
    logger_1.logger.info('✅ Redis bağlantısı başarılı');
});
exports.redis.on('error', (err) => {
    logger_1.logger.error('❌ Redis hatası:', err);
});
// Pub/Sub için ayrı bağlantılar gerekli (Socket.io Adapter için)
exports.redisPub = new ioredis_1.default(config_1.config.redisUrl, { lazyConnect: true });
exports.redisSub = new ioredis_1.default(config_1.config.redisUrl, { lazyConnect: true });
//# sourceMappingURL=redis.js.map