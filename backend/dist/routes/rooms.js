"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsRouter = void 0;
const express_1 = require("express");
const roomsService_1 = require("../services/roomsService");
const rooms_1 = require("../schemas/rooms");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * GET /rooms
 * Aktif odaları listeleme
 */
router.get('/', async (_req, res) => {
    try {
        const rooms = await roomsService_1.roomsService.getActiveRooms();
        res.status(200).json({
            success: true,
            data: rooms,
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
 * GET /rooms/:id
 * Oda detaylarını getirme
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const room = await roomsService_1.roomsService.getRoomById(id);
        res.status(200).json({
            success: true,
            data: room,
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
 * POST /rooms
 * Oda oluşturma
 */
router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const validatedData = rooms_1.createRoomSchema.parse(req.body);
        const room = await roomsService_1.roomsService.createRoom(userId, validatedData);
        res.status(201).json({
            success: true,
            data: room,
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
 * POST /rooms/:id/join
 * Odaya katılma
 */
router.post('/:id/join', async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const validatedData = rooms_1.joinRoomSchema.parse({ roomId: id });
        const room = await roomsService_1.roomsService.joinRoom(userId, validatedData);
        res.status(200).json({
            success: true,
            data: room,
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
 * POST /rooms/:id/leave
 * Odadan ayrılma
 */
router.post('/:id/leave', async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const result = await roomsService_1.roomsService.leaveRoom(userId, id);
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
exports.roomsRouter = router;
//# sourceMappingURL=rooms.js.map