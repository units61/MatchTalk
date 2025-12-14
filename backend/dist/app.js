"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./routes/auth");
const health_1 = require("./routes/health");
const error_1 = require("./middleware/error");
const rateLimit_1 = require("./middleware/rateLimit");
const config_1 = require("./config");
const rooms_1 = require("./routes/rooms");
const friends_1 = require("./routes/friends");
const matching_1 = require("./routes/matching");
const invites_1 = require("./routes/invites");
const stats_1 = require("./routes/stats");
const agora_1 = require("./routes/agora");
const users_1 = require("./routes/users");
const badges_1 = require("./routes/badges");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: [
                    "'self'",
                    'http://localhost:*',
                    'ws://localhost:*',
                    'chrome-extension://*',
                ],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    // Chrome DevTools endpoint için özel route
    app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((0, cors_1.default)({
        origin: config_1.config.corsOrigins.length ? config_1.config.corsOrigins : true,
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('dev'));
    // Static file serving for uploads (local storage)
    if (config_1.config.storage.type === 'local') {
        const uploadDir = path_1.default.join(process.cwd(), config_1.config.storage.uploadDir);
        app.use('/uploads', express_1.default.static(uploadDir));
    }
    app.use('/health', health_1.healthRouter);
    app.use('/auth', rateLimit_1.authLimiter, auth_1.authRouter);
    app.use('/rooms', rooms_1.roomsRouter);
    app.use('/friends', friends_1.friendsRouter);
    app.use('/matching', matching_1.matchingRouter);
    app.use('/invites', invites_1.invitesRouter);
    app.use('/stats', stats_1.statsRouter);
    app.use('/agora', agora_1.agoraRouter);
    app.use('/users', users_1.usersRouter);
    app.use('/badges', badges_1.badgesRouter);
    app.use(error_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map