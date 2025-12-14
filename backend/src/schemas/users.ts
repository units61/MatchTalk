import {z} from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir').optional(),
  avatar: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('').transform(() => null)),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Mevcut şifre gereklidir'),
  newPassword: z.string().min(6, 'Yeni şifre en az 6 karakter olmalıdır').max(100, 'Yeni şifre en fazla 100 karakter olabilir'),
});

export const changeEmailSchema = z.object({
  newEmail: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(1, 'Şifre gereklidir'),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
