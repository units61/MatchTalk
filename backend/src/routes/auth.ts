import {Router, Request, Response} from 'express';
import {z} from 'zod';
import {authService} from '../services/authService';
import {registerSchema, loginSchema} from '../schemas/auth';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';
import {logger} from '../logger';

const router = Router();

/**
 * POST /auth/register
 * Kullanıcı kaydı
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    // Log request body for debugging
    logger.debug('Register request body:', {body: req.body});
    
    // Validation
    const validatedData = registerSchema.parse(req.body);

    // Register
    const result = await authService.register(validatedData);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Register error:', error);
    
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else if (error instanceof z.ZodError) {
      // Zod validation errors - better error handling
      const firstError = error.errors[0];
      const errorMessage = firstError 
        ? `${firstError.path.join('.')}: ${firstError.message}`
        : 'Geçersiz kayıt bilgileri';
      res.status(400).json({
        success: false,
        error: errorMessage,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message || 'Geçersiz kayıt bilgileri',
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
 * POST /auth/login
 * Kullanıcı girişi
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Log request body for debugging
    logger.debug('Login request body:', {body: req.body});
    
    // Validation
    const validatedData = loginSchema.parse(req.body);

    // Login
    const result = await authService.login(validatedData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Login error:', error);
    
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else if (error instanceof z.ZodError) {
      // Zod validation errors - better error handling
      const firstError = error.errors[0];
      const errorMessage = firstError 
        ? `${firstError.path.join('.')}: ${firstError.message}`
        : 'Geçersiz giriş bilgileri';
      res.status(400).json({
        success: false,
        error: errorMessage,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message || 'Geçersiz giriş bilgileri',
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
 * GET /auth/me
 * Mevcut kullanıcı bilgilerini getirme
 */
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const user = await authService.getUserById(userId);

    res.status(200).json({
      success: true,
      data: user,
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

export const authRouter = router;
