import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {logger} from '../logger';
import {cacheService} from './cacheService';
import {getIO, connectionStates} from '../websocket/server';

export class AdminService {
  /**
   * Get all users with filters and pagination
   */
  async getAllUsers(filters: {
    search?: string;
    role?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      const {search, role, limit = 50, offset = 0} = filters;

      const where: any = {};

      if (search) {
        where.OR = [
          {name: {contains: search, mode: 'insensitive'}},
          {email: {contains: search, mode: 'insensitive'}},
        ];
      }

      if (role) {
        where.role = role;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            gender: true,
            role: true,
            xp: true,
            level: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {createdAt: 'desc'},
          take: limit,
          skip: offset,
        }),
        prisma.user.count({where}),
      ]);

      return {
        users,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      logger.error('Error getting all users:', error);
      throw new HttpError(500, 'Failed to get users');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          gender: true,
          role: true,
          xp: true,
          level: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              roomParticipants: true,
              friendships: true,
              invitesSent: true,
              badges: true,
            },
          },
        },
      });

      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error getting user by ID:', error);
      throw new HttpError(500, 'Failed to get user');
    }
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: string) {
    try {
      const validRoles = ['user', 'moderator', 'admin'];
      if (!validRoles.includes(role)) {
        throw new HttpError(400, `Invalid role. Must be one of: ${validRoles.join(', ')}`);
      }

      const user = await prisma.user.update({
        where: {id: userId},
        data: {role},
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      // Invalidate user cache
      await cacheService.deleteUser(userId);

      logger.info(`User role updated: ${userId} -> ${role}`);
      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error updating user role:', error);
      throw new HttpError(500, 'Failed to update user role');
    }
  }

  /**
   * Ban user
   */
  async banUser(userId: string, reason?: string) {
    try {
      // For now, we'll use role field to mark as banned
      // In the future, we can add a separate banned field
      const user = await prisma.user.update({
        where: {id: userId},
        data: {role: 'banned'},
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      // Invalidate user cache
      await cacheService.deleteUser(userId);

      logger.info(`User banned: ${userId}`, {reason});
      return user;
    } catch (error) {
      logger.error('Error banning user:', error);
      throw new HttpError(500, 'Failed to ban user');
    }
  }

  /**
   * Unban user
   */
  async unbanUser(userId: string) {
    try {
      const user = await prisma.user.update({
        where: {id: userId},
        data: {role: 'user'},
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      // Invalidate user cache
      await cacheService.deleteUser(userId);

      logger.info(`User unbanned: ${userId}`);
      return user;
    } catch (error) {
      logger.error('Error unbanning user:', error);
      throw new HttpError(500, 'Failed to unban user');
    }
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string) {
    try {
      // Prisma will cascade delete related records
      await prisma.user.delete({
        where: {id: userId},
      });

      // Invalidate user cache
      await cacheService.deleteUser(userId);

      logger.info(`User deleted: ${userId}`);
      return {success: true};
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw new HttpError(500, 'Failed to delete user');
    }
  }

  /**
   * Get system statistics
   */
  async getSystemStats() {
    try {
      const [userCount, roomCount, activeRooms, activeConnections] = await Promise.all([
        prisma.user.count(),
        prisma.room.count(),
        prisma.room.count({
          where: {
            timeLeftSec: {
              gt: 0,
            },
          },
        }),
        Promise.resolve(connectionStates.size),
      ]);

      return {
        users: {
          total: userCount,
        },
        rooms: {
          total: roomCount,
          active: activeRooms,
        },
        connections: {
          active: activeConnections,
        },
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      };
    } catch (error) {
      logger.error('Error getting system stats:', error);
      throw new HttpError(500, 'Failed to get system stats');
    }
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats() {
    try {
      const [
        userCount,
        roomCount,
        friendshipCount,
        inviteCount,
        badgeCount,
        notificationCount,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.room.count(),
        prisma.friendship.count(),
        prisma.invite.count(),
        prisma.badge.count(),
        prisma.notification.count(),
      ]);

      return {
        users: userCount,
        rooms: roomCount,
        friendships: friendshipCount,
        invites: inviteCount,
        badges: badgeCount,
        notifications: notificationCount,
      };
    } catch (error) {
      logger.error('Error getting database stats:', error);
      throw new HttpError(500, 'Failed to get database stats');
    }
  }

  /**
   * Clear cache
   */
  async clearCache() {
    try {
      await cacheService.clearAll();
      return {success: true, message: 'Cache cleared'};
    } catch (error) {
      logger.error('Error clearing cache:', error);
      throw new HttpError(500, 'Failed to clear cache');
    }
  }

  /**
   * Get server info
   */
  async getServerInfo() {
    try {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      return {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime(),
        memory: {
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
          rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system,
        },
        pid: process.pid,
      };
    } catch (error) {
      logger.error('Error getting server info:', error);
      throw new HttpError(500, 'Failed to get server info');
    }
  }

  /**
   * Get active connections
   */
  async getActiveConnections() {
    try {
      const io = getIO();
      if (!io) {
        return {
          connections: [],
          total: 0,
        };
      }

      const sockets = await io.fetchSockets();
      const connections = sockets.map((socket) => {
        const state = connectionStates.get(socket.id);
        return {
          socketId: socket.id,
          userId: (socket as any).userId || state?.userId || 'unknown',
          connectedAt: state?.connectedAt || new Date(),
          lastPing: state?.lastPing || new Date(),
          rooms: Array.from(state?.rooms || []),
        };
      });

      return {
        connections,
        total: connections.length,
      };
    } catch (error) {
      logger.error('Error getting active connections:', error);
      throw new HttpError(500, 'Failed to get active connections');
    }
  }
}

export const adminService = new AdminService();

