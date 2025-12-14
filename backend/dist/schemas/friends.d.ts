import { z } from 'zod';
export declare const addFriendSchema: z.ZodObject<{
    friendId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    friendId: string;
}, {
    friendId: string;
}>;
export type AddFriendInput = z.infer<typeof addFriendSchema>;
//# sourceMappingURL=friends.d.ts.map