"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenSchema = void 0;
const zod_1 = require("zod");
exports.generateTokenSchema = zod_1.z.object({
    channelName: zod_1.z.string().min(1, 'Channel name is required').max(255, 'Channel name too long'),
    uid: zod_1.z.union([zod_1.z.number().int().positive(), zod_1.z.string().uuid()]).optional(),
    expirationTimeInSeconds: zod_1.z.number().int().min(60).max(86400 * 7).optional(), // 1 dakika - 7 gün
});
//# sourceMappingURL=agora.js.map