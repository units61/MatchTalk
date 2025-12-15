import cron from 'node-cron';
import {logger} from '../logger';
import {cleanupQueue} from './queue';
import {JobType} from './types';
import {cacheService} from '../services/cacheService';
import {badgeService} from '../services/badgeService';

// Scheduled tasks
const scheduledTasks: cron.ScheduledTask[] = [];

/**
 * Register a scheduled task
 */
function registerTask(name: string, schedule: string, task: () => Promise<void>): void {
  const cronTask = cron.schedule(
    schedule,
    async () => {
      logger.info(`Running scheduled task: ${name}`);
      try {
        await task();
        logger.info(`Scheduled task completed: ${name}`);
      } catch (error) {
        logger.error(`Scheduled task failed: ${name}`, error);
      }
    },
    {
      scheduled: false, // Don't start immediately
    },
  );

  scheduledTasks.push(cronTask);
  logger.info(`Registered scheduled task: ${name} (${schedule})`);
}

/**
 * Start all scheduled tasks
 */
export function startScheduler(): void {
  logger.info('Starting scheduled tasks...');

  // Cleanup expired rooms (every hour)
  registerTask('cleanup-expired-rooms', '0 * * * *', async () => {
    await cleanupQueue.add(JobType.CLEANUP_EXPIRED_ROOMS, {
      type: 'rooms',
    });
  });

  // Cleanup old invites (daily at 2 AM)
  registerTask('cleanup-old-invites', '0 2 * * *', async () => {
    await cleanupQueue.add(JobType.CLEANUP_EXPIRED_ROOMS, {
      type: 'invites',
      olderThan: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    });
  });

  // Update leaderboard cache (every 5 minutes)
  registerTask('update-leaderboard', '*/5 * * * *', async () => {
    try {
      const leaderboard = await badgeService.getLeaderboard(100);
      await cacheService.setLeaderboard(100, leaderboard);
      logger.debug('Leaderboard cache updated');
    } catch (error) {
      logger.error('Failed to update leaderboard cache:', error);
    }
  });

  // Send daily stats (daily at 1 AM)
  registerTask('send-daily-stats', '0 1 * * *', async () => {
    try {
      // TODO: Implement daily stats collection when analytics service is ready
      logger.info('Daily stats collection (not yet implemented)');
    } catch (error) {
      logger.error('Failed to collect daily stats:', error);
    }
  });

  // Cleanup inactive users (weekly on Sunday at 3 AM)
  registerTask('cleanup-inactive-users', '0 3 * * 0', async () => {
    try {
      // Mark users as inactive if they haven't logged in for 90 days
      // Note: We don't have lastLogin field yet, so this is a placeholder
      // When user activity tracking is added, this can be implemented
      // const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      logger.info('Inactive user cleanup (not yet implemented - requires lastLogin field)');
    } catch (error) {
      logger.error('Failed to cleanup inactive users:', error);
    }
  });

  // Start all tasks
  scheduledTasks.forEach((task) => task.start());
  logger.info(`Started ${scheduledTasks.length} scheduled tasks`);
}

/**
 * Stop all scheduled tasks
 */
export function stopScheduler(): void {
  logger.info('Stopping scheduled tasks...');
  scheduledTasks.forEach((task) => task.stop());
  scheduledTasks.length = 0;
  logger.info('All scheduled tasks stopped');
}




