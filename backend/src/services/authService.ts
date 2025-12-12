import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {config} from '../config';
import {RegisterInput, LoginInput} from '../schemas/auth';

export class AuthService {
  /**
   * Kullanıcı kaydı
   */
  async register(input: RegisterInput) {
    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: {email: input.email},
    });

    if (existingUser) {
      throw new HttpError(409, 'Bu e-posta adresi zaten kullanılıyor');
    }

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Kullanıcı oluşturma
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

    // JWT token oluşturma
    const token = this.generateToken(user.id);

    return {
      user,
      token,
    };
  }

  /**
   * Kullanıcı girişi
   */
  async login(input: LoginInput) {
    // Kullanıcı bulma
    const user = await prisma.user.findUnique({
      where: {email: input.email},
    });

    if (!user) {
      throw new HttpError(401, 'E-posta veya şifre hatalı');
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(input.password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new HttpError(401, 'E-posta veya şifre hatalı');
    }

    // JWT token oluşturma
    const token = this.generateToken(user.id);

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

  /**
   * JWT token oluşturma
   */
  private generateToken(userId: string): string {
    return jwt.sign({userId}, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }

  /**
   * Kullanıcı bilgilerini getirme
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {id: userId},
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
  }
}

export const authService = new AuthService();

