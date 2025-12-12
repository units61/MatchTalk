import {z} from 'zod';

export const addFriendSchema = z.object({
  friendId: z.string().uuid('Geçerli bir kullanıcı ID giriniz'),
});

export type AddFriendInput = z.infer<typeof addFriendSchema>;

