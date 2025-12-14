import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock agora-access-token
jest.mock('agora-access-token', () => ({
  RtcTokenBuilder: {
    buildTokenWithUid: jest.fn().mockReturnValue('mock-agora-token'),
  },
  RtcRole: {
    PUBLISHER: 1,
  },
}));

describe('Agora Routes', () => {
  let app: any;
  let user: any;
  let token: string;

  beforeAll(() => {
    app = createApp();
    process.env.AGORA_APP_ID = 'test-app-id';
    process.env.AGORA_APP_CERTIFICATE = 'test-certificate';
  });

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      gender: 'male',
    });
    token = generateTestToken(user.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
    delete process.env.AGORA_APP_ID;
    delete process.env.AGORA_APP_CERTIFICATE;
  });

  describe('POST /api/v1/agora/token', () => {
    it('should generate Agora token', async () => {
      const response = await request(app)
        .post('/api/v1/agora/token')
        .set('Authorization', `Bearer ${token}`)
        .send({
          channelName: 'room-123',
          expirationTimeInSeconds: 3600,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.appId).toBe('test-app-id');
      expect(response.body.data.channelName).toBe('room-123');
    });

    it('should require authentication', async () => {
      await request(app)
        .post('/api/v1/agora/token')
        .send({
          channelName: 'room-123',
        })
        .expect(401);
    });

    it('should validate channelName', async () => {
      const response = await request(app)
        .post('/api/v1/agora/token')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
