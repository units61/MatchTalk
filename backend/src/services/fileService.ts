import sharp from 'sharp';
import {promises as fs} from 'fs';
import path from 'path';
import {HttpError} from '../errors';
import {logger} from '../logger';
import {config} from '../config';
import {S3Client, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';

interface FileStorage {
  saveFile(file: Express.Multer.File, userId: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
  resizeImage(file: Express.Multer.File, dimensions: {width: number; height: number}): Promise<Buffer>;
}

class LocalFileStorage implements FileStorage {
  private uploadDir: string;

  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads', 'avatars');
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, {recursive: true});
    } catch (error) {
      logger.error('Error creating upload directory:', error);
    }
  }

  async saveFile(file: Express.Multer.File, userId: string): Promise<string> {
    try {
      // Dosya adını oluştur: userId-timestamp.extension
      const timestamp = Date.now();
      const extension = path.extname(file.originalname) || '.jpg';
      const fileName = `${userId}-${timestamp}${extension}`;
      const filePath = path.join(this.uploadDir, fileName);

      // Dosyayı kaydet
      await fs.writeFile(filePath, file.buffer);

      // Relative path döndür (URL için)
      return `/uploads/avatars/${fileName}`;
    } catch (error) {
      logger.error('Error saving file locally:', error);
      throw new HttpError(500, 'Dosya kaydedilirken bir hata oluştu');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      // URL'den dosya yolunu çıkar
      const fileName = path.basename(filePath);
      const fullPath = path.join(this.uploadDir, fileName);

      await fs.unlink(fullPath);
    } catch (error) {
      // Dosya bulunamazsa hata verme (zaten silinmiş olabilir)
      logger.warn('Error deleting file (may not exist):', error);
    }
  }

  async resizeImage(file: Express.Multer.File, dimensions: {width: number; height: number}): Promise<Buffer> {
    try {
      return await sharp(file.buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({quality: 85})
        .toBuffer();
    } catch (error) {
      logger.error('Error resizing image:', error);
      throw new HttpError(500, 'Resim işlenirken bir hata oluştu');
    }
  }
}

class S3FileStorage implements FileStorage {
  private s3Client: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET || '';
    this.region = process.env.S3_REGION || 'us-east-1';

    if (!this.bucket) {
      throw new Error('S3_BUCKET environment variable is required for S3 storage');
    }

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async saveFile(file: Express.Multer.File, userId: string): Promise<string> {
    try {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname) || '.jpg';
      const fileName = `avatars/${userId}-${timestamp}${extension}`;

      // Resize image before uploading
      const resizedBuffer = await this.resizeImage(file, {width: 400, height: 400});

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: resizedBuffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);

      // Public URL döndür
      return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error) {
      logger.error('Error saving file to S3:', error);
      throw new HttpError(500, 'Dosya S3\'e kaydedilirken bir hata oluştu');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      // URL'den key'i çıkar
      const url = new URL(filePath);
      const key = url.pathname.substring(1); // İlk / karakterini kaldır

      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      logger.warn('Error deleting file from S3 (may not exist):', error);
    }
  }

  async resizeImage(file: Express.Multer.File, dimensions: {width: number; height: number}): Promise<Buffer> {
    try {
      return await sharp(file.buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({quality: 85})
        .toBuffer();
    } catch (error) {
      logger.error('Error resizing image:', error);
      throw new HttpError(500, 'Resim işlenirken bir hata oluştu');
    }
  }
}

class FileService {
  private storage: FileStorage;

  constructor() {
    const storageType = process.env.STORAGE_TYPE || 'local';

    if (storageType === 's3') {
      this.storage = new S3FileStorage();
    } else {
      this.storage = new LocalFileStorage();
    }
  }

  async saveAvatar(file: Express.Multer.File, userId: string): Promise<string> {
    try {
      // Resize image (400x400 for avatars)
      const resizedBuffer = await this.storage.resizeImage(file, {width: 400, height: 400});

      // Create a new file object with resized buffer
      const resizedFile: Express.Multer.File = {
        ...file,
        buffer: resizedBuffer,
      };

      // Save file
      const filePath = await this.storage.saveFile(resizedFile, userId);

      return filePath;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error saving avatar:', error);
      throw new HttpError(500, 'Avatar kaydedilirken bir hata oluştu');
    }
  }

  async deleteAvatar(filePath: string): Promise<void> {
    try {
      await this.storage.deleteFile(filePath);
    } catch (error) {
      logger.warn('Error deleting avatar:', error);
      // Hata olsa bile devam et (dosya zaten silinmiş olabilir)
    }
  }
}

export const fileService = new FileService();
