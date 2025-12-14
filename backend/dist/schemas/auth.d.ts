import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    gender: "male" | "female";
}, {
    email: string;
    name: string;
    password: string;
    gender: "male" | "female";
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, unknown>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    password: string;
    email?: unknown;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.d.ts.map