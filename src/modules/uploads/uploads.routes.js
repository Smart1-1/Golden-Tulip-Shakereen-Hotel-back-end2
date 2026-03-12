import { Router } from 'express';
import multer from 'multer';
import { env } from '../../config/env.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { HttpError } from '../../lib/httpError.js';
import { requireAdminKey } from '../../middleware/requireAdminKey.js';
import { uploadsService } from './uploads.service.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.maxUploadSizeBytes
  }
});

const uploadsRouter = Router();

uploadsRouter.post(
  '/images',
  requireAdminKey,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new HttpError(400, 'No image file was provided.');
    }

    const stored = await uploadsService.saveImageFile(req.file);
    const origin = `${req.protocol}://${req.get('host')}`;
    const isAbsolute = /^https?:\/\//i.test(stored.publicPath);
    const url = isAbsolute ? stored.publicPath : `${origin}${stored.publicPath}`;

    res.status(201).json({
      message: 'Image uploaded successfully.',
      data: {
        ...stored,
        url
      }
    });
  })
);

export { uploadsRouter };
