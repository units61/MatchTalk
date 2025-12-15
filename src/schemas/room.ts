import {z} from 'zod';

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, 'Oda adı gereklidir')
    .max(100, 'Oda adı en fazla 100 karakter olabilir')
    .trim(),
  category: z
    .string()
    .min(1, 'Kategori gereklidir')
    .max(50, 'Kategori en fazla 50 karakter olabilir')
    .trim(),
  maxParticipants: z
    .number()
    .int()
    .min(2, 'Minimum 2 kişi olmalıdır')
    .max(8, 'Maksimum 8 kişi olabilir')
    .refine((val) => val % 2 === 0, {
      message: 'Katılımcı sayısı çift olmalıdır (2, 4, 6, 8)',
    })
    .default(8)
    .optional(),
  durationSec: z
    .number()
    .int()
    .refine((val) => val === 300, {
      message: 'Oda süresi sabit 5 dakikadır',
    })
    .default(300) // Sabit 5 dakika
    .optional(),
});

export const joinRoomSchema = z.object({
  roomId: z.string().uuid('Geçerli bir oda ID giriniz'),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;












