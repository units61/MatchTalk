"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRouter = void 0;
const express_1 = require("express");
const statsService_1 = require("../services/statsService");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * GET /stats
 * Kullanıcı istatistiklerini getir
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        const stats = await statsService_1.statsService.getUserStats(userId);
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
exports.statsRouter = router;
//# sourceMappingURL=stats.js.map