import {emailService} from '../../services/emailService';
import {HttpError} from '../../errors';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({messageId: 'test-message-id'}),
  })),
}));

// Mock fs
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '<html>{{userName}} - {{appName}}</html>'),
}));

describe('EmailService', () => {
  beforeEach(() => {
    // Set SMTP config for tests
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASS = 'testpass';
    process.env.FROM_EMAIL = 'noreply@test.com';
    process.env.FROM_NAME = 'Test App';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      // Re-initialize service with test config
      const {EmailService} = require('../../services/emailService');
      const testEmailService = new EmailService();

      await expect(
        testEmailService.sendEmail('test@example.com', 'Test Subject', '<p>Test HTML</p>', 'Test Text')
      ).resolves.not.toThrow();
    });

    it('should throw error if email service not configured', async () => {
      // Service without SMTP config
      delete process.env.SMTP_USER;
      delete process.env.SMTP_PASS;
      
      const {EmailService} = require('../../services/emailService');
      const testEmailService = new EmailService();

      await expect(
        testEmailService.sendEmail('test@example.com', 'Test', '<p>Test</p>')
      ).rejects.toThrow(HttpError);
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email', async () => {
      process.env.SMTP_USER = 'test@test.com';
      process.env.SMTP_PASS = 'testpass';
      
      const {EmailService} = require('../../services/emailService');
      const testEmailService = new EmailService();

      await expect(
        testEmailService.sendWelcomeEmail('newuser@test.com', 'New User')
      ).resolves.not.toThrow();
    });
  });

  describe('sendInviteEmail', () => {
    it('should send invite email', async () => {
      process.env.SMTP_USER = 'test@test.com';
      process.env.SMTP_PASS = 'testpass';
      
      const {EmailService} = require('../../services/emailService');
      const testEmailService = new EmailService();

      await expect(
        testEmailService.sendInviteEmail('Inviter', 'invitee@test.com', 'room-123')
      ).resolves.not.toThrow();
    });
  });
});
