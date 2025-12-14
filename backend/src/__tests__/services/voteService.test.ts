import {voteService} from '../../services/voteService';
import {createTestUser, cleanupTestData, createTestRoom, createTestUsers, getMockSocketIOServer} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {timerService} from '../../services/timerService';
import {emitToRoom} from '../../websocket/server';

// Mock timerService
jest.mock('../../services/timerService', () => ({
  timerService: {
    startTimer: jest.fn().mockResolvedValue(undefined),
    stopTimer: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToRoom: jest.fn(),
}));

describe('VoteService', () => {
  let users: any[];
  let room: any;

  beforeEach(async () => {
    await cleanupTestData();
    
    // Create 8 users for a full room
    users = await createTestUsers(8, 'test');
    
    // Set up WebSocket mock
    const mockIO = getMockSocketIOServer();
    voteService.setIO(mockIO as any);
    
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('voteExtension', () => {
    beforeEach(async () => {
      // Create a room with 8 participants in last 10 seconds
      room = await createTestRoom(users[0].id, {
        name: 'Vote Test Room',
        category: 'Test',
        maxParticipants: 8,
        durationSec: 300,
      });
      
      // Add all participants
      for (let i = 1; i < 8; i++) {
        await prisma.roomParticipant.create({
          data: {
            userId: users[i].id,
            roomId: room.id,
          },
        });
      }
      
      // Set room to last 10 seconds
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 10},
      });
    });

    it('should record yes vote successfully', async () => {
      const result = await voteService.voteExtension(users[0].id, room.id, 'yes');

      expect(result.vote).toBe('yes');
      expect(result.extensionYes).toBe(1);
      expect(result.extensionNo).toBe(0);
      expect(result.totalVotes).toBe(1);
      
      // Verify WebSocket event
      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'vote-update',
        expect.objectContaining({
          roomId: room.id,
          userId: users[0].id,
          vote: 'yes',
        })
      );
    });

    it('should record no vote successfully', async () => {
      const result = await voteService.voteExtension(users[0].id, room.id, 'no');

      expect(result.vote).toBe('no');
      expect(result.extensionYes).toBe(0);
      expect(result.extensionNo).toBe(1);
      expect(result.totalVotes).toBe(1);
    });

    it('should throw error if room does not exist', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';

      await expect(voteService.voteExtension(users[0].id, fakeRoomId, 'yes')).rejects.toThrow(HttpError);
      await expect(voteService.voteExtension(users[0].id, fakeRoomId, 'yes')).rejects.toThrow('Oda bulunamadı');
    });

    it('should throw error if user is not in room', async () => {
      const outsider = await createTestUser({
        email: 'outsider@test.com',
        name: 'Outsider',
        password: 'password123',
        gender: 'male',
      });

      await expect(voteService.voteExtension(outsider.id, room.id, 'yes')).rejects.toThrow(HttpError);
      await expect(voteService.voteExtension(outsider.id, room.id, 'yes')).rejects.toThrow('Bu odada değilsiniz');
    });

    it('should throw error if timer is not in last 10 seconds', async () => {
      // Set room to 11 seconds (not in voting window)
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 11},
      });

      await expect(voteService.voteExtension(users[0].id, room.id, 'yes')).rejects.toThrow(HttpError);
      await expect(voteService.voteExtension(users[0].id, room.id, 'yes')).rejects.toThrow('Uzama oylaması sadece son 10 saniyede yapılabilir');
    });

    it('should throw error if timer has expired', async () => {
      // Set room to expired
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 0},
      });

      await expect(voteService.voteExtension(users[0].id, room.id, 'yes')).rejects.toThrow(HttpError);
      await expect(voteService.voteExtension(users[0].id, room.id, 'yes')).rejects.toThrow('Uzama oylaması sadece son 10 saniyede yapılabilir');
    });

    it('should process vote result when all participants vote', async () => {
      // All 8 users vote
      for (let i = 0; i < 8; i++) {
        await voteService.voteExtension(users[i].id, room.id, i < 5 ? 'yes' : 'no'); // 5 yes, 3 no
      }

      // Verify room was extended (5/8 = 62.5% > 50%)
      const updatedRoom = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(updatedRoom?.extended).toBe(true);
      expect(updatedRoom?.timeLeftSec).toBe(300); // Extended to 5 minutes
      
      // Verify timer was restarted
      expect(timerService.stopTimer).toHaveBeenCalledWith(room.id);
      expect(timerService.startTimer).toHaveBeenCalledWith(room.id);
      
      // Verify WebSocket events
      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'room-extended',
        expect.objectContaining({
          roomId: room.id,
          newTimeLeft: 300,
        })
      );
    });

    it('should close room if majority votes no', async () => {
      // All 8 users vote (3 yes, 5 no)
      for (let i = 0; i < 8; i++) {
        await voteService.voteExtension(users[i].id, room.id, i < 3 ? 'yes' : 'no');
      }

      // Verify room was closed (3/8 = 37.5% < 50%)
      const updatedRoom = await prisma.room.findUnique({
        where: {id: room.id},
      });
      expect(updatedRoom?.timeLeftSec).toBe(0);
      
      // Verify timer was stopped
      expect(timerService.stopTimer).toHaveBeenCalledWith(room.id);
      
      // Verify WebSocket events
      expect(emitToRoom).toHaveBeenCalledWith(
        expect.anything(),
        room.id,
        'vote-result',
        expect.objectContaining({
          result: 'close',
        })
      );
    });
  });

  describe('getVoteStatus', () => {
    beforeEach(async () => {
      room = await createTestRoom(users[0].id, {
        name: 'Vote Status Test',
        category: 'Test',
        maxParticipants: 8,
      });
      
      // Add all participants
      for (let i = 1; i < 8; i++) {
        await prisma.roomParticipant.create({
          data: {
            userId: users[i].id,
            roomId: room.id,
          },
        });
      }
    });

    it('should return vote status with no votes', async () => {
      const status = await voteService.getVoteStatus(room.id);

      expect(status.extensionYes).toBe(0);
      expect(status.extensionNo).toBe(0);
      expect(status.totalVotes).toBe(0);
      expect(status.totalParticipants).toBe(8);
      expect(status.votesRemaining).toBe(8);
      expect(status.allVotesIn).toBe(false);
    });

    it('should return vote status with some votes', async () => {
      // Set room to voting window and add some votes
      await prisma.room.update({
        where: {id: room.id},
        data: {
          timeLeftSec: 10,
          extensionYes: 3,
          extensionNo: 2,
        },
      });

      const status = await voteService.getVoteStatus(room.id);

      expect(status.extensionYes).toBe(3);
      expect(status.extensionNo).toBe(2);
      expect(status.totalVotes).toBe(5);
      expect(status.votesRemaining).toBe(3);
      expect(status.allVotesIn).toBe(false);
    });

    it('should return all votes in when all participants voted', async () => {
      await prisma.room.update({
        where: {id: room.id},
        data: {
          timeLeftSec: 10,
          extensionYes: 5,
          extensionNo: 3,
        },
      });

      const status = await voteService.getVoteStatus(room.id);

      expect(status.totalVotes).toBe(8);
      expect(status.votesRemaining).toBe(0);
      expect(status.allVotesIn).toBe(true);
    });

    it('should throw error if room does not exist', async () => {
      const fakeRoomId = '00000000-0000-0000-0000-000000000000';

      await expect(voteService.getVoteStatus(fakeRoomId)).rejects.toThrow(HttpError);
      await expect(voteService.getVoteStatus(fakeRoomId)).rejects.toThrow('Oda bulunamadı');
    });
  });
});
