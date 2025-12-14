import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { HttpError } from '../errors';
import { logger } from '../logger';

export class UserService {
  /**
   * Kullanıcı profilini güncelle
   */
  async updateProfile(userId: string, data: { name?: string; avatar?: string | null }) {
    try {
      // Güncellenecek alanları hazırla
      const updateData: { name?: string; avatar?: string | null } = {};

      if (data.name !== undefined) {
        if (data.name.trim().length < 2) {
          throw new HttpError(400, 'İsim en az 2 karakter olmalıdır');
        }
        if (data.name.trim().length > 50) {
          throw new HttpError(400, 'İsim en fazla 50 karakter olabilir');
        }
        updateData.name = data.name.trim();
      }

      if (data.avatar !== undefined) {
        updateData.avatar = data.avatar;
      }

      // Hiçbir alan güncellenmemişse hata döndür
      if (Object.keys(updateData).length === 0) {
        throw new HttpError(400, 'Güncellenecek alan belirtilmedi');
      }

      // Kullanıcıyı güncelle
      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          gender: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      logger.info(`User profile updated: ${userId}`);
      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error updating user profile:', error);
      throw new HttpError(500, 'Profil güncellenirken bir hata oluştu');
    }
  }

  /**
   * Şifre değiştir
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
      // Yeni şifre validasyonu
      if (newPassword.length < 6) {
        throw new HttpError(400, 'Yeni şifre en az 6 karakter olmalıdır');
      }
      if (newPassword.length > 100) {
        throw new HttpError(400, 'Yeni şifre en fazla 100 karakter olabilir');
      }

      // Kullanıcıyı getir
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { hashedPassword: true },
      });

      if (!user) {
        throw new HttpError(404, 'Kullanıcı bulunamadı');
      }

      // Eski şifreyi doğrula
      const isValid = await bcrypt.compare(oldPassword, user.hashedPassword);
      if (!isValid) {
        throw new HttpError(400, 'Mevcut şifre hatalı');
      }

      // Yeni şifreyi hashle
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Şifreyi güncelle
      await prisma.user.update({
        where: { id: userId },
        data: { hashedPassword },
      });

      logger.info(`User password changed: ${userId}`);
      return { success: true };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error changing password:', error);
      throw new HttpError(500, 'Şifre değiştirilirken bir hata oluştu');
    }
  }

  /**
   * Email değiştir
   */
  async changeEmail(userId: string, newEmail: string, password: string) {
    try {
      // Email validasyonu
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        throw new HttpError(400, 'Geçerli bir e-posta adresi giriniz');
      }

      // Email zaten kullanılıyor mu kontrol et
      const existingUser = await prisma.user.findUnique({
        where: { email: newEmail.toLowerCase().trim() },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new HttpError(409, 'Bu e-posta adresi zaten kullanılıyor');
      }

      // Kullanıcıyı getir ve şifreyi doğrula
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { hashedPassword: true, email: true },
      });

      if (!user) {
        throw new HttpError(404, 'Kullanıcı bulunamadı');
      }

      // Şifreyi doğrula
      const isValid = await bcrypt.compare(password, user.hashedPassword);
      if (!isValid) {
        throw new HttpError(400, 'Şifre hatalı');
      }

      // Aynı email ise hata döndür
      if (user.email.toLowerCase() === newEmail.toLowerCase().trim()) {
        throw new HttpError(400, 'Yeni e-posta adresi mevcut e-posta adresiyle aynı');
      }

      // Email'i güncelle
      await prisma.user.update({
        where: { id: userId },
        data: { email: newEmail.toLowerCase().trim() },
      });

      logger.info(`User email changed: ${userId}`);
      return { success: true };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error changing email:', error);
      throw new HttpError(500, 'E-posta değiştirilirken bir hata oluştu');
    }
  }

  /**
   * Kullanıcı profil bilgilerini getir
   */
  async getUserProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
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
      logger.error('Error getting user profile:', error);
      throw new HttpError(500, 'Profil bilgileri alınırken bir hata oluştu');
    }
  }

  /**
   * Public kullanıcı profil bilgilerini getir (başka kullanıcılar için)
   */
  async getPublicProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          avatar: true,
          gender: true,
          xp: true,
          level: true,
          createdAt: true,
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
      logger.error('Error getting public profile:', error);
      throw new HttpError(500, 'Profil bilgileri alınırken bir hata oluştu');
    }
  }
}

export const userService = new UserService();
