import dotenv from 'dotenv';

dotenv.config();

const requireEnv = (key: string, fallback?: string) => {
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
 * (Used for documentation purposes in validateEnvironment)
 */
const _optionalEnvVars = [
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
export function validateEnvironment() {
  const missing: string[] = [];
  const warnings: string[] = [];

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
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.',
    );
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment variable warnings:');
    warnings.forEach(warning => console.warn(`   - ${warning}`));
  }
}

export const config = {
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
  email: {
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
    from: {
      email: process.env.FROM_EMAIL || process.env.SMTP_USER || '',
      name: process.env.FROM_NAME || 'MatchTalk',
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};

// Validate environment on module load
if (process.env.NODE_ENV !== 'test') {
  try {
    validateEnvironment();
  } catch (error) {
    console.error('❌ Environment validation failed:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

if (config.nodeEnv === 'production' && config.jwtSecret === 'change-me') {
  throw new Error('JWT_SECRET must be set in production environment');
}

