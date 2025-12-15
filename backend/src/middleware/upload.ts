import multer from 'multer';
import {Request} from 'express';
import {HttpError} from '../errors';

// Allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new HttpError(
        400,
        'Geçersiz dosya tipi. Sadece JPEG, PNG, GIF ve WebP formatları desteklenir.',
      ),
    );
  }
};

// Storage configuration (memory storage - fileService'de işlenecek)
const storage = multer.memoryStorage();

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxFileSize,
    files: 1, // Sadece bir dosya
  },
});

// Single file upload middleware
export const uploadSingle = upload.single('avatar');

// Error handler for multer
export const handleUploadError = (
  error: any,
  req: Request,
  res: any,
  next: any,
) => {
  if (error instanceof multer.MulterError) {
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

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }

  next(error);
};




