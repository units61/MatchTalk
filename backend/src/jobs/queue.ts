import {Queue, QueueOptions} from 'bullmq';
import {logger} from '../logger';
import {JobType} from './types';
import {config} from '../config';

// Queue connection options
export const connection = {
  host: config.redisUrl.includes('://') 
    ? new URL(config.redisUrl).hostname 
    : 'localhost',
  port: config.redisUrl.includes('://') 
    ? parseInt(new URL(config.redisUrl).port || '6379', 10)
    : 6379,
};

// Default queue options
const defaultQueueOptions: QueueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      age: 24 * 3600, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 7 * 24 * 3600, // 7 days
    },
  },
};

// Queue instances
export const emailQueue = new Queue(JobType.SEND_EMAIL, defaultQueueOptions);
export const notificationQueue = new Queue(JobType.SEND_NOTIFICATION, defaultQueueOptions);
export const cleanupQueue = new Queue(JobType.CLEANUP_EXPIRED_ROOMS, defaultQueueOptions);
export const analyticsQueue = new Queue(JobType.ANALYTICS_AGGREGATION, defaultQueueOptions);

// Queue map for easy access
export const queues = {
  [JobType.SEND_EMAIL]: emailQueue,
  [JobType.SEND_NOTIFICATION]: notificationQueue,
  [JobType.CLEANUP_EXPIRED_ROOMS]: cleanupQueue,
  [JobType.ANALYTICS_AGGREGATION]: analyticsQueue,
};

// Queue event listeners
Object.values(queues).forEach((queue) => {
  queue.on('error', (error) => {
    logger.error(`Queue ${queue.name} error:`, error);
  });

  queue.on('waiting', (job) => {
    logger.debug(`Job ${job.id} waiting in queue ${queue.name}`);
  });

  queue.on('active', (job) => {
    logger.debug(`Job ${job.id} started in queue ${queue.name}`);
  });

  queue.on('completed', (job) => {
    logger.debug(`Job ${job.id} completed in queue ${queue.name}`);
  });

  queue.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} failed in queue ${queue.name}:`, err);
  });
});

/**
 * Gracefully close all queues
 */
export async function closeQueues(): Promise<void> {
  logger.info('Closing all queues...');
  await Promise.all(Object.values(queues).map((queue) => queue.close()));
  logger.info('All queues closed');
}




