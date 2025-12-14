import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz')
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .max(100, 'Şifre en fazla 100 karakter olabilir'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'İsim en az 2 karakter olmalıdır')
      .max(50, 'İsim en fazla 50 karakter olabilir')
      .trim(),
    email: z
      .string()
      .min(1, 'E-posta adresi gereklidir')
      .email('Geçerli bir e-posta adresi giriniz')
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .max(100, 'Şifre en fazla 100 karakter olabilir')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir',
      ),
    confirmPassword: z.string().min(1, 'Şifre tekrarı gereklidir'),
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({message: 'Cinsiyet seçimi gereklidir'}),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;









