"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agoraRouter = void 0;
const express_1 = require("express");
const agoraService_1 = require("../services/agoraService");
const agora_1 = require("../schemas/agora");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * POST /agora/token
 * Agora RTC token oluştur
 */
router.post('/token', async (req, res) => {
    try {
        const userId = req.userId;
        // Request validation
        const validatedData = agora_1.generateTokenSchema.parse(req.body);
        const { channelName, uid, expirationTimeInSeconds } = validatedData;
        // UID belirtilmemişse userId'yi kullan
        // userId string (UUID), Agora için number'a çevirmemiz gerekiyor
        // Basit bir hash fonksiyonu kullanabiliriz veya userId'nin son 8 karakterini number'a çevirebiliriz
        let numericUid;
        if (uid) {
            numericUid = typeof uid === 'number' ? uid : parseInt(uid.toString(), 10);
        }
        else {
            // userId'den numeric UID oluştur (basit hash)
            numericUid = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000000;
        }
        // Token oluştur
        const token = agoraService_1.agoraService.generateToken(channelName, numericUid, expirationTimeInSeconds);
        const appId = agoraService_1.agoraService.getAppId();
        res.status(200).json({
            success: true,
            data: {
                token,
                appId,
                channelName,
                uid: numericUid,
                expirationTimeInSeconds: expirationTimeInSeconds || 86400,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Failed to generate token',
            });
        }
    }
});
exports.agoraRouter = router;
//# sourceMappingURL=agora.js.map