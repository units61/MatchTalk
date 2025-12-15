import {Router, Response} from 'express';
import {agoraService} from '../services/agoraService';
import {generateTokenSchema} from '../schemas/agora';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * POST /agora/token
 * Agora RTC token oluştur
 */
router.post('/token', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    // Request validation
    const validatedData = generateTokenSchema.parse(req.body);
    const {channelName, uid, expirationTimeInSeconds} = validatedData;

    // UID belirtilmemişse userId'yi kullan
    // userId string (UUID), Agora için number'a çevirmemiz gerekiyor
    // Basit bir hash fonksiyonu kullanabiliriz veya userId'nin son 8 karakterini number'a çevirebiliriz
    let numericUid: number;
    if (uid) {
      numericUid = typeof uid === 'number' ? uid : parseInt(uid.toString(), 10);
    } else {
      // userId'den numeric UID oluştur (basit hash)
      numericUid = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000000;
    }

    // Token oluştur
    const token = agoraService.generateToken(
      channelName,
      numericUid,
      expirationTimeInSeconds,
    );

    const appId = agoraService.getAppId();

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
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to generate token',
      });
    }
  }
});

export const agoraRouter = router;



