import {z} from 'zod';

export const getLeaderboardSchema = z.object({
  limit: z.number().int().min(1).max(1000).optional().default(100),
});

export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>;



