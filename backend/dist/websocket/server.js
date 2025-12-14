"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToRoom = exports.emitToUser = exports.initializeWebSocket = void 0;
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const roomHandlers_1 = require("./handlers/roomHandlers");
const matchingHandlers_1 = require("./handlers/matchingHandlers");
const redis_1 = require("../lib/redis");
const logger_1 = require("../logger");
// Connection state tracking
const connectionStates = new Map();
const initializeWebSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: config_1.config.corsOrigins.length ? config_1.config.corsOrigins : true,
            credentials: true,
        },
        transports: ['websocket', 'polling'],
        pingTimeout: 60000, // 60 seconds
        pingInterval: 25000, // 25 seconds (heartbeat)
    });
    // Redis Adapter Entegrasyonu
    try {
        // @ts-ignore - adapter types might complain about mismatch but this is correct for io.adapter()
        io.adapter((0, redis_adapter_1.createAdapter)(redis_1.redisPub, redis_1.redisSub));
        logger_1.logger.info('Redis adapter initialized for WebSocket');
    }
    catch (error) {
        logger_1.logger.warn('Redis adapter initialization failed, using default adapter:', error);
    }
    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                logger_1.logger.warn('WebSocket connection attempt without token', {
                    socketId: socket.id,
                    ip: socket.handshake.address,
                });
                return next(new Error('Authentication token required'));
            }
            const decoded = (0, jsonwebtoken_1.verify)(token, config_1.config.jwtSecret);
            socket.userId = decoded.userId;
            next();
        }
        catch (error) {
            logger_1.logger.warn('WebSocket authentication failed', {
                socketId: socket.id,
                ip: socket.handshake.address,
                error: error instanceof Error ? error.message : String(error),
            });
            next(new Error('Invalid authentication token'));
        }
    });
    io.on('connection', async (socket) => {
        const userId = socket.userId;
        try {
            // Kullanıcı kendi ID'si ile bir odaya katılır (Private Messaging & Notifications için)
            await socket.join(userId);
            // Connection state tracking
            connectionStates.set(socket.id, {
                userId,
                connectedAt: new Date(),
                lastPing: new Date(),
                rooms: new Set([userId]),
            });
            logger_1.logger.info(`WebSocket user connected`, {
                userId,
                socketId: socket.id,
                ip: socket.handshake.address,
            });
            // Room handlers
            (0, roomHandlers_1.roomHandlers)(socket, io, userId);
            // Matching handlers
            (0, matchingHandlers_1.matchingHandlers)(socket, io, userId);
            // Heartbeat/ping handler
            socket.on('ping', () => {
                const state = connectionStates.get(socket.id);
                if (state) {
                    state.lastPing = new Date();
                }
                socket.emit('pong');
            });
            // Error handler
            socket.on('error', (error) => {
                logger_1.logger.error('WebSocket error', {
                    userId,
                    socketId: socket.id,
                    error: error instanceof Error ? error.message : String(error),
                });
            });
            // Disconnect handler
            socket.on('disconnect', (reason) => {
                const state = connectionStates.get(socket.id);
                logger_1.logger.info(`WebSocket user disconnected`, {
                    userId,
                    socketId: socket.id,
                    reason,
                    duration: state ? Date.now() - state.connectedAt.getTime() : 0,
                });
                connectionStates.delete(socket.id);
            });
        }
        catch (error) {
            logger_1.logger.error('Error handling WebSocket connection', {
                userId,
                socketId: socket.id,
                error: error instanceof Error ? error.message : String(error),
            });
            socket.disconnect();
        }
    });
    // Connection health check (every 30 seconds)
    setInterval(() => {
        const now = new Date();
        const timeout = 60000; // 60 seconds
        for (const [socketId, state] of connectionStates.entries()) {
            const timeSinceLastPing = now.getTime() - state.lastPing.getTime();
            if (timeSinceLastPing > timeout) {
                logger_1.logger.warn('WebSocket connection timeout, disconnecting', {
                    userId: state.userId,
                    socketId,
                    timeSinceLastPing,
                });
                const socket = io.sockets.sockets.get(socketId);
                if (socket) {
                    socket.disconnect(true);
                }
                connectionStates.delete(socketId);
            }
        }
    }, 30000);
    return io;
};
exports.initializeWebSocket = initializeWebSocket;
// Helper functions
// Artık Redis adapter olduğu için bellekten user socket aramıyoruz.
// Direkt userId'ye emit atıyoruz.
const emitToUser = (io, userId, event, data) => {
    io.to(userId).emit(event, data);
};
exports.emitToUser = emitToUser;
const emitToRoom = (io, roomId, event, data) => {
    io.to(`room:${roomId}`).emit(event, data);
};
exports.emitToRoom = emitToRoom;
//# sourceMappingURL=server.js.map