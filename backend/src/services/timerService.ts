import {prisma} from '../lib/prisma';
import {emitToRoom} from '../websocket/server';
import {Server as SocketIOServer} from 'socket.io';
import {badgeService, XP_REWARDS} from './badgeService';
import {logger} from '../logger';

interface TimerJob {
  roomId: string;
  intervalId: NodeJS.Timeout;
}

class TimerService {
  private timers: Map<string, TimerJob> = new Map();
  private io: SocketIOServer | null = null;
  private voteStarted: Set<string> = new Set(); // Hangi odalarda oylama başlatıldı

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
    // Oylama durumunu da temizle
    this.voteStarted.delete(roomId);
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

      // Son 10 saniyede uzama oylaması başlat (sadece bir kez)
      if (newTimeLeft === 10 && !room.extended && !this.voteStarted.has(roomId)) {
        // Uzama oylaması henüz başlatılmamışsa başlat
        this.voteStarted.add(roomId);
        if (this.io) {
          emitToRoom(this.io, roomId, 'extension-vote-start', {
            roomId,
            timeLeft: newTimeLeft,
            message: 'Süreyi uzatalım mı? 10 saniye içinde oy verin.',
          });
        }
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

      // Tüm katılımcılara XP ver (oda tamamlandı)
      for (const participant of room.participants) {
        try {
          await badgeService.addXP(participant.user.id, XP_REWARDS.ROOM_COMPLETION, 'room-completion');
        } catch (error) {
          console.error(`Error adding XP to user ${participant.user.id}:`, error);
          // XP hatası olsa bile devam et
        }
      }

      // WebSocket ile oda kapandı bildirimi gönder
      if (this.io) {
        emitToRoom(this.io, roomId, 'room-closed', {
          roomId,
          reason: 'timer-expired',
        });

        // Tüm katılımcılara bildir
        room.participants.forEach(() => {
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
   * Sadece timer başlamış odalar için (timeLeftSec > 0 ve timeLeftSec < durationSec)
   */
  async startAllActiveTimers() {
    const activeRooms = await prisma.room.findMany({
      where: {
        timeLeftSec: {
          gt: 0,
        },
      },
      include: {
        participants: true,
      },
    });

    // Sadece timer başlamış ve çalışan odalar için timer başlat
    // (timeLeftSec === durationSec ise timer henüz başlamamış demektir)
    const roomsToStart = activeRooms.filter(room => {
      // Timer başlamış ve çalışıyor (timeLeftSec < durationSec)
      // VEYA oda dolmuş ve timer başlamış (timeLeftSec === durationSec ve participants.length === maxParticipants)
      return room.timeLeftSec < room.durationSec || 
             (room.timeLeftSec === room.durationSec && room.participants.length === room.maxParticipants);
    });

    for (const room of roomsToStart) {
      await this.startTimer(room.id);
    }

    logger.info(`Started ${roomsToStart.length} active room timers`);
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

