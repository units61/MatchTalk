import {Worker} from 'bullmq';
import {logger} from '../logger';
import {createEmailWorker} from './processors/emailProcessor';
import {createNotificationWorker} from './processors/notificationProcessor';
import {createCleanupWorker} from './processors/cleanupProcessor';
import {createAnalyticsWorker} from './processors/analyticsProcessor';

// Worker instances
let workers: Worker[] = [];

/**
 * Start all background job workers
 */
export function startWorkers(): void {
  logger.info('Starting background job workers...');

  try {
    workers = [
      createEmailWorker(),
      createNotificationWorker(),
      createCleanupWorker(),
      createAnalyticsWorker(),
    ];

    logger.info(`Started ${workers.length} background job workers`);
  } catch (error) {
    logger.error('Failed to start workers:', error);
    throw error;
  }
}

/**
 * Gracefully close all workers
 */
export async function closeWorkers(): Promise<void> {
  logger.info('Closing all workers...');
  await Promise.all(workers.map((worker) => worker.close()));
  workers = [];
  logger.info('All workers closed');
}



