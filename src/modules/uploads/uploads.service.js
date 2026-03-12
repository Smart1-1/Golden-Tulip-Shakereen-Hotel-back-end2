import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env.js';
import { HttpError } from '../../lib/httpError.js';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/avif'
]);

const MIME_TO_EXTENSION = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/avif': 'avif'
};

const IS_S3_DRIVER = env.uploadsStorageDriver === 's3';
let s3ClientPromise = null;

const ensureUploadsDir = async () => {
  await fs.mkdir(env.uploadsDir, { recursive: true });
};

const buildFileName = (mimeType) => {
  const ext = MIME_TO_EXTENSION[mimeType] ?? 'bin';
  return `${Date.now()}-${crypto.randomUUID()}.${ext}`;
};

const normalizeS3Prefix = () => env.s3KeyPrefix.replace(/^\/+|\/+$/g, '');

const buildS3ObjectKey = (fileName) => {
  const prefix = normalizeS3Prefix();
  return prefix ? `${prefix}/${fileName}` : fileName;
};

const loadS3Sdk = async () => {
  try {
    return await import('@aws-sdk/client-s3');
  } catch (error) {
    const wrapped = new Error('S3 uploads require the `@aws-sdk/client-s3` package. Install it with `npm install @aws-sdk/client-s3`.');
    wrapped.cause = error;
    throw wrapped;
  }
};

const createS3Client = async () => {
  const missingConfig = [];
  if (!env.s3Bucket) missingConfig.push('S3_BUCKET');
  if (!env.s3Region) missingConfig.push('S3_REGION');
  if (!env.s3AccessKeyId) missingConfig.push('S3_ACCESS_KEY_ID');
  if (!env.s3SecretAccessKey) missingConfig.push('S3_SECRET_ACCESS_KEY');
  if (missingConfig.length) {
    throw new Error(`Missing required S3 config: ${missingConfig.join(', ')}`);
  }

  const { S3Client, PutObjectCommand } = await loadS3Sdk();
  const config = {
    region: env.s3Region,
    credentials: {
      accessKeyId: env.s3AccessKeyId,
      secretAccessKey: env.s3SecretAccessKey
    },
    forcePathStyle: env.s3ForcePathStyle
  };

  if (env.s3Endpoint) {
    config.endpoint = env.s3Endpoint;
  }

  return {
    client: new S3Client(config),
    PutObjectCommand
  };
};

const getS3Client = async () => {
  if (!s3ClientPromise) {
    s3ClientPromise = createS3Client();
  }
  return s3ClientPromise;
};

const resolveS3PublicUrl = (objectKey) => {
  const normalizedKey = objectKey.replace(/^\/+/, '');
  if (env.s3PublicBaseUrl) {
    return `${env.s3PublicBaseUrl.replace(/\/+$/, '')}/${normalizedKey}`;
  }

  if (env.s3Endpoint) {
    const endpoint = env.s3Endpoint.replace(/\/+$/, '');
    return `${endpoint}/${env.s3Bucket}/${normalizedKey}`;
  }

  return `https://${env.s3Bucket}.s3.${env.s3Region}.amazonaws.com/${normalizedKey}`;
};

const saveImageToLocalDisk = async (file, mimeType, fileName) => {
  await ensureUploadsDir();
  const diskPath = path.join(env.uploadsDir, fileName);
  await fs.writeFile(diskPath, file.buffer);
  return `/uploads/${fileName}`;
};

const saveImageToS3 = async (file, mimeType, fileName) => {
  const { client, PutObjectCommand } = await getS3Client();
  const objectKey = buildS3ObjectKey(fileName);
  await client.send(
    new PutObjectCommand({
      Bucket: env.s3Bucket,
      Key: objectKey,
      Body: file.buffer,
      ContentType: mimeType
    })
  );
  return resolveS3PublicUrl(objectKey);
};

export const uploadsService = {
  getStorageDriver() {
    return IS_S3_DRIVER ? 's3' : 'local';
  },

  isMimeTypeAllowed(mimeType) {
    return ALLOWED_MIME_TYPES.has(`${mimeType ?? ''}`.toLowerCase());
  },

  async saveImageFile(file) {
    const mimeType = `${file?.mimetype ?? ''}`.toLowerCase();
    if (!this.isMimeTypeAllowed(mimeType)) {
      throw new HttpError(400, 'Unsupported image format.');
    }

    const fileName = buildFileName(mimeType);
    const publicPath = IS_S3_DRIVER
      ? await saveImageToS3(file, mimeType, fileName)
      : await saveImageToLocalDisk(file, mimeType, fileName);

    return {
      fileName,
      mimeType,
      size: file.size,
      publicPath
    };
  }
};
