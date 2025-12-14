"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmailSchema = exports.changePasswordSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir').optional(),
    avatar: zod_1.z.string().url('Geçerli bir URL giriniz').optional().or(zod_1.z.literal('').transform(() => null)),
});
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1, 'Mevcut şifre gereklidir'),
    newPassword: zod_1.z.string().min(6, 'Yeni şifre en az 6 karakter olmalıdır').max(100, 'Yeni şifre en fazla 100 karakter olabilir'),
});
exports.changeEmailSchema = zod_1.z.object({
    newEmail: zod_1.z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: zod_1.z.string().min(1, 'Şifre gereklidir'),
});
//# sourceMappingURL=users.js.map