import {Router, Response} from 'express';
import {friendsService} from '../services/friendsService';
import {addFriendSchema} from '../schemas/friends';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * GET /friends
 * Arkadaş listesini getirme
 */
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const friends = await friendsService.getFriends(userId);

    res.status(200).json({
      success: true,
      data: friends,
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
 * GET /friends/search?q=query
 * Kullanıcı arama
 */
router.get('/search', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const users = await friendsService.searchUsers(userId, query);

    res.status(200).json({
      success: true,
      data: users,
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
 * POST /friends
 * Arkadaş ekleme
 */
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = addFriendSchema.parse(req.body);
    const result = await friendsService.addFriend(userId, validatedData);

    res.status(201).json({
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
 * DELETE /friends/:id
 * Arkadaşlığı kaldırma
 */
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {id} = req.params;
    const result = await friendsService.removeFriend(userId, id);

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
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

export const friendsRouter = router;
