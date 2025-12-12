import {Socket} from 'socket.io';
import {Server as SocketIOServer} from 'socket.io';
import {matchingService} from '../../services/matchingService';
import {emitToUser} from '../server';

export const matchingHandlers = (
  socket: Socket,
  io: SocketIOServer,
  userId: string,
) => {
  /**
   * Eşleştirme kuyruğuna katılma
   */
  socket.on('matching-join', async () => {
    try {
      const result = await matchingService.joinQueue(userId);

      // Kullanıcıya bildir
      socket.emit('matching-joined', {
        queueId: result.id,
        status: result.status,
      });

      // Kuyruktaki tüm kullanıcılara progress güncellemesi gönder
      const queueUsers = await matchingService.getQueueUsers();
      
      // Tüm bekleyen kullanıcılara progress gönder
      const waitingUsers = await matchingService.getQueueStatus(userId);
      if (waitingUsers.inQueue) {
        emitToUser(io, userId, 'matching-progress', {
          totalWaiting: waitingUsers.totalWaiting,
          position: waitingUsers.position,
          users: queueUsers,
        });
      }
    } catch (error) {
      socket.emit('matching-error', {
        error: error instanceof Error ? error.message : 'Kuyruğa katılamadı',
      });
    }
  });

  /**
   * Eşleştirme kuyruğundan ayrılma
   */
  socket.on('matching-leave', async () => {
    try {
      await matchingService.leaveQueue(userId);
      socket.emit('matching-left', {success: true});
    } catch (error) {
      socket.emit('matching-error', {
        error: error instanceof Error ? error.message : 'Kuyruktan ayrılamadı',
      });
    }
  });

  /**
   * Eşleştirme durumu sorgulama
   */
  socket.on('matching-status', async () => {
    try {
      const status = await matchingService.getQueueStatus(userId);
      const queueUsers = await matchingService.getQueueUsers();

      socket.emit('matching-status', {
        ...status,
        users: queueUsers,
      });
    } catch (error) {
      socket.emit('matching-error', {
        error: error instanceof Error ? error.message : 'Durum alınamadı',
      });
    }
  });
};

