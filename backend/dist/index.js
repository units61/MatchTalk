"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const server_1 = require("./websocket/server");
const timerService_1 = require("./services/timerService");
const voteService_1 = require("./services/voteService");
const matchingService_1 = require("./services/matchingService");
const prisma_1 = require("./lib/prisma");
const logger_1 = require("./logger");
const app = (0, app_1.createApp)();
// Veritabanı bağlantısını test et ve sunucuyu başlat
async function startServer() {
    try {
        // Veritabanı bağlantısını kontrol et (uyarı ver ama devam et)
        const dbConnected = await (0, prisma_1.testDatabaseConnection)();
        if (!dbConnected) {
            logger_1.logger.warn('⚠️ Veritabanı bağlantısı başarısız. Sunucu başlatılıyor ancak veritabanı işlemleri çalışmayabilir.');
            logger_1.logger.warn('💡 Lütfen veritabanının çalıştığından ve DATABASE_URL ayarının doğru olduğundan emin olun.');
        }
        const server = app.listen(config_1.config.port, () => {
            logger_1.logger.info(`🚀 Server running on port ${config_1.config.port}`);
            if (!dbConnected) {
                logger_1.logger.warn('⚠️ Veritabanı bağlantısı olmadan çalışıyor. Bazı özellikler çalışmayabilir.');
            }
        });
        // Initialize WebSocket server
        const io = (0, server_1.initializeWebSocket)(server);
        // Set WebSocket server to services
        timerService_1.timerService.setIO(io);
        voteService_1.voteService.setIO(io);
        matchingService_1.matchingService.setIO(io);
        // Start all active room timers (with error handling)
        timerService_1.timerService.startAllActiveTimers().catch((error) => {
            logger_1.logger.error('Failed to start active timers:', error);
            // Continue server startup even if timers fail
        });
        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            logger_1.logger.info(`${signal} signal received: closing HTTP server`);
            server.close(async () => {
                logger_1.logger.info('HTTP server closed');
                await (0, prisma_1.disconnectPrisma)();
                process.exit(0);
            });
            // Force close after 10 seconds
            setTimeout(() => {
                logger_1.logger.error('Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map