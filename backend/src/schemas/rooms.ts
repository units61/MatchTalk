import {z} from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(1, 'Oda adı gereklidir').max(100, 'Oda adı en fazla 100 karakter olabilir'),
  category: z.string().min(1, 'Kategori gereklidir').max(50, 'Kategori en fazla 50 karakter olabilir'),
  maxParticipants: z.number().int().min(4).max(8).default(8),
  durationSec: z.number().int().min(60).max(600).default(300), // 1-10 dakika
});

export const joinRoomSchema = z.object({
  roomId: z.string().uuid('Geçerli bir oda ID giriniz'),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;

