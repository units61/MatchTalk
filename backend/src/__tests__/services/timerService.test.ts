import {timerService} from '../../services/timerService';
import {createTestUser, cleanupTestData, createTestRoom, getMockSocketIOServer} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {badgeService} from '../../services/badgeService';
import {emitToRoom} from '../../websocket/server';

// Mock badgeService
jest.mock('../../services/badgeService', () => ({
  badgeService: {
    addXP: jest.fn().mockResolvedValue({xp: 100, level: 1, leveledUp: false}),
  },
  XP_REWARDS: {
    ROOM_COMPLETION: 50,
  },
}));

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToRoom: jest.fn(),
}));

describe('TimerService', () => {
  let user1: any;
  let user2: any;
  let room: any;

  beforeEach(async () => {
    jest.useFakeTimers();
    await cleanupTestData();
    
    user1 = await createTestUser({
      email: 'user1@test.com',
      name: 'User 1',
      password: 'password123',
      gender: 'male',
    });
    
    user2 = await createTestUser({
      email: 'user2@test.com',
      name: 'User 2',
      password: 'password123',
      gender: 'female',
    });

    // Set up WebSocket mock
    const mockIO = getMockSocketIOServer();
    timerService.setIO(mockIO as any);
    
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('startTimer', () => {
    it('should start a timer for a room', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Timer Test Room',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      await timerService.startTimer(room.id);

      const timerStatus = await timerService.getTimer(room.id);
      expect(timerStatus?.isRunning).toBe(true);
    });

    it('should stop existing timer before starting new one', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Timer Replace Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      // Start timer first time
      await timerService.startTimer(room.id);
      
      // Start timer again (should replace)
      await timerService.startTimer(room.id);

      const timerStatus = await timerService.getTimer(room.id);
      expect(timerStatus?.isRunning).toBe(true);
    });
  });

  describe('stopTimer', () => {
    it('should stop a running timer', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Stop Timer Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      await timerService.startTimer(room.id);
      await timerService.stopTimer(room.id);

      const timerStatus = await timerService.getTimer(room.id);
      expect(timerStatus?.isRunning).toBe(false);
    });

    it('should handle stopping non-existent timer gracefully', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';
      await expect(timerService.stopTimer(fakeRoomId)).resolves.not.toThrow();
    });
  });

  describe('updateTimer', () => {
    it('should decrement timeLeftSec by 1 each second', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Update Timer Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      await timerService.startTimer(room.id);

      // Fast-forward 5 seconds
      jest.advanceTimersByTime(5000);

      // Wait for async operations
      await new Promise(resolve => setImmediate(resolve));

      const updatedRoom = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(updatedRoom?.timeLeftSec).toBe(295); // 300 - 5
    });

    it('should emit timer-update event via WebSocket', async () => {
      room = await createTestRoom(user1.id, {
        name: 'WebSocket Timer Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      await timerService.startTimer(room.id);

      // Fast-forward 1 second
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setImmediate(resolve));

      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'timer-update',
        expect.objectContaining({
          roomId: room.id,
          timeLeft: 299,
        })
      );
    });

    it('should trigger extension vote at 10 seconds', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Extension Vote Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 11}, // Start at 11 seconds
      });

      await timerService.startTimer(room.id);

      // Fast-forward 1 second (should trigger vote at 10)
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setImmediate(resolve));

      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'extension-vote-start',
        expect.objectContaining({
          roomId: room.id,
          timeLeft: 10,
        })
      );
    });

    it('should not trigger extension vote if already extended', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Extended Room Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {
          timeLeftSec: 11,
          extended: true, // Already extended
        },
      });

      await timerService.startTimer(room.id);

      // Fast-forward 1 second
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setImmediate(resolve));

      // Should not emit extension-vote-start
      const calls = (emitToRoom as jest.Mock).mock.calls;
      const voteStartCalls = calls.filter((call: any[]) => call[2] === 'extension-vote-start');
      expect(voteStartCalls).toHaveLength(0);
    });

    it('should stop timer if room does not exist', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';
      
      // This will fail but should handle gracefully
      await timerService.startTimer(fakeRoomId);
      
      // Fast-forward 1 second
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setImmediate(resolve));

      const timerStatus = await timerService.getTimer(fakeRoomId);
      expect(timerStatus).toBeNull();
    });
  });

  describe('handleTimerExpiration', () => {
    it('should close room and award XP when timer expires', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Expiration Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.roomParticipant.create({
        data: {
          userId: user2.id,
          roomId: room.id,
        },
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 1}, // 1 second left
      });

      await timerService.startTimer(room.id);

      // Fast-forward 1 second (timer expires)
      jest.advanceTimersByTime(1000);
      await new Promise(resolve => setImmediate(resolve));

      // Verify room is closed
      const updatedRoom = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(updatedRoom?.timeLeftSec).toBe(0);

      // Verify XP was awarded
      expect(badgeService.addXP).toHaveBeenCalledTimes(2); // 2 participants
      expect(badgeService.addXP).toHaveBeenCalledWith(
        user1.id,
        50, // XP_REWARDS.ROOM_COMPLETION
        'room-completion'
      );

      // Verify WebSocket events
      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'room-closed',
        expect.objectContaining({
          roomId: room.id,
          reason: 'timer-expired',
        })
      );
    });
  });

  describe('getTimer', () => {
    it('should return timer status for running timer', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Get Timer Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 250},
      });

      await timerService.startTimer(room.id);

      const timerStatus = await timerService.getTimer(room.id);
      expect(timerStatus).toEqual({
        roomId: room.id,
        timeLeft: 250,
        duration: 300,
        isRunning: true,
      });
    });

    it('should return timer status for stopped timer', async () => {
      room = await createTestRoom(user1.id, {
        name: 'Stopped Timer Test',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 250},
      });

      const timerStatus = await timerService.getTimer(room.id);
      expect(timerStatus?.isRunning).toBe(false);
    });

    it('should return null for non-existent room', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';
      const timerStatus = await timerService.getTimer(fakeRoomId);
      expect(timerStatus).toBeNull();
    });
  });

  describe('startAllActiveTimers', () => {
    it('should start timers for all active rooms', async () => {
      const room1 = await createTestRoom(user1.id, {
        name: 'Active Room 1',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room1.id},
        data: {timeLeftSec: 250}, // Active and running
      });

      const room2 = await createTestRoom(user2.id, {
        name: 'Active Room 2',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room2.id},
        data: {timeLeftSec: 300}, // Active but not started
      });

      await timerService.startAllActiveTimers();

      const timer1Status = await timerService.getTimer(room1.id);
      expect(timer1Status?.isRunning).toBe(true);

      // Room2 should not have timer started (timeLeftSec === durationSec)
      const timer2Status = await timerService.getTimer(room2.id);
      expect(timer2Status?.isRunning).toBe(false);
    });
  });

  describe('stopAllTimers', () => {
    it('should stop all running timers', async () => {
      const room1 = await createTestRoom(user1.id, {
        name: 'Stop All Test 1',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room1.id},
        data: {timeLeftSec: 250},
      });

      const room2 = await createTestRoom(user2.id, {
        name: 'Stop All Test 2',
        category: 'Test',
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: room2.id},
        data: {timeLeftSec: 200},
      });

      await timerService.startTimer(room1.id);
      await timerService.startTimer(room2.id);

      await timerService.stopAllTimers();

      expect(await timerService.getTimer(room1.id)).toMatchObject({isRunning: false});
      expect(await timerService.getTimer(room2.id)).toMatchObject({isRunning: false});
    });
  });
});
