import {z} from 'zod';

export const updateUserRoleSchema = z.object({
  role: z.enum(['user', 'moderator', 'admin'], {
    errorMap: () => ({message: 'Role must be user, moderator, or admin'}),
  }),
});

export const banUserSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type BanUserInput = z.infer<typeof banUserSchema>;



