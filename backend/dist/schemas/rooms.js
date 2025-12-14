"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoomSchema = exports.createRoomSchema = void 0;
const zod_1 = require("zod");
exports.createRoomSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Oda adı gereklidir').max(100, 'Oda adı en fazla 100 karakter olabilir'),
    category: zod_1.z.string().min(1, 'Kategori gereklidir').max(50, 'Kategori en fazla 50 karakter olabilir'),
    maxParticipants: zod_1.z.number().int().min(4).max(8).default(8),
    durationSec: zod_1.z.number().int().min(60).max(600).default(300), // 1-10 dakika
});
exports.joinRoomSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid('Geçerli bir oda ID giriniz'),
});
//# sourceMappingURL=rooms.js.map