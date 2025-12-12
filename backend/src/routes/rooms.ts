import {Router, Response} from 'express';
import {roomsService} from '../services/roomsService';
import {createRoomSchema, joinRoomSchema} from '../schemas/rooms';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * GET /rooms
 * Aktif odaları listeleme
 */
router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const rooms = await roomsService.getActiveRooms();

    res.status(200).json({
      success: true,
      data: rooms,
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
 * GET /rooms/:id
 * Oda detaylarını getirme
 */
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const room = await roomsService.getRoomById(id);

    res.status(200).json({
      success: true,
      data: room,
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
 * POST /rooms
 * Oda oluşturma
 */
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const validatedData = createRoomSchema.parse(req.body);
    const room = await roomsService.createRoom(userId, validatedData);

    res.status(201).json({
      success: true,
      data: room,
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
 * POST /rooms/:id/join
 * Odaya katılma
 */
router.post('/:id/join', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {id} = req.params;
    const validatedData = joinRoomSchema.parse({roomId: id});
    const room = await roomsService.joinRoom(userId, validatedData);

    res.status(200).json({
      success: true,
      data: room,
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
 * POST /rooms/:id/leave
 * Odadan ayrılma
 */
router.post('/:id/leave', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {id} = req.params;
    const result = await roomsService.leaveRoom(userId, id);

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

export const roomsRouter = router;
