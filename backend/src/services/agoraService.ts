import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { HttpError } from '../errors';
import { logger } from '../logger';

class AgoraService {
  private appId: string;
  private appCertificate: string;

  constructor() {
    this.appId = process.env.AGORA_APP_ID || '';
    this.appCertificate = process.env.AGORA_APP_CERTIFICATE || '';

    if (!this.appId || !this.appCertificate) {
      logger.warn('Agora credentials not fully configured. Token generation will fail.');
    }
  }

  /**
   * Agora RTC token oluştur
   * @param channelName Kanal adı (genellikle roomId)
   * @param uid Kullanıcı ID (number veya string)
   * @param expirationTimeInSeconds Token geçerlilik süresi (saniye cinsinden, default: 24 saat)
   * @returns Agora RTC token
   */
  generateToken(
    channelName: string,
    uid: number | string,
    expirationTimeInSeconds: number = 86400, // 24 saat
  ): string {
    if (!this.appId || !this.appCertificate) {
      throw new HttpError(
        500,
        'Agora credentials not configured. Please set AGORA_APP_ID and AGORA_APP_CERTIFICATE environment variables.',
      );
    }

    if (!channelName || channelName.trim().length === 0) {
      throw new HttpError(400, 'Channel name is required');
    }

    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

      // UID'yi number'a çevir (string ise)
      const numericUid = typeof uid === 'string' ? parseInt(uid, 10) : uid;

      // Token oluştur (PUBLISHER role - ses gönderebilir ve alabilir)
      const token = RtcTokenBuilder.buildTokenWithUid(
        this.appId,
        this.appCertificate,
        channelName,
        numericUid,
        RtcRole.PUBLISHER,
        privilegeExpiredTs,
      );

      logger.info(`Agora token generated for channel: ${channelName}, uid: ${numericUid}`);
      return token;
    } catch (error) {
      logger.error('Error generating Agora token:', error);
      throw new HttpError(500, 'Failed to generate Agora token');
    }
  }

  /**
   * App ID'yi getir
   */
  getAppId(): string {
    return this.appId;
  }

  /**
   * Agora credentials'ların yapılandırılıp yapılandırılmadığını kontrol et
   */
  isConfigured(): boolean {
    return !!(this.appId && this.appCertificate);
  }
}

export const agoraService = new AgoraService();

