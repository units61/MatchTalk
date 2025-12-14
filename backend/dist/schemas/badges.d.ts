import { z } from 'zod';
export declare const getLeaderboardSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
}, {
    limit?: number | undefined;
}>;
export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>;
//# sourceMappingURL=badges.d.ts.map