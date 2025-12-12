import {Socket} from 'socket.io';
import {Server as SocketIOServer} from 'socket.io';
import {roomsService} from '../../services/roomsService';
import {voteService} from '../../services/voteService';
import {emitToRoom} from '../server';
import {prisma} from '../../lib/prisma';

export const roomHandlers = (
  socket: Socket,
  io: SocketIOServer,
  userId: string,
) => {
  /**
   * Odaya katılma
   */
  socket.on('join-room', async (data: {roomId: string}) => {
    try {
      const {roomId} = data;
      
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
      socket.emit('room-error', {
        error: error instanceof Error ? error.message : 'Odaya katılamadı',
      });
    }
  });

  /**
   * Odadan ayrılma
   */
  socket.on('leave-room', async (data: {roomId: string}) => {
    try {
      const {roomId} = data;

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
  socket.on('vote-extension', async (data: {roomId: string; vote: 'yes' | 'no'}) => {
    try {
      const result = await voteService.voteExtension(userId, data.roomId, data.vote);

      socket.emit('vote-recorded', {
        roomId: data.roomId,
        vote: data.vote,
        extensionYes: result.extensionYes,
        extensionNo: result.extensionNo,
        totalVotes: result.totalVotes,
      });
    } catch (error) {
      socket.emit('room-error', {
        error: error instanceof Error ? error.message : 'Oylama kaydedilemedi',
      });
    }
  });
};

