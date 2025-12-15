/**
 * Job types and interfaces
 */

export enum JobType {
  SEND_EMAIL = 'send-email',
  SEND_NOTIFICATION = 'send-notification',
  CLEANUP_EXPIRED_ROOMS = 'cleanup-expired-rooms',
  CLEANUP_OLD_INVITES = 'cleanup-old-invites',
  ANALYTICS_AGGREGATION = 'analytics-aggregation',
}

export interface SendEmailJobData {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export interface SendNotificationJobData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
}

export interface CleanupJobData {
  type: 'rooms' | 'invites' | 'analytics';
  olderThan?: Date;
}

export interface AnalyticsAggregationJobData {
  dateRange: {
    start: Date;
    end: Date;
  };
  eventType?: string;
}



