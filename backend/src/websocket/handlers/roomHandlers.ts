import {Socket, Server as SocketIOServer} from 'socket.io';
import {roomsService} from '../../services/roomsService';
import {voteService} from '../../services/voteService';
import {emitToRoom} from '../server';
import {logger} from '../../logger';
import {z} from 'zod';

// Validation schemas
const joinRoomSchema = z.object({
  roomId: z.string().uuid('Geçerli bir oda ID giriniz'),
});

const leaveRoomSchema = z.object({
  roomId: z.string().uuid('Geçerli bir oda ID giriniz'),
});

const voteExtensionSchema = z.object({
  roomId: z.string().uuid('Geçerli bir oda ID giriniz'),
  vote: z.enum(['yes', 'no']),
});

export const roomHandlers = (
  socket: Socket,
  io: SocketIOServer,
  userId: string,
) => {
  /**
   * Odaya katılma
   */
  socket.on('join-room', async (data: unknown) => {
    try {
      // Validate input
      const validated = joinRoomSchema.parse(data);
      const {roomId} = validated;
      
      logger.info('WebSocket join-room', {userId, roomId, socketId: socket.id});
      
      // Socket'i oda room'una ekle
      await socket.join(`room:${roomId}`);

      // Odaya katıl
      const room = await roomsService.joinRoom(userId, {roomId});

      // Oda güncellemesini tüm katılımcılara gönder
      emitToRoom(io, roomId, 'room-update', {
        room,
        joinedUser: {
          id: userId,
        },
      });

      socket.emit('room-joined', {room});
    } catch (error) {
      logger.error('WebSocket join-room error', {
        userId,
        socketId: socket.id,
        error: error instanceof Error ? error.message : String(error),
      });
      socket.emit('room-error', {
        error: error instanceof Error ? error.message : 'Odaya katılamadı',
      });
    }
  });

  /**
   * Odadan ayrılma
   */
  socket.on('leave-room', async (data: unknown) => {
    try {
      // Validate input
      const validated = leaveRoomSchema.parse(data);
      const {roomId} = validated;

      logger.info('WebSocket leave-room', {userId, roomId, socketId: socket.id});

      // Odadan ayrıl
      await roomsService.leaveRoom(userId, roomId);

      // Socket'i oda room'undan çıkar
      await socket.leave(`room:${roomId}`);

      // Oda güncellemesini tüm katılımcılara gönder
      emitToRoom(io, roomId, 'room-update', {
        leftUser: {
          id: userId,
        },
      });

      socket.emit('room-left', {roomId});
    } catch (error) {
      logger.error('WebSocket leave-room error', {
        userId,
        socketId: socket.id,
        error: error instanceof Error ? error.message : String(error),
      });
      socket.emit('room-error', {
        error: error instanceof Error ? error.message : 'Odadan ayrılamadı',
      });
    }
  });

  /**
   * Timer güncellemesi (server-side timer için)
   */
  socket.on('timer-update', async (data: {roomId: string; timeLeft: number}) => {
    // Timer güncellemesini oda katılımcılarına gönder
    emitToRoom(io, data.roomId, 'timer-update', {
      roomId: data.roomId,
      timeLeft: data.timeLeft,
    });
  });

  /**
   * Extension vote
   */
  socket.on('vote-extension', async (data: unknown) => {
    try {
      // Validate input
      const validated = voteExtensionSchema.parse(data);
      const {roomId, vote} = validated;

      logger.info('WebSocket vote-extension', {userId, roomId, vote, socketId: socket.id});

      const result = await voteService.voteExtension(userId, roomId, vote);

      socket.emit('vote-recorded', {
        roomId,
        vote,
        extensionYes: result.extensionYes,
        extensionNo: result.extensionNo,
        totalVotes: result.totalVotes,
      });
    } catch (error) {
      logger.error('WebSocket vote-extension error', {
        userId,
        socketId: socket.id,
        error: error instanceof Error ? error.message : String(error),
      });
      socket.emit('room-error', {
        error: error instanceof Error ? error.message : 'Oylama kaydedilemedi',
      });
    }
  });
};

