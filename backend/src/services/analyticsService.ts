import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {logger} from '../logger';
import {analyticsQueue} from '../jobs/queue';
import {JobType, AnalyticsAggregationJobData} from '../jobs/types';

export class AnalyticsService {
  /**
   * Track an event
   */
  async trackEvent(
    userId: string | null,
    eventType: string,
    eventData: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    try {
      const event = await prisma.analyticsEvent.create({
        data: {
          userId: userId || null,
          eventType,
          eventData: JSON.stringify(eventData),
          metadata: metadata ? JSON.stringify(metadata) : null,
        },
      });

      logger.debug(`Analytics event tracked: ${eventType}`, {userId, eventId: event.id});
      return event;
    } catch (error) {
      logger.error('Error tracking analytics event:', error);
      // Don't throw error - analytics should not break the main flow
      return null;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string, dateRange?: {start: Date; end: Date}) {
    try {
      const where: any = {userId};

      if (dateRange) {
        where.createdAt = {
          gte: dateRange.start,
          lte: dateRange.end,
        };
      }

      const events = await prisma.analyticsEvent.findMany({
        where,
        select: {
          eventType: true,
          createdAt: true,
        },
      });

      // Group by event type
      const stats: Record<string, number> = {};
      events.forEach((event) => {
        stats[event.eventType] = (stats[event.eventType] || 0) + 1;
      });

      return {
        totalEvents: events.length,
        eventTypes: stats,
        dateRange,
      };
    } catch (error) {
      logger.error('Error getting user stats:', error);
      throw new HttpError(500, 'Failed to get user statistics');
    }
  }

  /**
   * Get room statistics
   */
  async getRoomStats(roomId: string, dateRange?: {start: Date; end: Date}) {
    try {
      const where: any = {
        eventType: 'room_join',
        eventData: {
          contains: roomId,
        },
      };

      if (dateRange) {
        where.createdAt = {
          gte: dateRange.start,
          lte: dateRange.end,
        };
      }

      const events = await prisma.analyticsEvent.findMany({
        where,
        select: {
          userId: true,
          createdAt: true,
        },
      });

      return {
        totalJoins: events.length,
        uniqueUsers: new Set(events.map((e) => e.userId).filter(Boolean)).size,
        dateRange,
      };
    } catch (error) {
      logger.error('Error getting room stats:', error);
      throw new HttpError(500, 'Failed to get room statistics');
    }
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats(dateRange?: {start: Date; end: Date}) {
    try {
      const where: any = {};

      if (dateRange) {
        where.createdAt = {
          gte: dateRange.start,
          lte: dateRange.end,
        };
      }

      const [totalEvents, uniqueUsers, eventsByType] = await Promise.all([
        prisma.analyticsEvent.count({where}),
        prisma.analyticsEvent.groupBy({
          by: ['userId'],
          where: {
            ...where,
            userId: {
              not: null,
            },
          },
        }),
        prisma.analyticsEvent.groupBy({
          by: ['eventType'],
          where,
          _count: {
            id: true,
          },
        }),
      ]);

      const eventTypeStats: Record<string, number> = {};
      eventsByType.forEach((item) => {
        eventTypeStats[item.eventType] = item._count.id;
      });

      return {
        totalEvents,
        uniqueUsers: uniqueUsers.length,
        eventsByType: eventTypeStats,
        dateRange,
      };
    } catch (error) {
      logger.error('Error getting platform stats:', error);
      throw new HttpError(500, 'Failed to get platform statistics');
    }
  }

  /**
   * Get daily active users
   */
  async getDailyActiveUsers(dateRange: {start: Date; end: Date}) {
    try {
      const events = await prisma.analyticsEvent.findMany({
        where: {
          createdAt: {
            gte: dateRange.start,
            lte: dateRange.end,
          },
          userId: {
            not: null,
          },
        },
        select: {
          userId: true,
          createdAt: true,
        },
      });

      // Group by date
      const dailyUsers: Record<string, Set<string>> = {};
      events.forEach((event) => {
        if (!event.userId) return;
        const date = event.createdAt.toISOString().split('T')[0];
        if (!dailyUsers[date]) {
          dailyUsers[date] = new Set();
        }
        dailyUsers[date].add(event.userId);
      });

      const result = Object.entries(dailyUsers).map(([date, users]) => ({
        date,
        count: users.size,
      }));

      return result.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      logger.error('Error getting daily active users:', error);
      throw new HttpError(500, 'Failed to get daily active users');
    }
  }

  /**
   * Get retention rate
   */
  async getRetentionRate(dateRange: {start: Date; end: Date}) {
    try {
      // This is a simplified retention calculation
      // In production, you'd want more sophisticated cohort analysis
      const startUsers = await prisma.analyticsEvent.findMany({
        where: {
          createdAt: {
            gte: dateRange.start,
            lt: new Date(dateRange.start.getTime() + 24 * 60 * 60 * 1000), // First day
          },
          userId: {
            not: null,
          },
        },
        select: {
          userId: true,
        },
        distinct: ['userId'],
      });

      const endUsers = await prisma.analyticsEvent.findMany({
        where: {
          createdAt: {
            gte: new Date(dateRange.end.getTime() - 24 * 60 * 60 * 1000), // Last day
            lte: dateRange.end,
          },
          userId: {
            not: null,
          },
        },
        select: {
          userId: true,
        },
        distinct: ['userId'],
      });

      const startUserIds = new Set(startUsers.map((u) => u.userId).filter(Boolean));
      const endUserIds = new Set(endUsers.map((u) => u.userId).filter(Boolean));

      const retainedUsers = Array.from(startUserIds).filter((id) => endUserIds.has(id));

      return {
        startUsers: startUserIds.size,
        endUsers: endUserIds.size,
        retainedUsers: retainedUsers.length,
        retentionRate: startUserIds.size > 0 
          ? (retainedUsers.length / startUserIds.size) * 100 
          : 0,
      };
    } catch (error) {
      logger.error('Error getting retention rate:', error);
      throw new HttpError(500, 'Failed to get retention rate');
    }
  }

  /**
   * Trigger analytics aggregation job
   */
  async triggerAggregation(dateRange: {start: Date; end: Date}, eventType?: string) {
    try {
      await analyticsQueue.add(JobType.ANALYTICS_AGGREGATION, {
        dateRange,
        eventType,
      } as AnalyticsAggregationJobData);
    } catch (error) {
      logger.error('Error triggering analytics aggregation:', error);
      throw new HttpError(500, 'Failed to trigger aggregation');
    }
  }
}

export const analyticsService = new AnalyticsService();



