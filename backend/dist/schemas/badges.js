"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboardSchema = void 0;
const zod_1 = require("zod");
exports.getLeaderboardSchema = zod_1.z.object({
    limit: zod_1.z.number().int().min(1).max(1000).optional().default(100),
});
//# sourceMappingURL=badges.js.map