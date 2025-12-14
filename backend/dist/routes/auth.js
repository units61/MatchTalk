"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const authService_1 = require("../services/authService");
const auth_1 = require("../schemas/auth");
const errors_1 = require("../errors");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * POST /auth/register
 * Kullanıcı kaydı
 */
router.post('/register', async (req, res) => {
    try {
        // Log request body for debugging
        console.log('Register request body:', JSON.stringify(req.body));
        // Validation
        const validatedData = auth_1.registerSchema.parse(req.body);
        // Register
        const result = await authService_1.authService.register(validatedData);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('Register error:', error);
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof zod_1.z.ZodError) {
            // Zod validation errors - better error handling
            const firstError = error.errors[0];
            const errorMessage = firstError
                ? `${firstError.path.join('.')}: ${firstError.message}`
                : 'Geçersiz kayıt bilgileri';
            res.status(400).json({
                success: false,
                error: errorMessage,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                error: error.message || 'Geçersiz kayıt bilgileri',
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
/**
 * POST /auth/login
 * Kullanıcı girişi
 */
router.post('/login', async (req, res) => {
    try {
        // Log request body for debugging
        console.log('Login request body:', JSON.stringify(req.body));
        // Validation
        const validatedData = auth_1.loginSchema.parse(req.body);
        // Login
        const result = await authService_1.authService.login(validatedData);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof zod_1.z.ZodError) {
            // Zod validation errors - better error handling
            const firstError = error.errors[0];
            const errorMessage = firstError
                ? `${firstError.path.join('.')}: ${firstError.message}`
                : 'Geçersiz giriş bilgileri';
            res.status(400).json({
                success: false,
                error: errorMessage,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                error: error.message || 'Geçersiz giriş bilgileri',
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
/**
 * GET /auth/me
 * Mevcut kullanıcı bilgilerini getirme
 */
router.get('/me', auth_2.authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await authService_1.authService.getUserById(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Bir hata oluştu',
            });
        }
    }
});
exports.authRouter = router;
//# sourceMappingURL=auth.js.map