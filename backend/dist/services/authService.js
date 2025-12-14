"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const library_1 = require("@prisma/client/runtime/library");
const prisma_1 = require("../lib/prisma");
const errors_1 = require("../errors");
const config_1 = require("../config");
const logger_1 = require("../logger");
class AuthService {
    /**
     * Kullanıcı kaydı
     */
    async register(input) {
        try {
            logger_1.logger.info(`[AuthService] Register attempt for email: ${input.email}`);
            // Email kontrolü
            logger_1.logger.info('[AuthService] Checking if user exists...');
            const existingUser = await prisma_1.prisma.user.findUnique({
                where: { email: input.email },
            });
            if (existingUser) {
                logger_1.logger.warn(`[AuthService] User already exists: ${input.email}`);
                throw new errors_1.HttpError(409, 'Bu e-posta adresi zaten kullanılıyor');
            }
            logger_1.logger.info('[AuthService] User does not exist, proceeding with registration');
            // Şifre hashleme
            logger_1.logger.info('[AuthService] Hashing password...');
            const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
            // Kullanıcı oluşturma
            logger_1.logger.info('[AuthService] Creating user in database...');
            const user = await prisma_1.prisma.user.create({
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
            logger_1.logger.info(`[AuthService] User created successfully: ${user.id}`);
            // JWT token oluşturma
            logger_1.logger.info('[AuthService] Generating JWT token...');
            const token = this.generateToken(user.id);
            logger_1.logger.info(`[AuthService] Registration successful for user: ${user.id}`);
            return {
                user,
                token,
            };
        }
        catch (error) {
            // HttpError'ları olduğu gibi fırlat
            if (error instanceof errors_1.HttpError) {
                logger_1.logger.error(`[AuthService] HttpError during registration: ${error.status} - ${error.message}`);
                throw error;
            }
            // Prisma bağlantı hatalarını yakala
            if (this.isPrismaConnectionError(error)) {
                logger_1.logger.error('[AuthService] Database connection error during registration:', error);
                logger_1.logger.error('[AuthService] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                throw new errors_1.HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
            }
            // Diğer Prisma hataları
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                logger_1.logger.error('[AuthService] Prisma error during registration:', error);
                logger_1.logger.error(`[AuthService] Prisma error code: ${error.code}`);
                logger_1.logger.error(`[AuthService] Prisma error message: ${error.message}`);
                throw new errors_1.HttpError(500, 'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
            // Beklenmeyen hatalar
            logger_1.logger.error('[AuthService] Unexpected error during registration:', error);
            logger_1.logger.error('[AuthService] Error type:', error?.constructor?.name);
            logger_1.logger.error('[AuthService] Error message:', error instanceof Error ? error.message : String(error));
            logger_1.logger.error('[AuthService] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            throw new errors_1.HttpError(500, 'Kayıt işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.');
        }
    }
    /**
     * Kullanıcı girişi
     */
    async login(input) {
        try {
            logger_1.logger.info(`[AuthService] Login attempt for email: ${input.email}`);
            // Kullanıcı bulma
            logger_1.logger.info('[AuthService] Querying database for user...');
            const user = await prisma_1.prisma.user.findUnique({
                where: { email: input.email },
            });
            if (!user) {
                logger_1.logger.warn(`[AuthService] User not found for email: ${input.email}`);
                throw new errors_1.HttpError(401, 'E-posta veya şifre hatalı');
            }
            logger_1.logger.info(`[AuthService] User found: ${user.id}`);
            // Şifre kontrolü
            logger_1.logger.info('[AuthService] Verifying password...');
            const isPasswordValid = await bcryptjs_1.default.compare(input.password, user.hashedPassword);
            if (!isPasswordValid) {
                logger_1.logger.warn(`[AuthService] Invalid password for user: ${user.id}`);
                throw new errors_1.HttpError(401, 'E-posta veya şifre hatalı');
            }
            logger_1.logger.info('[AuthService] Password verified successfully');
            // JWT token oluşturma
            logger_1.logger.info('[AuthService] Generating JWT token...');
            const token = this.generateToken(user.id);
            logger_1.logger.info(`[AuthService] Login successful for user: ${user.id}`);
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
        }
        catch (error) {
            // HttpError'ları olduğu gibi fırlat
            if (error instanceof errors_1.HttpError) {
                logger_1.logger.error(`[AuthService] HttpError during login: ${error.status} - ${error.message}`);
                throw error;
            }
            // Prisma bağlantı hatalarını yakala
            if (this.isPrismaConnectionError(error)) {
                logger_1.logger.error('[AuthService] Database connection error during login:', error);
                logger_1.logger.error('[AuthService] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
                throw new errors_1.HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
            }
            // Diğer Prisma hataları
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                logger_1.logger.error('[AuthService] Prisma error during login:', error);
                logger_1.logger.error(`[AuthService] Prisma error code: ${error.code}`);
                logger_1.logger.error(`[AuthService] Prisma error message: ${error.message}`);
                throw new errors_1.HttpError(500, 'Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
            // Beklenmeyen hatalar
            logger_1.logger.error('[AuthService] Unexpected error during login:', error);
            logger_1.logger.error('[AuthService] Error type:', error?.constructor?.name);
            logger_1.logger.error('[AuthService] Error message:', error instanceof Error ? error.message : String(error));
            logger_1.logger.error('[AuthService] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            throw new errors_1.HttpError(500, 'Giriş işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.');
        }
    }
    /**
     * JWT token oluşturma
     */
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, config_1.config.jwtSecret, {
            expiresIn: config_1.config.jwtExpiresIn,
        });
    }
    /**
     * Kullanıcı bilgilerini getirme
     */
    async getUserById(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
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
                throw new errors_1.HttpError(404, 'Kullanıcı bulunamadı');
            }
            return user;
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                throw error;
            }
            // Prisma bağlantı hatalarını yakala
            if (this.isPrismaConnectionError(error)) {
                logger_1.logger.error('Database connection error during getUserById:', error);
                throw new errors_1.HttpError(500, 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
            }
            // Beklenmeyen hatalar
            logger_1.logger.error('Unexpected error during getUserById:', error);
            throw new errors_1.HttpError(500, 'Kullanıcı bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
        }
    }
    /**
     * Prisma bağlantı hatası kontrolü
     */
    isPrismaConnectionError(error) {
        if (error instanceof library_1.PrismaClientUnknownRequestError) {
            return true;
        }
        if (error instanceof library_1.PrismaClientKnownRequestError) {
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
            return (errorMessage.includes('connect') ||
                errorMessage.includes('connection') ||
                errorMessage.includes('timeout') ||
                errorMessage.includes('network') ||
                errorMessage.includes('econnrefused') ||
                errorMessage.includes('enotfound'));
        }
        return false;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map