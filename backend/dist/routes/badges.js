"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgesRouter = void 0;
const express_1 = require("express");
const badgeService_1 = require("../services/badgeService");
const badges_1 = require("../schemas/badges");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * GET /badges
 * Tüm badge'leri getir
 */
router.get('/', async (_req, res) => {
    try {
        const badges = await badgeService_1.badgeService.getAllBadges();
        res.status(200).json({
            success: true,
            data: badges,
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
 * GET /badges/stats
 * Kullanıcının badge istatistiklerini getir
 */
router.get('/stats', async (req, res) => {
    try {
        const userId = req.userId;
        const stats = await badgeService_1.badgeService.getUserStats(userId);
        res.status(200).json({
            success: true,
            data: stats,
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
 * GET /badges/me
 * Kullanıcının badge'lerini getir
 */
router.get('/me', async (req, res) => {
    try {
        const userId = req.userId;
        const badges = await badgeService_1.badgeService.getUserBadges(userId);
        res.status(200).json({
            success: true,
            data: badges,
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
 * GET /badges/users/:id
 * Belirli bir kullanıcının badge'lerini getir
 */
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const badges = await badgeService_1.badgeService.getUserBadges(id);
        res.status(200).json({
            success: true,
            data: badges,
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
 * GET /badges/leaderboard
 * Leaderboard getir
 */
router.get('/leaderboard', async (req, res) => {
    try {
        const validatedData = badges_1.getLeaderboardSchema.parse(req.query);
        const leaderboard = await badgeService_1.badgeService.getLeaderboard(validatedData.limit);
        res.status(200).json({
            success: true,
            data: leaderboard,
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
                error: 'Bir hata oluştu',
            });
        }
    }
});
exports.badgesRouter = router;
//# sourceMappingURL=badges.js.map