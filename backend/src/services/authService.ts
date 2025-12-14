import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { HttpError } from '../errors';
import { config } from '../config';
import { RegisterInput, LoginInput } from '../schemas/auth';
import { logger } from '../logger';

export class AuthService {
  /**
   * Kullanıcı kaydı
   */
  async register(input: RegisterInput) {
    try {
      logger.info(`[AuthService] Register attempt for email: ${input.email}`);

      // Email kontrolü
      logger.info('[AuthService] Checking if user exists...');
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        logger.warn(`[AuthService] User already exists: ${input.email}`);
        throw new HttpError(409, 'Bu e-posta adresi zaten kullanılıyor');
      }

      logger.info('[AuthService] User does not exist, proceeding with registration');

      // Şifre hashleme
      logger.info('[AuthService] Hashing password...');
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Kullanıcı oluşturma
      logger.info('[AuthService] Creating user in database...');
      const user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          gender: input.gender,
          hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
          gender: true,
          createdAt: true,
        },
      });

      logger.info(`[AuthService] User created successfully: ${user.id}`);

      // JWT token oluşturma
      logger.info('[AuthService] Generating JWT token...');
      const token = this.generateToken(user.id);

      logger.info(`[AuthService] Registration successful for user: ${user.id}`);
      return {
        user,
        token,
      };
    } catch (error) {
      // HttpError'ları olduğu gibi fırlat
      if (error instanceof HttpError) {
        logger.error(`[AuthService] HttpError during registration: ${error.status} - ${error.message}`);
        throw error;
      }
      // Prisma bağlantı hatalarını yakala
      if (this.isPrismaConnectionError(error)) {
        logger.error('[AuthService] Database connection error during registration:', error);
        logger.error('[AuthService] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw new HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
      }
      // Diğer Prisma hataları
      if (error instanceof PrismaClientKnownRequestError) {
        logger.error('[AuthService] Prisma error during registration:', error);
        logger.error(`[AuthService] Prisma error code: ${error.code}`);
        logger.error(`[AuthService] Prisma error message: ${error.message}`);
        throw new HttpError(500, 'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
      // Beklenmeyen hatalar
      logger.error('[AuthService] Unexpected error during registration:', error);
      logger.error('[AuthService] Error type:', error?.constructor?.name);
      logger.error('[AuthService] Error message:', error instanceof Error ? error.message : String(error));
      logger.error('[AuthService] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw new HttpError(500, 'Kayıt işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  /**
   * Kullanıcı girişi
   */
  async login(input: LoginInput) {
    try {
      logger.info(`[AuthService] Login attempt for email: ${input.email}`);

      // Kullanıcı bulma
      logger.info('[AuthService] Querying database for user...');
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        logger.warn(`[AuthService] User not found for email: ${input.email}`);
        throw new HttpError(401, 'E-posta veya şifre hatalı');
      }

      logger.info(`[AuthService] User found: ${user.id}`);

      // Şifre kontrolü
      logger.info('[AuthService] Verifying password...');
      const isPasswordValid = await bcrypt.compare(input.password, user.hashedPassword);

      if (!isPasswordValid) {
        logger.warn(`[AuthService] Invalid password for user: ${user.id}`);
        throw new HttpError(401, 'E-posta veya şifre hatalı');
      }

      logger.info('[AuthService] Password verified successfully');

      // JWT token oluşturma
      logger.info('[AuthService] Generating JWT token...');
      const token = this.generateToken(user.id);

      logger.info(`[AuthService] Login successful for user: ${user.id}`);
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          gender: user.gender,
          createdAt: user.createdAt,
        },
        token,
      };
    } catch (error) {
      // HttpError'ları olduğu gibi fırlat
      if (error instanceof HttpError) {
        logger.error(`[AuthService] HttpError during login: ${error.status} - ${error.message}`);
        throw error;
      }
      // Prisma bağlantı hatalarını yakala
      if (this.isPrismaConnectionError(error)) {
        logger.error('[AuthService] Database connection error during login:', error);
        logger.error('[AuthService] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw new HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
      }
      // Diğer Prisma hataları
      if (error instanceof PrismaClientKnownRequestError) {
        logger.error('[AuthService] Prisma error during login:', error);
        logger.error(`[AuthService] Prisma error code: ${error.code}`);
        logger.error(`[AuthService] Prisma error message: ${error.message}`);
        throw new HttpError(500, 'Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
      // Beklenmeyen hatalar
      logger.error('[AuthService] Unexpected error during login:', error);
      logger.error('[AuthService] Error type:', error?.constructor?.name);
      logger.error('[AuthService] Error message:', error instanceof Error ? error.message : String(error));
      logger.error('[AuthService] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw new HttpError(500, 'Giriş işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  /**
   * JWT token oluşturma
   */
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Kullanıcı bilgilerini getirme
   */
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          gender: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new HttpError(404, 'Kullanıcı bulunamadı');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      // Prisma bağlantı hatalarını yakala
      if (this.isPrismaConnectionError(error)) {
        logger.error('Database connection error during getUserById:', error);
        throw new HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
      }
      // Beklenmeyen hatalar
      logger.error('Unexpected error during getUserById:', error);
      throw new HttpError(500, 'Kullanıcı bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
    }
  }

  /**
   * Prisma bağlantı hatası kontrolü
   */
  private isPrismaConnectionError(error: unknown): boolean {
    if (error instanceof PrismaClientUnknownRequestError) {
      return true;
    }
    if (error instanceof PrismaClientKnownRequestError) {
      // P1001: Can't reach database server
      // P1002: The database server was reached but timed out
      // P1003: Database does not exist
      // P1008: Operations timed out
      // P1017: Server has closed the connection
      return ['P1001', 'P1002', 'P1003', 'P1008', 'P1017'].includes(error.code);
    }
    // Genel bağlantı hataları için kontrol
    if (error && typeof error === 'object') {
      const errorMessage = String(error).toLowerCase();
      return (
        errorMessage.includes('connect') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('network') ||
        errorMessage.includes('econnrefused') ||
        errorMessage.includes('enotfound')
      );
    }
    return false;
  }
}

export const authService = new AuthService();

