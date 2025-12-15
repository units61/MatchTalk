import {prisma} from '../lib/prisma';
import {emitToRoom} from '../websocket/server';
import {Server as SocketIOServer} from 'socket.io';

interface TimerJob {
  roomId: string;
  intervalId: NodeJS.Timeout;
}

class TimerService {
  private timers: Map<string, TimerJob> = new Map();
  private io: SocketIOServer | null = null;

  /**
   * WebSocket server'ı set et (timer güncellemeleri için)
   */
  setIO(io: SocketIOServer) {
    this.io = io;
  }

  /**
   * Oda timer'ını başlat
   */
  async startTimer(roomId: string) {
    // Zaten çalışıyorsa durdur
    if (this.timers.has(roomId)) {
      await this.stopTimer(roomId);
    }

    // Timer'ı başlat
    const intervalId = setInterval(async () => {
      await this.updateTimer(roomId);
    }, 1000); // Her saniye güncelle

    this.timers.set(roomId, {roomId, intervalId});
  }

  /**
   * Timer'ı durdur
   */
  async stopTimer(roomId: string) {
    const timer = this.timers.get(roomId);
    if (timer) {
      clearInterval(timer.intervalId);
      this.timers.delete(roomId);
    }
  }

  /**
   * Timer'ı güncelle (her saniye çağrılır)
   */
  async updateTimer(roomId: string) {
    try {
      // Odayı getir
      const room = await prisma.room.findUnique({
        where: {id: roomId},
        include: {
          participants: true,
        },
      });

      if (!room) {
        // Oda yoksa timer'ı durdur
        await this.stopTimer(roomId);
        return;
      }

      // Timer zaten bitmişse
      if (room.timeLeftSec <= 0) {
        await this.handleTimerExpiration(roomId);
        return;
      }

      // Timer'ı 1 saniye azalt
      const newTimeLeft = room.timeLeftSec - 1;

      await prisma.room.update({
        where: {id: roomId},
        data: {
          timeLeftSec: newTimeLeft,
        },
      });

      // WebSocket ile güncelleme gönder
      if (this.io) {
        emitToRoom(this.io, roomId, 'timer-update', {
          roomId,
          timeLeft: newTimeLeft,
        });
      }

      // Timer bittiğinde
      if (newTimeLeft <= 0) {
        await this.handleTimerExpiration(roomId);
      }
    } catch (error) {
      console.error(`Error updating timer for room ${roomId}:`, error);
    }
  }

  /**
   * Timer bittiğinde işlem yap
   */
  private async handleTimerExpiration(roomId: string) {
    try {
      // Timer'ı durdur
      await this.stopTimer(roomId);

      // Odayı kapat (timeLeftSec = 0)
      const room = await prisma.room.update({
        where: {id: roomId},
        data: {
          timeLeftSec: 0,
        },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      // WebSocket ile oda kapandı bildirimi gönder
      if (this.io) {
        emitToRoom(this.io, roomId, 'room-closed', {
          roomId,
          reason: 'timer-expired',
        });

        // Tüm katılımcılara bildir
        room.participants.forEach((participant) => {
          emitToRoom(this.io!, roomId, 'timer-expired', {
            roomId,
            message: 'Oda süresi doldu',
          });
        });
      }
    } catch (error) {
      console.error(`Error handling timer expiration for room ${roomId}:`, error);
    }
  }

  /**
   * Timer durumunu getir
   */
  async getTimer(roomId: string) {
    const room = await prisma.room.findUnique({
      where: {id: roomId},
      select: {
        id: true,
        timeLeftSec: true,
        durationSec: true,
      },
    });

    if (!room) {
      return null;
    }

    return {
      roomId: room.id,
      timeLeft: room.timeLeftSec,
      duration: room.durationSec,
      isRunning: this.timers.has(roomId),
    };
  }

  /**
   * Tüm aktif timer'ları başlat (server başlangıcında)
   */
  async startAllActiveTimers() {
    const activeRooms = await prisma.room.findMany({
      where: {
        timeLeftSec: {
          gt: 0,
        },
      },
      select: {
        id: true,
      },
    });

    for (const room of activeRooms) {
      await this.startTimer(room.id);
    }

    console.log(`Started ${activeRooms.length} active room timers`);
  }

  /**
   * Tüm timer'ları durdur (server kapanışında)
   */
  async stopAllTimers() {
    for (const [roomId] of this.timers) {
      await this.stopTimer(roomId);
    }
  }
}

export const timerService = new TimerService();

