import {agoraService} from '../../services/agoraService';
import {HttpError} from '../../errors';

// Mock agora-access-token
jest.mock('agora-access-token', () => ({
  RtcTokenBuilder: {
    buildTokenWithUid: jest.fn().mockReturnValue('mock-agora-token'),
  },
  RtcRole: {
    PUBLISHER: 1,
    SUBSCRIBER: 2,
  },
}));

describe('AgoraService', () => {
  beforeEach(() => {
    // Set Agora credentials for tests
    process.env.AGORA_APP_ID = 'test-app-id';
    process.env.AGORA_APP_CERTIFICATE = 'test-certificate';
  });

  afterEach(() => {
    delete process.env.AGORA_APP_ID;
    delete process.env.AGORA_APP_CERTIFICATE;
  });

  describe('generateToken', () => {
    it('should generate token successfully', () => {
      // Re-initialize service with test config
      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      const token = testService.generateToken('room-123', 'user-456', 3600);

      expect(token).toBe('mock-agora-token');
    });

    it('should throw error if credentials not configured', () => {
      delete process.env.AGORA_APP_ID;
      delete process.env.AGORA_APP_CERTIFICATE;

      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      expect(() => {
        testService.generateToken('room-123', 'user-456');
      }).toThrow(HttpError);
    });

    it('should throw error if channel name is empty', () => {
      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      expect(() => {
        testService.generateToken('', 'user-456');
      }).toThrow(HttpError);
    });

    it('should handle numeric UID', () => {
      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      const token = testService.generateToken('room-123', 12345);

      expect(token).toBe('mock-agora-token');
    });
  });

  describe('getAppId', () => {
    it('should return app ID', () => {
      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      expect(testService.getAppId()).toBe('test-app-id');
    });
  });

  describe('isConfigured', () => {
    it('should return true when configured', () => {
      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      expect(testService.isConfigured()).toBe(true);
    });

    it('should return false when not configured', () => {
      delete process.env.AGORA_APP_ID;

      const {AgoraService} = require('../../services/agoraService');
      const testService = new AgoraService();

      expect(testService.isConfigured()).toBe(false);
    });
  });
});
