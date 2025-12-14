"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadError = exports.uploadSingle = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const errors_1 = require("../errors");
// Allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB
// File filter
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new errors_1.HttpError(400, 'Geçersiz dosya tipi. Sadece JPEG, PNG, GIF ve WebP formatları desteklenir.'));
    }
};
// Storage configuration (memory storage - fileService'de işlenecek)
const storage = multer_1.default.memoryStorage();
// Multer configuration
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: maxFileSize,
        files: 1, // Sadece bir dosya
    },
});
// Single file upload middleware
exports.uploadSingle = exports.upload.single('avatar');
// Error handler for multer
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'Dosya boyutu çok büyük. Maksimum 5MB olabilir.',
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                error: 'Sadece bir dosya yüklenebilir.',
            });
        }
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    if (error instanceof errors_1.HttpError) {
        return res.status(error.status).json({
            success: false,
            error: error.message,
        });
    }
    next(error);
};
exports.handleUploadError = handleUploadError;
//# sourceMappingURL=upload.js.map