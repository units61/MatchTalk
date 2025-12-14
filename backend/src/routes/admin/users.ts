import {Router, Response} from 'express';
import {adminService} from '../../services/adminService';
import {updateUserRoleSchema, banUserSchema} from '../../schemas/admin';
import {HttpError} from '../../errors';
import {adminAuth, adminOnly, AuthRequest} from '../../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

/**
 * GET /admin/users
 * Get all users with filters and pagination
 */
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const role = req.query.role as string | undefined;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await adminService.getAllUsers({
      search,
      role,
      limit,
      offset,
    });

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

/**
 * GET /admin/users/:id
 * Get user by ID
 */
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const user = await adminService.getUserById(id);

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

/**
 * PUT /admin/users/:id/role
 * Update user role (admin only)
 */
router.put('/:id/role', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const validatedData = updateUserRoleSchema.parse(req.body);
    const user = await adminService.updateUserRole(id, validatedData.role);

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
 * POST /admin/users/:id/ban
 * Ban user
 */
router.post('/:id/ban', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const validatedData = banUserSchema.parse(req.body);
    const user = await adminService.banUser(id, validatedData.reason);

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
 * DELETE /admin/users/:id/ban
 * Unban user
 */
router.delete('/:id/ban', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const user = await adminService.unbanUser(id);

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

/**
 * DELETE /admin/users/:id
 * Delete user (admin only)
 */
router.delete('/:id', adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    await adminService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted',
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

export const adminUsersRouter = router;
