"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const userService_1 = require("../services/userService");
const users_1 = require("../schemas/users");
const errors_1 = require("../errors");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const fileService_1 = require("../services/fileService");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * POST /users/avatar
 * Avatar yükle
 */
router.post('/avatar', upload_1.uploadSingle, upload_1.handleUploadError, async (req, res) => {
    try {
        const userId = req.userId;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Dosya yüklenmedi',
            });
        }
        // Eski avatar'ı sil (varsa)
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { avatar: true },
        });
        if (user?.avatar) {
            await fileService_1.fileService.deleteAvatar(user.avatar);
        }
        // Yeni avatar'ı kaydet
        const avatarPath = await fileService_1.fileService.saveAvatar(req.file, userId);
        // Kullanıcıyı güncelle
        const updatedUser = await userService_1.userService.updateProfile(userId, { avatar: avatarPath });
        res.status(200).json({
            success: true,
            data: {
                avatar: updatedUser.avatar,
            },
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
                error: 'Avatar yüklenirken bir hata oluştu',
            });
        }
    }
});
/**
 * DELETE /users/avatar
 * Avatar sil
 */
router.delete('/avatar', async (req, res) => {
    try {
        const userId = req.userId;
        // Kullanıcının mevcut avatar'ını getir
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { avatar: true },
        });
        if (user?.avatar) {
            // Dosyayı sil
            await fileService_1.fileService.deleteAvatar(user.avatar);
            // Kullanıcıyı güncelle (avatar'ı null yap)
            await userService_1.userService.updateProfile(userId, { avatar: null });
        }
        res.status(200).json({
            success: true,
            message: 'Avatar silindi',
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
                error: 'Avatar silinirken bir hata oluştu',
            });
        }
    }
});
/**
 * GET /users/me
 * Mevcut kullanıcının profil bilgilerini getir
 */
router.get('/me', async (req, res) => {
    try {
        const userId = req.userId;
        const profile = await userService_1.userService.getUserProfile(userId);
        res.status(200).json({
            success: true,
            data: profile,
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
/**
 * GET /users/:id
 * Public kullanıcı profil bilgilerini getir
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await userService_1.userService.getPublicProfile(id);
        res.status(200).json({
            success: true,
            data: profile,
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
/**
 * PUT /users/profile
 * Kullanıcı profilini güncelle
 */
router.put('/profile', async (req, res) => {
    try {
        const userId = req.userId;
        const validatedData = users_1.updateProfileSchema.parse(req.body);
        const profile = await userService_1.userService.updateProfile(userId, validatedData);
        res.status(200).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
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
/**
 * PUT /users/password
 * Şifre değiştir
 */
router.put('/password', async (req, res) => {
    try {
        const userId = req.userId;
        const validatedData = users_1.changePasswordSchema.parse(req.body);
        const result = await userService_1.userService.changePassword(userId, validatedData.oldPassword, validatedData.newPassword);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
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
/**
 * PUT /users/email
 * Email değiştir
 */
router.put('/email', async (req, res) => {
    try {
        const userId = req.userId;
        const validatedData = users_1.changeEmailSchema.parse(req.body);
        const result = await userService_1.userService.changeEmail(userId, validatedData.newEmail, validatedData.password);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof errors_1.HttpError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(400).json({
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
exports.usersRouter = router;
//# sourceMappingURL=users.js.map