"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const errors_1 = require("../errors");
const logger_1 = require("../logger");
const client_s3_1 = require("@aws-sdk/client-s3");
class LocalFileStorage {
    constructor() {
        this.uploadDir = process.env.UPLOAD_DIR || path_1.default.join(process.cwd(), 'uploads', 'avatars');
        this.ensureUploadDir();
    }
    async ensureUploadDir() {
        try {
            await fs_1.promises.mkdir(this.uploadDir, { recursive: true });
        }
        catch (error) {
            logger_1.logger.error('Error creating upload directory:', error);
        }
    }
    async saveFile(file, userId) {
        try {
            // Dosya adını oluştur: userId-timestamp.extension
            const timestamp = Date.now();
            const extension = path_1.default.extname(file.originalname) || '.jpg';
            const fileName = `${userId}-${timestamp}${extension}`;
            const filePath = path_1.default.join(this.uploadDir, fileName);
            // Dosyayı kaydet
            await fs_1.promises.writeFile(filePath, file.buffer);
            // Relative path döndür (URL için)
            return `/uploads/avatars/${fileName}`;
        }
        catch (error) {
            logger_1.logger.error('Error saving file locally:', error);
            throw new errors_1.HttpError(500, 'Dosya kaydedilirken bir hata oluştu');
        }
    }
    async deleteFile(filePath) {
        try {
            // URL'den dosya yolunu çıkar
            const fileName = path_1.default.basename(filePath);
            const fullPath = path_1.default.join(this.uploadDir, fileName);
            await fs_1.promises.unlink(fullPath);
        }
        catch (error) {
            // Dosya bulunamazsa hata verme (zaten silinmiş olabilir)
            logger_1.logger.warn('Error deleting file (may not exist):', error);
        }
    }
    async resizeImage(file, dimensions) {
        try {
            return await (0, sharp_1.default)(file.buffer)
                .resize(dimensions.width, dimensions.height, {
                fit: 'cover',
                position: 'center',
            })
                .jpeg({ quality: 85 })
                .toBuffer();
        }
        catch (error) {
            logger_1.logger.error('Error resizing image:', error);
            throw new errors_1.HttpError(500, 'Resim işlenirken bir hata oluştu');
        }
    }
}
class S3FileStorage {
    constructor() {
        this.bucket = process.env.S3_BUCKET || '';
        this.region = process.env.S3_REGION || 'us-east-1';
        if (!this.bucket) {
            throw new Error('S3_BUCKET environment variable is required for S3 storage');
        }
        this.s3Client = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }
    async saveFile(file, userId) {
        try {
            const timestamp = Date.now();
            const extension = path_1.default.extname(file.originalname) || '.jpg';
            const fileName = `avatars/${userId}-${timestamp}${extension}`;
            // Resize image before uploading
            const resizedBuffer = await this.resizeImage(file, { width: 400, height: 400 });
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: fileName,
                Body: resizedBuffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            });
            await this.s3Client.send(command);
            // Public URL döndür
            return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileName}`;
        }
        catch (error) {
            logger_1.logger.error('Error saving file to S3:', error);
            throw new errors_1.HttpError(500, 'Dosya S3\'e kaydedilirken bir hata oluştu');
        }
    }
    async deleteFile(filePath) {
        try {
            // URL'den key'i çıkar
            const url = new URL(filePath);
            const key = url.pathname.substring(1); // İlk / karakterini kaldır
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            await this.s3Client.send(command);
        }
        catch (error) {
            logger_1.logger.warn('Error deleting file from S3 (may not exist):', error);
        }
    }
    async resizeImage(file, dimensions) {
        try {
            return await (0, sharp_1.default)(file.buffer)
                .resize(dimensions.width, dimensions.height, {
                fit: 'cover',
                position: 'center',
            })
                .jpeg({ quality: 85 })
                .toBuffer();
        }
        catch (error) {
            logger_1.logger.error('Error resizing image:', error);
            throw new errors_1.HttpError(500, 'Resim işlenirken bir hata oluştu');
        }
    }
}
class FileService {
    constructor() {
        const storageType = process.env.STORAGE_TYPE || 'local';
        if (storageType === 's3') {
            this.storage = new S3FileStorage();
        }
        else {
            this.storage = new LocalFileStorage();
        }
    }
    async saveAvatar(file, userId) {
        try {
            // Resize image (400x400 for avatars)
            const resizedBuffer = await this.storage.resizeImage(file, { width: 400, height: 400 });
            // Create a new file object with resized buffer
            const resizedFile = {
                ...file,
                buffer: resizedBuffer,
            };
            // Save file
            const filePath = await this.storage.saveFile(resizedFile, userId);
            return filePath;
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                throw error;
            }
            logger_1.logger.error('Error saving avatar:', error);
            throw new errors_1.HttpError(500, 'Avatar kaydedilirken bir hata oluştu');
        }
    }
    async deleteAvatar(filePath) {
        try {
            await this.storage.deleteFile(filePath);
        }
        catch (error) {
            logger_1.logger.warn('Error deleting avatar:', error);
            // Hata olsa bile devam et (dosya zaten silinmiş olabilir)
        }
    }
}
exports.fileService = new FileService();
//# sourceMappingURL=fileService.js.map