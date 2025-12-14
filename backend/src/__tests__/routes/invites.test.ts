import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken, createTestRoom} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock badgeService
jest.mock('../../services/badgeService', () => ({
  badgeService: {
    addXP: jest.fn().mockResolvedValue({xp: 10, level: 1, leveledUp: false}),
  },
  XP_REWARDS: {
    INVITE_SENT: 10,
  },
}));

describe('Invites Routes', () => {
  let app: any;
  let user1: any;
  let user2: any;
  let token1: string;
  let token2: string;
  let room: any;

  beforeAll(() => {
    app = createApp();
  });

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
    token1 = generateTestToken(user1.id);
    token2 = generateTestToken(user2.id);

    // Create friendship
    await prisma.friendship.createMany({
      data: [
        {userId: user1.id, friendId: user2.id},
        {userId: user2.id, friendId: user1.id},
      ],
    });

    // Create room
    room = await createTestRoom(user1.id, {
      name: 'Invite Test Room',
      category: 'Test',
    });
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/invites', () => {
    it('should send invite successfully', async () => {
      const response = await request(app)
        .post('/api/v1/invites')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          roomId: room.id,
          friendId: user2.id,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.inviterId).toBe(user1.id);
      expect(response.body.data.inviteeId).toBe(user2.id);
    });

    it('should require roomId and friendId', async () => {
      const response = await request(app)
        .post('/api/v1/invites')
        .set('Authorization', `Bearer ${token1}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should require user to be in room', async () => {
      const otherRoom = await createTestRoom(user2.id);

      const response = await request(app)
        .post('/api/v1/invites')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          roomId: otherRoom.id,
          friendId: user2.id,
        })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/invites', () => {
    it('should return received invites', async () => {
      // Create invite
      await prisma.invite.create({
        data: {
          inviterId: user1.id,
          inviteeId: user2.id,
          inviteeEmail: user2.email,
          roomId: room.id,
          status: 'PENDING',
        },
      });

      const response = await request(app)
        .get('/api/v1/invites')
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/v1/invites/:id/accept', () => {
    it('should accept invite successfully', async () => {
      const invite = await prisma.invite.create({
        data: {
          inviterId: user1.id,
          inviteeId: user2.id,
          inviteeEmail: user2.email,
          roomId: room.id,
          status: 'PENDING',
        },
      });

      const response = await request(app)
        .post(`/api/v1/invites/${invite.id}/accept`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.roomId).toBe(room.id);

      // Verify user joined room
      const participant = await prisma.roomParticipant.findUnique({
        where: {
          userId_roomId: {
            userId: user2.id,
            roomId: room.id,
          },
        },
      });
      expect(participant).not.toBeNull();
    });
  });

  describe('POST /api/v1/invites/:id/reject', () => {
    it('should reject invite successfully', async () => {
      const invite = await prisma.invite.create({
        data: {
          inviterId: user1.id,
          inviteeId: user2.id,
          inviteeEmail: user2.email,
          roomId: room.id,
          status: 'PENDING',
        },
      });

      const response = await request(app)
        .post(`/api/v1/invites/${invite.id}/reject`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify invite status
      const updatedInvite = await prisma.invite.findUnique({
        where: {id: invite.id},
      });
      expect(updatedInvite?.status).toBe('REJECTED');
    });
  });
});
