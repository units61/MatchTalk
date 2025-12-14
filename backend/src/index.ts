import {createApp} from './app';
import {config} from './config';
import {initializeWebSocket} from './websocket/server';
import {timerService} from './services/timerService';
import {voteService} from './services/voteService';
import {matchingService} from './services/matchingService';
import {notificationService} from './services/notificationService';
import {testDatabaseConnection, disconnectPrisma} from './lib/prisma';
import {logger} from './logger';
import {startWorkers, closeWorkers} from './jobs/workers';
import {closeQueues} from './jobs/queue';
import {startScheduler, stopScheduler} from './jobs/scheduler';

const app = createApp();

// Veritabanı bağlantısını test et ve sunucuyu başlat
async function startServer() {
  try {
    // Veritabanı bağlantısını kontrol et (uyarı ver ama devam et)
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      logger.warn('⚠️ Veritabanı bağlantısı başarısız. Sunucu başlatılıyor ancak veritabanı işlemleri çalışmayabilir.');
      logger.warn('💡 Lütfen veritabanının çalıştığından ve DATABASE_URL ayarının doğru olduğundan emin olun.');
    }

    const server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
      if (!dbConnected) {
        logger.warn('⚠️ Veritabanı bağlantısı olmadan çalışıyor. Bazı özellikler çalışmayabilir.');
      }
    });

    // Initialize WebSocket server
    const io = initializeWebSocket(server);

    // Set WebSocket server to services
    timerService.setIO(io);
    voteService.setIO(io);
    matchingService.setIO(io);
    notificationService.setIO(io);

    // Start all active room timers (with error handling)
    timerService.startAllActiveTimers().catch((error) => {
      logger.error('Failed to start active timers:', error);
      // Continue server startup even if timers fail
    });

    // Start background job workers
    try {
      startWorkers();
    } catch (error) {
      logger.error('Failed to start background workers:', error);
      // Continue server startup even if workers fail
    }

    // Start scheduled tasks
    try {
      startScheduler();
    } catch (error) {
      logger.error('Failed to start scheduler:', error);
      // Continue server startup even if scheduler fails
    }

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} signal received: closing HTTP server`);
      server.close(async () => {
        logger.info('HTTP server closed');
        
        // Stop scheduler
        try {
          stopScheduler();
        } catch (error) {
          logger.error('Error stopping scheduler:', error);
        }

        // Close background workers and queues
        try {
          await closeWorkers();
          await closeQueues();
        } catch (error) {
          logger.error('Error closing workers/queues:', error);
        }
        
        await disconnectPrisma();
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

void startServer();

