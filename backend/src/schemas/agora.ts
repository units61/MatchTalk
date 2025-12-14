import {z} from 'zod';

export const generateTokenSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required').max(255, 'Channel name too long'),
  uid: z.union([z.number().int().positive(), z.string().uuid()]).optional(),
  expirationTimeInSeconds: z.number().int().min(60).max(86400 * 7).optional(), // 1 dakika - 7 gün
});

export type GenerateTokenInput = z.infer<typeof generateTokenSchema>;
