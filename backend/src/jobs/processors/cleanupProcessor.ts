import {Worker, Job} from 'bullmq';
import {JobType, CleanupJobData} from '../types';
import {connection} from '../queue';
import {logger} from '../../logger';
import {prisma} from '../../lib/prisma';

export function createCleanupWorker(): Worker {
  const worker = new Worker(
    JobType.CLEANUP_EXPIRED_ROOMS,
    async (job: Job<CleanupJobData>) => {
      logger.info(`Processing cleanup job ${job.id}`, {
        type: job.data.type,
      });

      try {
        if (job.data.type === 'rooms') {
          // Cleanup expired rooms (timeLeftSec === 0 and no active participants)
          const expiredRooms = await prisma.room.findMany({
            where: {
              timeLeftSec: 0,
              participants: {
                none: {},
              },
            },
          });

          const deletedCount = await prisma.room.deleteMany({
            where: {
              id: {
                in: expiredRooms.map((r) => r.id),
              },
            },
          });

          logger.info(`Cleaned up ${deletedCount.count} expired rooms`);
          return {deletedCount: deletedCount.count};
        }
        if (job.data.type === 'invites') {
          // Cleanup old invites (older than 7 days and not pending)
          const cutoffDate = job.data.olderThan || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

          const deletedCount = await prisma.invite.deleteMany({
            where: {
              createdAt: {
                lt: cutoffDate,
              },
              status: {
                not: 'PENDING',
              },
            },
          });

          logger.info(`Cleaned up ${deletedCount.count} old invites`);
          return {deletedCount: deletedCount.count};
        }

        return {success: true};
      } catch (error) {
        logger.error(`Cleanup job ${job.id} failed:`, error);
        throw error;
      }
    },
    {
      connection,
      concurrency: 1, // Cleanup jobs should run sequentially
    },
  );

  worker.on('completed', (job) => {
    logger.info(`Cleanup job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Cleanup job ${job?.id} failed:`, err);
  });

  return worker;
}



