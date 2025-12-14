"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawLogger = exports.logger = exports.loggerWithContext = void 0;
exports.generateRequestId = generateRequestId;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const fs_1 = require("fs");
const { combine, timestamp, printf, colorize, json, errors } = winston_1.default.format;
// Log formatı (Development için okunaklı)
const logFormat = printf(({ level, message, timestamp, requestId, ...metadata }) => {
    let msg = `${timestamp} [${level}]`;
    if (requestId) {
        msg += ` [${requestId}]`;
    }
    msg += `: ${message}`;
    // Args array'i varsa (legacy wrapper'dan gelen) onu düzgün göster
    if (metadata.args && Array.isArray(metadata.args) && metadata.args.length > 0) {
        msg += ` ${metadata.args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`;
    }
    else if (Object.keys(metadata).length > 0) {
        // requestId'yi metadata'dan çıkar (zaten gösterdik)
        const { requestId: _, ...rest } = metadata;
        if (Object.keys(rest).length > 0) {
            msg += ` ${JSON.stringify(rest)}`;
        }
    }
    return msg;
});
const isProduction = config_1.config.nodeEnv === 'production';
// Winston instance
const winstonInstance = winston_1.default.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), isProduction ? json() : colorize()),
    defaultMeta: { service: 'matchtalk-backend' },
    transports: [
        new winston_1.default.transports.Console({
            format: isProduction
                ? combine(timestamp(), json())
                : combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),
        }),
    ],
});
// File transports (production only)
if (isProduction) {
    const logsDir = path_1.default.join(process.cwd(), 'logs');
    // Ensure logs directory exists
    fs_1.promises.mkdir(logsDir, { recursive: true }).catch(() => {
        // Ignore errors, will try again on first write
    });
    // Error log file
    winstonInstance.add(new winston_1.default.transports.File({
        filename: path_1.default.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: combine(timestamp(), json()),
    }));
    // Combined log file
    winstonInstance.add(new winston_1.default.transports.File({
        filename: path_1.default.join(logsDir, 'combined.log'),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: combine(timestamp(), json()),
    }));
}
// Request ID tracking helper
let requestIdCounter = 0;
function generateRequestId() {
    return `req-${Date.now()}-${++requestIdCounter}`;
}
// Enhanced logger with request context
const loggerWithContext = (requestId) => {
    const context = requestId ? { requestId } : {};
    return {
        info: (message, meta) => {
            winstonInstance.info(message, { ...context, ...meta });
        },
        warn: (message, meta) => {
            winstonInstance.warn(message, { ...context, ...meta });
        },
        error: (message, meta) => {
            winstonInstance.error(message, { ...context, ...meta });
        },
        debug: (message, meta) => {
            winstonInstance.debug(message, { ...context, ...meta });
        },
    };
};
exports.loggerWithContext = loggerWithContext;
// Geriye dönük uyumluluk için logger wrapper
// Eski kod: logger.info('mesaj', arg1, arg2) şeklinde çağırıyordu.
exports.logger = {
    info: (message, ...args) => winstonInstance.info(message, { args }),
    warn: (message, ...args) => winstonInstance.warn(message, { args }),
    error: (message, ...args) => winstonInstance.error(message, { args }),
    debug: (message, ...args) => winstonInstance.debug(message, { args }),
};
// Direkt winston instancelarına erişim gerekirse
exports.rawLogger = winstonInstance;
//# sourceMappingURL=logger.js.map