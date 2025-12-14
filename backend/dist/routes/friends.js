"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const express_1 = require("express");
const friendsService_1 = require("../services/friendsService");
const friends_1 = require("../schemas/friends");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * GET /friends
 * Arkadaş listesini getirme
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        const friends = await friendsService_1.friendsService.getFriends(userId);
        res.status(200).json({
            success: true,
            data: friends,
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
 * GET /friends/search?q=query
 * Kullanıcı arama
 */
router.get('/search', async (req, res) => {
    try {
        const userId = req.userId;
        const query = req.query.q;
        if (!query || query.trim().length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
            });
        }
        const users = await friendsService_1.friendsService.searchUsers(userId, query);
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
/**
 * POST /friends
 * Arkadaş ekleme
 */
router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const validatedData = friends_1.addFriendSchema.parse(req.body);
        const result = await friendsService_1.friendsService.addFriend(userId, validatedData);
        res.status(201).json({
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
/**
 * DELETE /friends/:id
 * Arkadaşlığı kaldırma
 */
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const result = await friendsService_1.friendsService.removeFriend(userId, id);
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
exports.friendsRouter = router;
//# sourceMappingURL=friends.js.map