import {Worker, Job} from 'bullmq';
import {JobType, AnalyticsAggregationJobData} from '../types';
import {connection} from '../queue';
import {logger} from '../../logger';
import {analyticsService} from '../../services/analyticsService';

export function createAnalyticsWorker(): Worker {
  const worker = new Worker(
    JobType.ANALYTICS_AGGREGATION,
    async (job: Job<AnalyticsAggregationJobData>) => {
      logger.info(`Processing analytics job ${job.id}`, {
        dateRange: job.data.dateRange,
      });

      try {
        // Aggregate analytics data for the date range
        // This could involve pre-computing statistics, generating reports, etc.
        const stats = await analyticsService.getPlatformStats(job.data.dateRange);
        
        logger.info(`Analytics aggregation completed for job ${job.id}`, {
          totalEvents: stats.totalEvents,
          uniqueUsers: stats.uniqueUsers,
        });

        return {success: true, stats};
      } catch (error) {
        logger.error(`Analytics job ${job.id} failed:`, error);
        throw error;
      }
    },
    {
      connection,
      concurrency: 2,
    },
  );

  worker.on('completed', (job) => {
    logger.info(`Analytics job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Analytics job ${job?.id} failed:`, err);
  });

  return worker;
}

