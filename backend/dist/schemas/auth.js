"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Geçerli bir e-posta adresi giriniz'),
    name: zod_1.z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir'),
    password: zod_1.z.string().min(6, 'Şifre en az 6 karakter olmalıdır').max(100, 'Şifre en fazla 100 karakter olabilir'),
    gender: zod_1.z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Cinsiyet "male" veya "female" olmalıdır' }),
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.trim().toLowerCase() : val), zod_1.z.string().email('Geçerli bir e-posta adresi giriniz')),
    password: zod_1.z.string().min(6, 'Şifre en az 6 karakter olmalıdır').max(100, 'Şifre en fazla 100 karakter olabilir'),
});
//# sourceMappingURL=auth.js.map