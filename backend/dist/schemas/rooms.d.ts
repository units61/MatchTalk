import { z } from 'zod';
export declare const createRoomSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodString;
    maxParticipants: z.ZodDefault<z.ZodNumber>;
    durationSec: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: string;
    maxParticipants: number;
    durationSec: number;
}, {
    name: string;
    category: string;
    maxParticipants?: number | undefined;
    durationSec?: number | undefined;
}>;
export declare const joinRoomSchema: z.ZodObject<{
    roomId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roomId: string;
}, {
    roomId: string;
}>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
//# sourceMappingURL=rooms.d.ts.map