import {roomsService} from '../../services/roomsService';
import {createTestUser, cleanupTestData, createTestRoom, createTestUsers} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {timerService} from '../../services/timerService';

// Mock timerService
jest.mock('../../services/timerService', () => ({
  timerService: {
    startTimer: jest.fn().mockResolvedValue(undefined),
    stopTimer: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('RoomsService', () => {
  let user1: any;
  let user2: any;
  let user3: any;

  beforeEach(async () => {
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
    user3 = await createTestUser({
      email: 'user3@test.com',
      name: 'User 3',
      password: 'password123',
      gender: 'male',
    });
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('getActiveRooms', () => {
    it('should return empty array when no active rooms exist', async () => {
      const rooms = await roomsService.getActiveRooms();
      expect(rooms).toEqual([]);
    });

    it('should return only active rooms (timeLeftSec > 0)', async () => {
      // Create an active room
      const activeRoom = await createTestRoom(user1.id, {
        name: 'Active Room',
        category: 'Test',
        maxParticipants: 8,
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: activeRoom.id},
        data: {timeLeftSec: 300},
      });

      // Create an expired room (timeLeftSec = 0)
      const expiredRoom = await createTestRoom(user2.id, {
        name: 'Expired Room',
        category: 'Test',
        maxParticipants: 8,
        durationSec: 300,
      });
      await prisma.room.update({
        where: {id: expiredRoom.id},
        data: {timeLeftSec: 0},
      });

      const rooms = await roomsService.getActiveRooms();
      expect(rooms).toHaveLength(1);
      expect(rooms[0].id).toBe(activeRoom.id);
      expect(rooms[0].name).toBe('Active Room');
    });

    it('should return rooms with participant information', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Test Room',
        category: 'Test',
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      const rooms = await roomsService.getActiveRooms();
      expect(rooms[0].participants).toHaveLength(1);
      expect(rooms[0].participants[0].id).toBe(user1.id);
      expect(rooms[0].participants[0].name).toBe('User 1');
      expect(rooms[0].maleCount).toBe(1);
      expect(rooms[0].femaleCount).toBe(0);
    });
  });

  describe('createRoom', () => {
    it('should create a room successfully', async () => {
      const input = {
        name: 'New Room',
        category: 'General',
        maxParticipants: 8,
        durationSec: 300,
      };

      const room = await roomsService.createRoom(user1.id, input);

      expect(room.name).toBe('New Room');
      expect(room.category).toBe('General');
      expect(room.maxParticipants).toBe(8);
      expect(room.durationSec).toBe(300);
      expect(room.timeLeftSec).toBe(0); // Timer should not start until room is full
      expect(room.currentParticipants).toBe(1);
      expect(room.participants).toHaveLength(1);
      expect(room.participants[0].id).toBe(user1.id);
    });

    it('should throw error if user is already in a room', async () => {
      // Create a room and join it
      const existingRoom = await createTestRoom(user1.id);
      await prisma.room.update({
        where: {id: existingRoom.id},
        data: {timeLeftSec: 300}, // Make it active
      });

      const input = {
        name: 'Another Room',
        category: 'General',
        maxParticipants: 8,
        durationSec: 300,
      };

      await expect(roomsService.createRoom(user1.id, input)).rejects.toThrow(HttpError);
      await expect(roomsService.createRoom(user1.id, input)).rejects.toThrow('Zaten bir odadasınız');
    });

    it('should allow creating room if user was in expired room', async () => {
      // Create an expired room
      const expiredRoom = await createTestRoom(user1.id);
      await prisma.room.update({
        where: {id: expiredRoom.id},
        data: {timeLeftSec: 0}, // Expired
      });

      const input = {
        name: 'New Room After Expired',
        category: 'General',
        maxParticipants: 8,
        durationSec: 300,
      };

      const room = await roomsService.createRoom(user1.id, input);
      expect(room.name).toBe('New Room After Expired');
    });
  });

  describe('joinRoom', () => {
    it('should join a room successfully', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Join Test Room',
        category: 'Test',
        maxParticipants: 8,
      });

      const result = await roomsService.joinRoom(user2.id, {roomId: room.id});

      expect(result.currentParticipants).toBe(2);
      expect(result.participants).toHaveLength(2);
      expect(result.participants.some((p: any) => p.id === user2.id)).toBe(true);
    });

    it('should start timer when room becomes full', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Full Room Test',
        category: 'Test',
        maxParticipants: 2, // Small room for testing
      });

      // Join second user (room becomes full)
      await roomsService.joinRoom(user2.id, {roomId: room.id});

      // Verify timer was started
      expect(timerService.startTimer).toHaveBeenCalledWith(room.id);
      
      // Verify timeLeftSec was updated
      const updatedRoom = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(updatedRoom?.timeLeftSec).toBeGreaterThan(0);
    });

    it('should throw error if room does not exist', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';

      await expect(roomsService.joinRoom(user2.id, {roomId: fakeRoomId})).rejects.toThrow(HttpError);
      await expect(roomsService.joinRoom(user2.id, {roomId: fakeRoomId})).rejects.toThrow('Oda bulunamadı');
    });

    it('should throw error if room is full', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Full Room',
        category: 'Test',
        maxParticipants: 2,
      });

      // Fill the room
      await roomsService.joinRoom(user2.id, {roomId: room.id});

      // Try to join with third user
      await expect(roomsService.joinRoom(user3.id, {roomId: room.id})).rejects.toThrow(HttpError);
      await expect(roomsService.joinRoom(user3.id, {roomId: room.id})).rejects.toThrow('Oda dolu');
    });

    it('should throw error if user is already in the room', async () => {
      const room = await createTestRoom(user1.id);

      await expect(roomsService.joinRoom(user1.id, {roomId: room.id})).rejects.toThrow(HttpError);
      await expect(roomsService.joinRoom(user1.id, {roomId: room.id})).rejects.toThrow('Zaten bu odadasınız');
    });

    it('should throw error if user is in another active room', async () => {
      const room1 = await createTestRoom(user1.id);
      await prisma.room.update({
        where: {id: room1.id},
        data: {timeLeftSec: 300}, // Make it active
      });

      const room2 = await createTestRoom(user2.id);

      await expect(roomsService.joinRoom(user1.id, {roomId: room2.id})).rejects.toThrow(HttpError);
      await expect(roomsService.joinRoom(user1.id, {roomId: room2.id})).rejects.toThrow('Başka bir odadasınız');
    });

    it('should handle concurrent join attempts (race condition)', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Concurrent Test',
        category: 'Test',
        maxParticipants: 2,
      });

      // Simulate concurrent joins
      const joinPromises = [
        roomsService.joinRoom(user2.id, {roomId: room.id}),
        roomsService.joinRoom(user3.id, {roomId: room.id}),
      ];

      const results = await Promise.allSettled(joinPromises);
      
      // One should succeed, one should fail (room full)
      const succeeded = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');

      expect(succeeded.length).toBe(1);
      expect(failed.length).toBe(1);
    });
  });

  describe('leaveRoom', () => {
    it('should leave a room successfully', async () => {
      const room = await createTestRoom(user1.id);
      await roomsService.joinRoom(user2.id, {roomId: room.id});

      const result = await roomsService.leaveRoom(user2.id, room.id);

      expect(result.success).toBe(true);

      // Verify user is no longer in the room
      const participants = await prisma.roomParticipant.findMany({
        where: {roomId: room.id},
      });
      expect(participants).toHaveLength(1);
      expect(participants[0].userId).toBe(user1.id);
    });

    it('should delete room when last participant leaves', async () => {
      const room = await createTestRoom(user1.id);

      await roomsService.leaveRoom(user1.id, room.id);

      // Verify room is deleted
      const roomExists = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(roomExists).toBeNull();
    });

    it('should throw error if user is not in the room', async () => {
      const room = await createTestRoom(user1.id);

      await expect(roomsService.leaveRoom(user2.id, room.id)).rejects.toThrow(HttpError);
      await expect(roomsService.leaveRoom(user2.id, room.id)).rejects.toThrow('Bu odada değilsiniz');
    });
  });

  describe('getRoomById', () => {
    it('should return room details successfully', async () => {
      const room = await createTestRoom(user1.id, {
        name: 'Detail Test Room',
        category: 'Test',
      });
      await roomsService.joinRoom(user2.id, {roomId: room.id});

      const result = await roomsService.getRoomById(room.id);

      expect(result.id).toBe(room.id);
      expect(result.name).toBe('Detail Test Room');
      expect(result.currentParticipants).toBe(2);
      expect(result.participants).toHaveLength(2);
      expect(result.maleCount).toBe(2); // user1 and user3 are male
      expect(result.femaleCount).toBe(0);
    });

    it('should include extension vote counts', async () => {
      const room = await createTestRoom(user1.id);
      await prisma.room.update({
        where: {id: room.id},
        data: {
          extensionYes: 5,
          extensionNo: 3,
        },
      });

      const result = await roomsService.getRoomById(room.id);

      expect(result.extensionYes).toBe(5);
      expect(result.extensionNo).toBe(3);
    });

    it('should throw error if room does not exist', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';

      await expect(roomsService.getRoomById(fakeRoomId)).rejects.toThrow(HttpError);
      await expect(roomsService.getRoomById(fakeRoomId)).rejects.toThrow('Oda bulunamadı');
    });
  });
});
