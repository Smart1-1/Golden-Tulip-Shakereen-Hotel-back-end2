import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const backendDir = process.cwd();
const repoRoot = path.resolve(backendDir, '..');
const runtimeDataFile = path.join(backendDir, 'data', 'site-data.json');
const runtimeUploadsDir = path.join(backendDir, 'data', 'uploads');
const runtimeSeedUploadsDir = path.join(runtimeUploadsDir, 'seed');
const frontendAssetsDir = path.join(repoRoot, 'frontend', 'src', 'assets');
const bootstrapDir = path.join(backendDir, 'bootstrap');
const bootstrapDataFile = path.join(bootstrapDir, 'site-data.json');
const bootstrapUploadsDir = path.join(bootstrapDir, 'uploads');
const UPLOAD_PATH_PATTERN = /\/uploads\/[^?#\s]+/i;
const LOCAL_UPLOAD_URL_PATTERN = /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(\/uploads\/[^?#\s]+)$/i;

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const normalizeUploadValue = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return value;

  const localhostMatch = trimmed.match(LOCAL_UPLOAD_URL_PATTERN);
  if (localhostMatch?.[1]) {
    return localhostMatch[1];
  }

  const uploadMatch = trimmed.match(UPLOAD_PATH_PATTERN);
  if (uploadMatch?.[0]) {
    return uploadMatch[0];
  }

  return value;
};

const walkAndTransform = (value, transform) => {
  if (Array.isArray(value)) {
    return value.map((entry) => walkAndTransform(entry, transform));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, walkAndTransform(entry, transform)]));
  }

  return transform(value);
};

const collectUploadPaths = (value, output = new Set()) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectUploadPaths(entry, output));
    return output;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((entry) => collectUploadPaths(entry, output));
    return output;
  }

  if (typeof value === 'string' && value.startsWith('/uploads/')) {
    output.add(value);
  }

  return output;
};

const toRuntimeUploadDiskPath = (uploadPath) => {
  const relativePath = uploadPath.replace(/^\/uploads\/?/, '').replace(/\//g, path.sep);
  return path.join(runtimeUploadsDir, relativePath);
};

const toBootstrapUploadDiskPath = (uploadPath) => {
  const relativePath = uploadPath.replace(/^\/uploads\/?/, '').replace(/\//g, path.sep);
  return path.join(bootstrapUploadsDir, relativePath);
};

const hashFile = async (filePath) => {
  const content = await fs.readFile(filePath);
  return crypto.createHash('sha1').update(content).digest('hex');
};

const buildSeedHashMap = async () => {
  const hashes = new Map();
  let entries = [];

  try {
    entries = await fs.readdir(runtimeSeedUploadsDir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return hashes;
    }
    throw error;
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const filePath = path.join(runtimeSeedUploadsDir, entry.name);
    const digest = await hashFile(filePath);
    if (!hashes.has(digest)) {
      hashes.set(digest, `/uploads/seed/${entry.name}`);
    }
  }

  return hashes;
};

const resolveSeedSourcePath = async (uploadPath) => {
  const fileName = path.basename(uploadPath);
  const frontendAssetPath = path.join(frontendAssetsDir, fileName);
  if (await fileExists(frontendAssetPath)) {
    return frontendAssetPath;
  }
  return toRuntimeUploadDiskPath(uploadPath);
};

const copyUploadFile = async (uploadPath) => {
  const sourcePath = uploadPath.startsWith('/uploads/seed/')
    ? await resolveSeedSourcePath(uploadPath)
    : toRuntimeUploadDiskPath(uploadPath);

  if (!(await fileExists(sourcePath))) {
    throw new Error(`Referenced upload is missing on disk: ${uploadPath}`);
  }

  const targetPath = toBootstrapUploadDiskPath(uploadPath);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
};

const main = async () => {
  if (!(await fileExists(runtimeDataFile))) {
    throw new Error('Cannot snapshot content because data/site-data.json is missing.');
  }

  const raw = await fs.readFile(runtimeDataFile, 'utf8');
  const runtimeData = JSON.parse(raw);
  const normalizedData = walkAndTransform(runtimeData, normalizeUploadValue);
  const referencedUploads = [...collectUploadPaths(normalizedData)].sort();
  const seedHashes = await buildSeedHashMap();
  const hashToCanonical = new Map();
  const aliases = new Map();

  for (const uploadPath of referencedUploads) {
    if (uploadPath.startsWith('/uploads/seed/')) {
      aliases.set(uploadPath, uploadPath);
      continue;
    }

    const diskPath = toRuntimeUploadDiskPath(uploadPath);
    if (!(await fileExists(diskPath))) {
      throw new Error(`Referenced upload is missing on disk: ${uploadPath}`);
    }

    const digest = await hashFile(diskPath);
    const matchingSeedPath = seedHashes.get(digest);
    if (matchingSeedPath) {
      aliases.set(uploadPath, matchingSeedPath);
      continue;
    }

    if (hashToCanonical.has(digest)) {
      aliases.set(uploadPath, hashToCanonical.get(digest));
      continue;
    }

    hashToCanonical.set(digest, uploadPath);
    aliases.set(uploadPath, uploadPath);
  }

  const publishableData = walkAndTransform(normalizedData, (value) => {
    if (typeof value === 'string' && value.startsWith('/uploads/')) {
      return aliases.get(value) ?? value;
    }
    return value;
  });

  const finalUploads = [...collectUploadPaths(publishableData)].sort();

  await fs.rm(bootstrapUploadsDir, { recursive: true, force: true });
  await fs.mkdir(bootstrapUploadsDir, { recursive: true });
  for (const uploadPath of finalUploads) {
    await copyUploadFile(uploadPath);
  }

  await fs.mkdir(path.dirname(bootstrapDataFile), { recursive: true });
  await fs.writeFile(bootstrapDataFile, `${JSON.stringify(publishableData, null, 2)}\n`, 'utf8');

  const dedupedCount = referencedUploads.length - finalUploads.length;
  console.log(`Snapshot saved to ${bootstrapDir}`);
  console.log(`Referenced uploads: ${referencedUploads.length}`);
  console.log(`Packaged uploads: ${finalUploads.length}`);
  console.log(`Deduplicated uploads: ${dedupedCount}`);
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
