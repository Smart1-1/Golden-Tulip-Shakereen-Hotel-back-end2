import path from 'node:path';

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(`${value ?? ''}`, 10);
  return Number.isInteger(parsed) ? parsed : fallback;
};

const toBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  const normalized = `${value}`.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return fallback;
};

const resolveDataDir = () => {
  const configured = process.env.DATA_DIR?.trim();
  if (!configured) {
    return path.resolve(process.cwd(), 'data');
  }
  return path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured);
};

const parseCorsOrigins = () => {
  const configured = process.env.CORS_ORIGINS?.trim();
  if (!configured) return [];
  return configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const resolveUploadsDir = (dataDir) => {
  const configured = process.env.UPLOADS_DIR?.trim();
  if (!configured) {
    return path.join(dataDir, 'uploads');
  }
  return path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured);
};

const maxUploadSizeMb = toInt(process.env.MAX_UPLOAD_SIZE_MB, 30);

const dataDir = resolveDataDir();

const resolveDataStorageDriver = () => {
  const configured = process.env.DATA_STORAGE_DRIVER?.trim().toLowerCase();
  return configured === 'postgres' ? 'postgres' : 'file';
};

const resolveUploadsStorageDriver = () => {
  const configured = process.env.UPLOADS_STORAGE_DRIVER?.trim().toLowerCase();
  return configured === 's3' ? 's3' : 'local';
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: toNumber(process.env.PORT, 8787),
  bodyLimit: process.env.API_BODY_LIMIT ?? '15mb',
  dataStorageDriver: resolveDataStorageDriver(),
  uploadsStorageDriver: resolveUploadsStorageDriver(),
  databaseUrl: process.env.DATABASE_URL?.trim() ?? '',
  pgSsl: toBoolean(process.env.PG_SSL, false),
  dataDir,
  uploadsDir: resolveUploadsDir(dataDir),
  maxUploadSizeBytes: Math.max(1, maxUploadSizeMb) * 1024 * 1024,
  s3Bucket: process.env.S3_BUCKET?.trim() ?? '',
  s3Region: process.env.S3_REGION?.trim() ?? '',
  s3Endpoint: process.env.S3_ENDPOINT?.trim() ?? '',
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID?.trim() ?? '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY?.trim() ?? '',
  s3PublicBaseUrl: process.env.S3_PUBLIC_BASE_URL?.trim() ?? '',
  s3KeyPrefix: process.env.S3_KEY_PREFIX?.trim() ?? 'uploads',
  s3ForcePathStyle: toBoolean(process.env.S3_FORCE_PATH_STYLE, false),
  adminApiKey: process.env.ADMIN_API_KEY?.trim() ?? '',
  corsOrigins: parseCorsOrigins()
};
