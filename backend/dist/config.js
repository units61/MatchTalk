"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.validateEnvironment = validateEnvironment;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requireEnv = (key, fallback) => {
    const value = process.env[key] ?? fallback;
    if (!value) {
        throw new Error(`Missing env: ${key}`);
    }
    return value;
};
/**
 * Required environment variables list
 */
const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
];
/**
 * Optional but recommended environment variables
 */
const optionalEnvVars = [
    'AGORA_APP_ID',
    'AGORA_APP_CERTIFICATE',
    'STORAGE_TYPE',
    'S3_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'REDIS_URL',
    'CORS_ORIGINS',
];
/**
 * Validate environment variables on startup
 */
function validateEnvironment() {
    const missing = [];
    const warnings = [];
    // Check required variables
    for (const key of requiredEnvVars) {
        if (!process.env[key]) {
            missing.push(key);
        }
    }
    // Check optional but important variables (warnings only)
    if (process.env.NODE_ENV === 'production') {
        if (!process.env.AGORA_APP_ID || !process.env.AGORA_APP_CERTIFICATE) {
            warnings.push('AGORA_APP_ID and AGORA_APP_CERTIFICATE are recommended for production');
        }
        if (process.env.STORAGE_TYPE === 's3') {
            if (!process.env.S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
                warnings.push('S3 configuration is incomplete (S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)');
            }
        }
    }
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}\n` +
            'Please check your .env file and ensure all required variables are set.');
    }
    if (warnings.length > 0) {
        console.warn('⚠️  Environment variable warnings:');
        warnings.forEach(warning => console.warn(`   - ${warning}`));
    }
}
exports.config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT ?? 4000),
    jwtSecret: requireEnv('JWT_SECRET', 'change-me'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    databaseUrl: requireEnv('DATABASE_URL'),
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    corsOrigins: (process.env.CORS_ORIGINS || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    agora: {
        appId: process.env.AGORA_APP_ID || '',
        appCertificate: process.env.AGORA_APP_CERTIFICATE || '',
    },
    storage: {
        type: process.env.STORAGE_TYPE || 'local',
        uploadDir: process.env.UPLOAD_DIR || 'uploads/avatars',
        s3: {
            bucket: process.env.S3_BUCKET || '',
            region: process.env.S3_REGION || 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
    },
};
// Validate environment on module load
if (process.env.NODE_ENV !== 'test') {
    try {
        validateEnvironment();
    }
    catch (error) {
        console.error('❌ Environment validation failed:');
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
if (exports.config.nodeEnv === 'production' && exports.config.jwtSecret === 'change-me') {
    throw new Error('JWT_SECRET must be set in production environment');
}
//# sourceMappingURL=config.js.map