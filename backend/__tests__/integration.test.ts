import request from 'supertest';
import dotenv from 'dotenv';
import path from 'path';
import {createApp} from '../src/app';
import {prisma} from '../src/lib/prisma';

dotenv.config({path: path.join(__dirname, '..', '.env')});

const app = createApp();

const truncateAll = async () => {
  await prisma.$transaction([
    prisma.matchQueue.deleteMany(),
    prisma.roomParticipant.deleteMany(),
    prisma.room.deleteMany(),
    prisma.friendship.deleteMany(),
    prisma.invite.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};

const registerAndLogin = async (email: string, password = 'P@ssw0rd!', gender = 'male') => {
  const name = email.split('@')[0];
  await request(app).post('/auth/register').send({
    email,
    password,
    name,
    gender,
  });

  const loginRes = await request(app).post('/auth/login').send({
    email,
    password,
  });

  const token = loginRes.body?.data?.token as string;
  return {token, user: loginRes.body?.data?.user};
};

describe('Integration: auth/rooms/matching', () => {
  beforeAll(async () => {
    await truncateAll();
  });

  afterAll(async () => {
    await truncateAll();
    await prisma.$disconnect();
  });

  it('health endpoint works', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('auth -> rooms -> matching flow', async () => {
    const email1 = `user1_${Date.now()}@example.com`;
    const email2 = `user2_${Date.now()}@example.com`;
    const email3 = `user3_${Date.now()}@example.com`;

    // Register/login user1 (room owner)
    const {token: token1} = await registerAndLogin(email1, 'P@ssw0rd!', 'female');
    expect(token1).toBeTruthy();

    // Create room with user1
    const roomRes = await request(app)
      .post('/rooms')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Test Room',
        category: 'General',
        maxParticipants: 8,
        durationSec: 300,
      });
    expect(roomRes.status).toBe(201);
    const roomId = roomRes.body?.data?.id as string;
    expect(roomId).toBeTruthy();

    // Register/login user2, join the room
    const {token: token2} = await registerAndLogin(email2);
    expect(token2).toBeTruthy();
    const joinRes = await request(app)
      .post(`/rooms/${roomId}/join`)
      .set('Authorization', `Bearer ${token2}`)
      .send();
    expect(joinRes.status).toBe(200);

    // Register/login user3, join and leave matching queue
    const {token: token3} = await registerAndLogin(email3);
    const joinQueue = await request(app)
      .post('/matching/join')
      .set('Authorization', `Bearer ${token3}`)
      .send();
    expect(joinQueue.status).toBe(200);

    const leaveQueue = await request(app)
      .post('/matching/leave')
      .set('Authorization', `Bearer ${token3}`)
      .send();
    expect(leaveQueue.status).toBe(200);
    expect(leaveQueue.body?.data?.success).toBe(true);
  });
});

