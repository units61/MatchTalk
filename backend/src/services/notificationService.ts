import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {logger} from '../logger';
import {notificationQueue} from '../jobs/queue';
import {JobType, SendNotificationJobData} from '../jobs/types';
import {emitToUser} from '../websocket/server';
import {Server as SocketIOServer} from 'socket.io';

class NotificationService {
  private io: SocketIOServer | null = null;

  setIO(io: SocketIOServer) {
    this.io = io;
  }

  /**
   * Create a notification
   */
  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: Record<string, any>,
  ) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          data: data ? JSON.stringify(data) : null,
        },
      });

      // Send via WebSocket if available
      if (this.io) {
        emitToUser(this.io, userId, 'notification', {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          data: notification.data ? JSON.parse(notification.data) : {},
          read: notification.read,
          createdAt: notification.createdAt,
        });
      }

      logger.info(`Notification created for user ${userId}: ${type}`);
      return notification;
    } catch (error) {
      logger.error('Error creating notification:', error);
      throw new HttpError(500, 'Failed to create notification');
    }
  }

  /**
   * Create notification via background job
   */
  async createNotificationAsync(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: Record<string, any>,
  ) {
    await notificationQueue.add(JobType.SEND_NOTIFICATION, {
      userId,
      type,
      title,
      message,
      data,
    } as SendNotificationJobData);
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await prisma.notification.findUnique({
        where: {id: notificationId},
      });

      if (!notification) {
        throw new HttpError(404, 'Notification not found');
      }

      if (notification.userId !== userId) {
        throw new HttpError(403, 'Not authorized to mark this notification as read');
      }

      const updated = await prisma.notification.update({
        where: {id: notificationId},
        data: {read: true},
      });

      return updated;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error marking notification as read:', error);
      throw new HttpError(500, 'Failed to mark notification as read');
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string) {
    try {
      const result = await prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: {
          read: true,
        },
      });

      return {updatedCount: result.count};
    } catch (error) {
      logger.error('Error marking all notifications as read:', error);
      throw new HttpError(500, 'Failed to mark all notifications as read');
    }
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string, limit: number = 50, offset: number = 0) {
    try {
      const notifications = await prisma.notification.findMany({
        where: {userId},
        orderBy: {createdAt: 'desc'},
        take: limit,
        skip: offset,
      });

      return notifications.map((n) => ({
        ...n,
        data: n.data ? JSON.parse(n.data) : {},
      }));
    } catch (error) {
      logger.error('Error getting user notifications:', error);
      throw new HttpError(500, 'Failed to get notifications');
    }
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string) {
    try {
      const count = await prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      });

      return {count};
    } catch (error) {
      logger.error('Error getting unread count:', error);
      throw new HttpError(500, 'Failed to get unread count');
    }
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string, userId: string) {
    try {
      const notification = await prisma.notification.findUnique({
        where: {id: notificationId},
      });

      if (!notification) {
        throw new HttpError(404, 'Notification not found');
      }

      if (notification.userId !== userId) {
        throw new HttpError(403, 'Not authorized to delete this notification');
      }

      await prisma.notification.delete({
        where: {id: notificationId},
      });

      return {success: true};
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error deleting notification:', error);
      throw new HttpError(500, 'Failed to delete notification');
    }
  }
}

export const notificationService = new NotificationService();
