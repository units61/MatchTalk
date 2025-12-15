import {Router, Response} from 'express';
import {userService} from '../services/userService';
import {updateProfileSchema, changePasswordSchema, changeEmailSchema} from '../schemas/users';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';
import {uploadSingle, handleUploadError} from '../middleware/upload';
import {fileService} from '../services/fileService';
import {prisma} from '../lib/prisma';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * POST /users/avatar
 * Avatar yükle
 */
router.post('/avatar', uploadSingle, handleUploadError, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Dosya yüklenmedi',
      });
    }

    // Eski avatar'ı sil (varsa)
    const user = await prisma.user.findUnique({
      where: {id: userId},
      select: {avatar: true},
    });

    if (user?.avatar) {
      await fileService.deleteAvatar(user.avatar);
    }

    // Yeni avatar'ı kaydet
    const avatarPath = await fileService.saveAvatar(req.file, userId);

    // Kullanıcıyı güncelle
    const updatedUser = await userService.updateProfile(userId, {avatar: avatarPath});

    res.status(200).json({
      success: true,
      data: {
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Avatar yüklenirken bir hata oluştu',
      });
    }
  }
});

/**
 * DELETE /users/avatar
 * Avatar sil
 */
router.delete('/avatar', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    // Kullanıcının mevcut avatar'ını getir
    const user = await prisma.user.findUnique({
      where: {id: userId},
      select: {avatar: true},
    });

    if (user?.avatar) {
      // Dosyayı sil
      await fileService.deleteAvatar(user.avatar);

      // Kullanıcıyı güncelle (avatar'ı null yap)
      await userService.updateProfile(userId, {avatar: null});
    }

    res.status(200).json({
      success: true,
      message: 'Avatar silindi',
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Avatar silinirken bir hata oluştu',
      });
    }
  }
});

/**
 * GET /users/me
 * Mevcut kullanıcının profil bilgilerini getir
 */
router.get('/me', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const profile = await userService.getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * GET /users/:id
 * Public kullanıcı profil bilgilerini getir
 */
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const profile = await userService.getPublicProfile(id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * PUT /users/profile
 * Kullanıcı profilini güncelle
 */
router.put('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = updateProfileSchema.parse(req.body);
    const profile = await userService.updateProfile(userId, validatedData);

    res.status(200).json({
      success: true,
      data: profile,
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
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * PUT /users/password
 * Şifre değiştir
 */
router.put('/password', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = changePasswordSchema.parse(req.body);
    const result = await userService.changePassword(
      userId,
      validatedData.oldPassword,
      validatedData.newPassword,
    );

    res.status(200).json({
      success: true,
      data: result,
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
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * PUT /users/email
 * Email değiştir
 */
router.put('/email', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = changeEmailSchema.parse(req.body);
    const result = await userService.changeEmail(
      userId,
      validatedData.newEmail,
      validatedData.password,
    );

    res.status(200).json({
      success: true,
      data: result,
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
        error: 'Bir hata oluştu',
      });
    }
  }
});

export const usersRouter = router;


