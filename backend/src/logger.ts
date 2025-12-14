import winston from 'winston';
import path from 'path';
import {config} from './config';
import {promises as fs} from 'fs';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Log formatı (Development için okunaklı)
const logFormat = printf(({ level, message, timestamp, requestId, ...metadata }) => {
  let msg = `${timestamp} [${level}]`;
  if (requestId) {
    msg += ` [${requestId}]`;
  }
  msg += `: ${message}`;
  
  // Args array'i varsa (legacy wrapper'dan gelen) onu düzgün göster
  if (metadata.args && Array.isArray(metadata.args) && metadata.args.length > 0) {
    msg += ` ${metadata.args.map(a =>
      typeof a === 'object' ? JSON.stringify(a) : a
    ).join(' ')}`;
  } else if (Object.keys(metadata).length > 0) {
    // requestId'yi metadata'dan çıkar (zaten gösterdik)
    const {requestId: _, ...rest} = metadata;
    if (Object.keys(rest).length > 0) {
      msg += ` ${JSON.stringify(rest)}`;
    }
  }
  return msg;
});

const isProduction = config.nodeEnv === 'production';

// Winston instance
const winstonInstance = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    errors({stack: true}),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    isProduction ? json() : colorize(),
  ),
  defaultMeta: {service: 'matchtalk-backend'},
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? combine(timestamp(), json())
        : combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),
    }),
  ],
});

// File transports (production only)
if (isProduction) {
  const logsDir = path.join(process.cwd(), 'logs');
  
  // Ensure logs directory exists
  fs.mkdir(logsDir, {recursive: true}).catch(() => {
    // Ignore errors, will try again on first write
  });

  // Error log file
  winstonInstance.add(
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: combine(timestamp(), json()),
    }),
  );

  // Combined log file
  winstonInstance.add(
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: combine(timestamp(), json()),
    }),
  );
}

// Request ID tracking helper
let requestIdCounter = 0;
export function generateRequestId(): string {
  return `req-${Date.now()}-${++requestIdCounter}`;
}

// Enhanced logger with request context
export const loggerWithContext = (requestId?: string) => {
  const context = requestId ? {requestId} : {};
  return {
    info: (message: string, meta?: any) => {
      winstonInstance.info(message, {...context, ...meta});
    },
    warn: (message: string, meta?: any) => {
      winstonInstance.warn(message, {...context, ...meta});
    },
    error: (message: string, meta?: any) => {
      winstonInstance.error(message, {...context, ...meta});
    },
    debug: (message: string, meta?: any) => {
      winstonInstance.debug(message, {...context, ...meta});
    },
  };
};

// Geriye dönük uyumluluk için logger wrapper
// Eski kod: logger.info('mesaj', arg1, arg2) şeklinde çağırıyordu.
export const logger = {
  info: (message: string, ...args: any[]) => winstonInstance.info(message, { args }),
  warn: (message: string, ...args: any[]) => winstonInstance.warn(message, { args }),
  error: (message: string, ...args: any[]) => winstonInstance.error(message, { args }),
  debug: (message: string, ...args: any[]) => winstonInstance.debug(message, { args }),
};

// Direkt winston instancelarına erişim gerekirse
export const rawLogger = winstonInstance;
