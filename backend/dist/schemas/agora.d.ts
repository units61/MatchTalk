import { z } from 'zod';
export declare const generateTokenSchema: z.ZodObject<{
    channelName: z.ZodString;
    uid: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    expirationTimeInSeconds: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    channelName: string;
    uid?: string | number | undefined;
    expirationTimeInSeconds?: number | undefined;
}, {
    channelName: string;
    uid?: string | number | undefined;
    expirationTimeInSeconds?: number | undefined;
}>;
export type GenerateTokenInput = z.infer<typeof generateTokenSchema>;
//# sourceMappingURL=agora.d.ts.map