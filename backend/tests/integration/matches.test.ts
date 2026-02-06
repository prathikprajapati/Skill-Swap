import request from 'supertest';
import { PrismaClient } from '../../src/generated/prisma';
import app from '../../src/server';

const prisma = new PrismaClient();

describe('Matches Endpoints', () => {
  let authToken1: string;
  let authToken2: string;
  let userId1: string;
  let userId2: string;
  let matchId: string;

  beforeAll(async () => {
    // Clean database
    await prisma.message.deleteMany();
    await prisma.match.deleteMany();
    await prisma.matchRequest.deleteMany();
    await prisma.userSkill.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();

    // Create two test users
    const signupResponse1 = await request(app)
      .post('/auth/signup')
      .send({
        email: 'matchuser1@example.com',
        password: 'password123',
        name: 'Match User One'
      });

    authToken1 = signupResponse1.body.token;
    userId1 = signupResponse1.body.user.id;

    const signupResponse2 = await request(app)
      .post('/auth/signup')
      .send({
        email: 'matchuser2@example.com',
        password: 'password123',
        name: 'Match User Two'
      });

    authToken2 = signupResponse2.body.token;
    userId2 = signupResponse2.body.user.id;

    // Create skills
    const skill1 = await prisma.skill.create({
      data: { name: 'JavaScript', category: 'Programming' }
    });
    const skill2 = await prisma.skill.create({
      data: { name: 'Python', category: 'Programming' }
    });

    // Add complementary skills
    await prisma.userSkill.create({
      data: {
        user_id: userId1,
        skill_id: skill1.id,
        skill_type: 'offer'
      }
    });
    await prisma.userSkill.create({
      data: {
        user_id: userId1,
        skill_id: skill2.id,
        skill_type: 'want'
      }
    });
    await prisma.userSkill.create({
      data: {
        user_id: userId2,
        skill_id: skill2.id,
        skill_type: 'offer'
      }
    });
    await prisma.userSkill.create({
      data: {
        user_id: userId2,
        skill_id: skill1.id,
        skill_type: 'want'
      }
    });

    // Create a match by accepting a request
    await request(app)
      .post('/requests')
      .set('Authorization', `Bearer ${authToken1}`)
      .send({ receiver_id: userId2 });

    const incomingResponse = await request(app)
      .get('/requests/incoming')
      .set('Authorization', `Bearer ${authToken2}`);

    const requestId = incomingResponse.body[0].id;

    const acceptResponse = await request(app)
      .put(`/requests/${requestId}/accept`)
      .set('Authorization', `Bearer ${authToken2}`);

    matchId = acceptResponse.body.match.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /matches/recommended', () => {
    it('should return recommended matches', async () => {
      const response = await request(app)
        .get('/matches/recommended')
        .set('Authorization', `Bearer ${authToken1}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Should not include the already matched user
      const matchedUsers = response.body.filter((user: any) => user.id === userId2);
      expect(matchedUsers.length).toBe(0);
    });

    it('should calculate match scores correctly', async () => {
      const response = await request(app)
        .get('/matches/recommended')
        .set('Authorization', `Bearer ${authToken1}`)
        .expect(200);

      if (response.body.length > 0) {
        const match = response.body[0];
        expect(match).toHaveProperty('match_score');
        expect(match).toHaveProperty('mutual_matches');
        expect(match).toHaveProperty('skill_overlap');
        expect(match.match_score).toBeGreaterThanOrEqual(0);
        expect(match.match_score).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('GET /matches/:id/messages', () => {
    it('should return messages for a match', async () => {
      const response = await request(app)
        .get(`/matches/${matchId}/messages`)
        .set('Authorization', `Bearer ${authToken1}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 for unauthorized access', async () => {
      // Create another user who doesn't have access to this match
      const signupResponse3 = await request(app)
        .post('/auth/signup')
        .send({
          email: 'unauthorized@example.com',
          password: 'password123',
          name: 'Unauthorized User'
        });

      const authToken3 = signupResponse3.body.token;

      await request(app)
        .get(`/matches/${matchId}/messages`)
        .set('Authorization', `Bearer ${authToken3}`)
        .expect(401);
    });
  });

  describe('POST /messages', () => {
    it('should send a message in a match', async () => {
      const messageData = {
        match_id: matchId,
        content: 'Hello, this is a test message!'
      };

      const response = await request(app)
        .post('/messages')
        .set('Authorization', `Bearer ${authToken1}`)
        .send(messageData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('content', messageData.content);
      expect(response.body).toHaveProperty('sender_id', userId1);
      expect(response.body).toHaveProperty('match_id', matchId);
      expect(response.body).toHaveProperty('is_read', false);
    });

    it('should return messages after sending', async () => {
      const messagesResponse = await request(app)
        .get(`/matches/${matchId}/messages`)
        .set('Authorization', `Bearer ${authToken1}`)
        .expect(200);

      expect(messagesResponse.body.length).toBeGreaterThan(0);
      expect(messagesResponse.body[0]).toHaveProperty('content');
      expect(messagesResponse.body[0]).toHaveProperty('sender');
    });
  });

  describe('PUT /messages/:id/read', () => {
    it('should mark message as read', async () => {
      // Get messages to find one to mark as read
      const messagesResponse = await request(app)
        .get(`/matches/${matchId}/messages`)
        .set('Authorization', `Bearer ${authToken2}`);

      const messageId = messagesResponse.body[0].id;

      await request(app)
        .put(`/messages/${messageId}/read`)
        .set('Authorization', `Bearer ${authToken2}`)
        .expect(200);

      // Verify message is marked as read
      const updatedMessagesResponse = await request(app)
        .get(`/matches/${matchId}/messages`)
        .set('Authorization', `Bearer ${authToken2}`);

      const updatedMessage = updatedMessagesResponse.body.find((msg: any) => msg.id === messageId);
      expect(updatedMessage.is_read).toBe(true);
    });
  });
});
