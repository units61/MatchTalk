"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchingRouter = void 0;
const express_1 = require("express");
const matchingService_1 = require("../services/matchingService");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * POST /matching/join
 * Eşleştirme kuyruğuna katılma
 */
router.post('/join', async (req, res) => {
    try {
        const userId = req.userId;
        const result = await matchingService_1.matchingService.joinQueue(userId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
/**
 * POST /matching/leave
 * Kuyruktan ayrılma
 */
router.post('/leave', async (req, res) => {
    try {
        const userId = req.userId;
        const result = await matchingService_1.matchingService.leaveQueue(userId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
/**
 * GET /matching/status
 * Kuyruk durumu
 */
router.get('/status', async (req, res) => {
    try {
        const userId = req.userId;
        const status = await matchingService_1.matchingService.getQueueStatus(userId);
        res.status(200).json({
            success: true,
            data: status,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
/**
 * GET /matching/users
 * Kuyruktaki kullanıcıları getir (matching progress için)
 */
router.get('/users', async (req, res) => {
    try {
        const users = await matchingService_1.matchingService.getQueueUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
exports.matchingRouter = router;
//# sourceMappingURL=matching.js.map