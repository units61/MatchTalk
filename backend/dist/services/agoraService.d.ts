declare class AgoraService {
    private appId;
    private appCertificate;
    constructor();
    /**
     * Agora RTC token oluştur
     * @param channelName Kanal adı (genellikle roomId)
     * @param uid Kullanıcı ID (number veya string)
     * @param expirationTimeInSeconds Token geçerlilik süresi (saniye cinsinden, default: 24 saat)
     * @returns Agora RTC token
     */
    generateToken(channelName: string, uid: number | string, expirationTimeInSeconds?: number): string;
    /**
     * App ID'yi getir
     */
    getAppId(): string;
    /**
     * Agora credentials'ların yapılandırılıp yapılandırılmadığını kontrol et
     */
    isConfigured(): boolean;
}
export declare const agoraService: AgoraService;
export {};
//# sourceMappingURL=agoraService.d.ts.map