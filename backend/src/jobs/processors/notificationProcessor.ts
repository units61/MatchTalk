import {Worker, Job} from 'bullmq';
import {JobType, SendNotificationJobData} from '../types';
import {connection} from '../queue';
import {logger} from '../../logger';
import {notificationService} from '../../services/notificationService';

export function createNotificationWorker(): Worker {
  const worker = new Worker(
    JobType.SEND_NOTIFICATION,
    async (job: Job<SendNotificationJobData>) => {
      logger.info(`Processing notification job ${job.id}`, {
        userId: job.data.userId,
        type: job.data.type,
      });

      try {
        await notificationService.createNotification(
          job.data.userId,
          job.data.type,
          job.data.title,
          job.data.message,
          job.data.data,
        );

        logger.info(`Notification job ${job.id} completed`);
        return {success: true};
      } catch (error) {
        logger.error(`Notification job ${job.id} failed:`, error);
        throw error;
      }
    },
    {
      connection,
      concurrency: 10,
    },
  );

  worker.on('completed', (job) => {
    logger.info(`Notification job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Notification job ${job?.id} failed:`, err);
  });

  return worker;
}




