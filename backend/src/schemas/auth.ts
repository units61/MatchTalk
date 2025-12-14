import {z} from 'zod';

// Password strength validation
const passwordSchema = z
  .string()
  .min(6, 'Şifre en az 6 karakter olmalıdır')
  .max(100, 'Şifre en fazla 100 karakter olabilir')
  .refine(
    (password) => {
      // En az bir harf ve bir rakam içermeli
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      return hasLetter && hasNumber;
    },
    {
      message: 'Şifre en az bir harf ve bir rakam içermelidir',
    },
  )
  .refine(
    (password) => {
      // Yaygın şifreler kontrolü (basit)
      const commonPasswords = ['password', '123456', '12345678', 'qwerty', 'abc123'];
      return !commonPasswords.some((common) => password.toLowerCase().includes(common));
    },
    {
      message: 'Şifre çok yaygın, lütfen daha güçlü bir şifre seçin',
    },
  );

export const registerSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .toLowerCase()
    .trim()
    .max(255, 'E-posta adresi çok uzun'),
  name: z
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .trim()
    .refine((name) => /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(name), {
      message: 'İsim sadece harf içerebilir',
    }),
  password: passwordSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({message: 'Cinsiyet "male" veya "female" olmalıdır'}),
  }),
});

export const loginSchema = z.object({
  email: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim().toLowerCase() : val),
    z.string().email('Geçerli bir e-posta adresi giriniz').max(255, 'E-posta adresi çok uzun'),
  ),
  password: z.string().min(1, 'Şifre gereklidir').max(100, 'Şifre en fazla 100 karakter olabilir'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

