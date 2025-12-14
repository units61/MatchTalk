"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFriendSchema = void 0;
const zod_1 = require("zod");
exports.addFriendSchema = zod_1.z.object({
    friendId: zod_1.z.string().uuid('Geçerli bir kullanıcı ID giriniz'),
});
//# sourceMappingURL=friends.js.map