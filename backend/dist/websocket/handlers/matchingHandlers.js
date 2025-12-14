"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchingHandlers = void 0;
const matchingService_1 = require("../../services/matchingService");
const server_1 = require("../server");
const logger_1 = require("../../logger");
const matchingHandlers = (socket, io, userId) => {
    /**
     * Eşleştirme kuyruğuna katılma
     */
    socket.on('matching-join', async () => {
        try {
            logger_1.logger.info('WebSocket matching-join', { userId, socketId: socket.id });
            const result = await matchingService_1.matchingService.joinQueue(userId);
            // Kullanıcıya bildir
            socket.emit('matching-joined', {
                queueId: result.id,
                status: result.status,
            });
            // Kuyruktaki tüm kullanıcılara progress güncellemesi gönder
            const queueUsers = await matchingService_1.matchingService.getQueueUsers();
            // Tüm bekleyen kullanıcılara progress gönder
            const waitingUsers = await matchingService_1.matchingService.getQueueStatus(userId);
            if (waitingUsers.inQueue) {
                (0, server_1.emitToUser)(io, userId, 'matching-progress', {
                    totalWaiting: waitingUsers.totalWaiting,
                    position: waitingUsers.position,
                    users: queueUsers,
                });
            }
        }
        catch (error) {
            logger_1.logger.error('WebSocket matching-join error', {
                userId,
                socketId: socket.id,
                error: error instanceof Error ? error.message : String(error),
            });
            socket.emit('matching-error', {
                error: error instanceof Error ? error.message : 'Kuyruğa katılamadı',
            });
        }
    });
    /**
     * Eşleştirme kuyruğundan ayrılma
     */
    socket.on('matching-leave', async () => {
        try {
            await matchingService_1.matchingService.leaveQueue(userId);
            socket.emit('matching-left', { success: true });
        }
        catch (error) {
            socket.emit('matching-error', {
                error: error instanceof Error ? error.message : 'Kuyruktan ayrılamadı',
            });
        }
    });
    /**
     * Eşleştirme durumu sorgulama
     */
    socket.on('matching-status', async () => {
        try {
            const status = await matchingService_1.matchingService.getQueueStatus(userId);
            const queueUsers = await matchingService_1.matchingService.getQueueUsers();
            socket.emit('matching-status', {
                ...status,
                users: queueUsers,
            });
        }
        catch (error) {
            socket.emit('matching-error', {
                error: error instanceof Error ? error.message : 'Durum alınamadı',
            });
        }
    });
};
exports.matchingHandlers = matchingHandlers;
//# sourceMappingURL=matchingHandlers.js.map