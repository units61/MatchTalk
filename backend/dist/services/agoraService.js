"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agoraService = void 0;
const agora_access_token_1 = require("agora-access-token");
const errors_1 = require("../errors");
const logger_1 = require("../logger");
class AgoraService {
    constructor() {
        this.appId = process.env.AGORA_APP_ID || '';
        this.appCertificate = process.env.AGORA_APP_CERTIFICATE || '';
        if (!this.appId || !this.appCertificate) {
            logger_1.logger.warn('Agora credentials not fully configured. Token generation will fail.');
        }
    }
    /**
     * Agora RTC token oluştur
     * @param channelName Kanal adı (genellikle roomId)
     * @param uid Kullanıcı ID (number veya string)
     * @param expirationTimeInSeconds Token geçerlilik süresi (saniye cinsinden, default: 24 saat)
     * @returns Agora RTC token
     */
    generateToken(channelName, uid, expirationTimeInSeconds = 86400) {
        if (!this.appId || !this.appCertificate) {
            throw new errors_1.HttpError(500, 'Agora credentials not configured. Please set AGORA_APP_ID and AGORA_APP_CERTIFICATE environment variables.');
        }
        if (!channelName || channelName.trim().length === 0) {
            throw new errors_1.HttpError(400, 'Channel name is required');
        }
        try {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
            // UID'yi number'a çevir (string ise)
            const numericUid = typeof uid === 'string' ? parseInt(uid, 10) : uid;
            // Token oluştur (PUBLISHER role - ses gönderebilir ve alabilir)
            const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(this.appId, this.appCertificate, channelName, numericUid, agora_access_token_1.RtcRole.PUBLISHER, privilegeExpiredTs);
            logger_1.logger.info(`Agora token generated for channel: ${channelName}, uid: ${numericUid}`);
            return token;
        }
        catch (error) {
            logger_1.logger.error('Error generating Agora token:', error);
            throw new errors_1.HttpError(500, 'Failed to generate Agora token');
        }
    }
    /**
     * App ID'yi getir
     */
    getAppId() {
        return this.appId;
    }
    /**
     * Agora credentials'ların yapılandırılıp yapılandırılmadığını kontrol et
     */
    isConfigured() {
        return !!(this.appId && this.appCertificate);
    }
}
exports.agoraService = new AgoraService();
//# sourceMappingURL=agoraService.js.map