"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandlers = void 0;
const roomsService_1 = require("../../services/roomsService");
const voteService_1 = require("../../services/voteService");
const server_1 = require("../server");
const logger_1 = require("../../logger");
const zod_1 = require("zod");
// Validation schemas
const joinRoomSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid('Geçerli bir oda ID giriniz'),
});
const leaveRoomSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid('Geçerli bir oda ID giriniz'),
});
const voteExtensionSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid('Geçerli bir oda ID giriniz'),
    vote: zod_1.z.enum(['yes', 'no']),
});
const roomHandlers = (socket, io, userId) => {
    /**
     * Odaya katılma
     */
    socket.on('join-room', async (data) => {
        try {
            // Validate input
            const validated = joinRoomSchema.parse(data);
            const { roomId } = validated;
            logger_1.logger.info('WebSocket join-room', { userId, roomId, socketId: socket.id });
            // Socket'i oda room'una ekle
            await socket.join(`room:${roomId}`);
            // Odaya katıl
            const room = await roomsService_1.roomsService.joinRoom(userId, { roomId });
            // Oda güncellemesini tüm katılımcılara gönder
            (0, server_1.emitToRoom)(io, roomId, 'room-update', {
                room,
                joinedUser: {
                    id: userId,
                },
            });
            socket.emit('room-joined', { room });
        }
        catch (error) {
            logger_1.logger.error('WebSocket join-room error', {
                userId,
                socketId: socket.id,
                error: error instanceof Error ? error.message : String(error),
            });
            socket.emit('room-error', {
                error: error instanceof Error ? error.message : 'Odaya katılamadı',
            });
        }
    });
    /**
     * Odadan ayrılma
     */
    socket.on('leave-room', async (data) => {
        try {
            // Validate input
            const validated = leaveRoomSchema.parse(data);
            const { roomId } = validated;
            logger_1.logger.info('WebSocket leave-room', { userId, roomId, socketId: socket.id });
            // Odadan ayrıl
            await roomsService_1.roomsService.leaveRoom(userId, roomId);
            // Socket'i oda room'undan çıkar
            await socket.leave(`room:${roomId}`);
            // Oda güncellemesini tüm katılımcılara gönder
            (0, server_1.emitToRoom)(io, roomId, 'room-update', {
                leftUser: {
                    id: userId,
                },
            });
            socket.emit('room-left', { roomId });
        }
        catch (error) {
            logger_1.logger.error('WebSocket leave-room error', {
                userId,
                socketId: socket.id,
                error: error instanceof Error ? error.message : String(error),
            });
            socket.emit('room-error', {
                error: error instanceof Error ? error.message : 'Odadan ayrılamadı',
            });
        }
    });
    /**
     * Timer güncellemesi (server-side timer için)
     */
    socket.on('timer-update', async (data) => {
        // Timer güncellemesini oda katılımcılarına gönder
        (0, server_1.emitToRoom)(io, data.roomId, 'timer-update', {
            roomId: data.roomId,
            timeLeft: data.timeLeft,
        });
    });
    /**
     * Extension vote
     */
    socket.on('vote-extension', async (data) => {
        try {
            // Validate input
            const validated = voteExtensionSchema.parse(data);
            const { roomId, vote } = validated;
            logger_1.logger.info('WebSocket vote-extension', { userId, roomId, vote, socketId: socket.id });
            const result = await voteService_1.voteService.voteExtension(userId, roomId, vote);
            socket.emit('vote-recorded', {
                roomId,
                vote,
                extensionYes: result.extensionYes,
                extensionNo: result.extensionNo,
                totalVotes: result.totalVotes,
            });
        }
        catch (error) {
            logger_1.logger.error('WebSocket vote-extension error', {
                userId,
                socketId: socket.id,
                error: error instanceof Error ? error.message : String(error),
            });
            socket.emit('room-error', {
                error: error instanceof Error ? error.message : 'Oylama kaydedilemedi',
            });
        }
    });
};
exports.roomHandlers = roomHandlers;
//# sourceMappingURL=roomHandlers.js.map