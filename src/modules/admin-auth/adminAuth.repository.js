import crypto from 'node:crypto';
import path from 'node:path';
import { env } from '../../config/env.js';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFileStore.js';

const ADMIN_AUTH_FILE = path.join(env.dataDir, 'admin-auth.json');

const hashPassword = (password, salt) => crypto.scryptSync(password, salt, 64).toString('hex');

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

const buildDefaultCredentials = () => {
  const salt = crypto.randomBytes(16).toString('hex');
  const username = normalizeText(env.adminUsername) || 'admin';
  const password = normalizeText(env.adminPassword) || 'admin123456';

  return {
    username,
    passwordSalt: salt,
    passwordHash: hashPassword(password, salt),
    updatedAt: new Date().toISOString()
  };
};

const normalizeStoredCredentials = (input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return null;
  }

  const username = normalizeText(input.username);
  const passwordSalt = normalizeText(input.passwordSalt);
  const passwordHash = normalizeText(input.passwordHash);

  if (!username || !passwordSalt || !passwordHash) {
    return null;
  }

  return {
    username,
    passwordSalt,
    passwordHash,
    updatedAt: normalizeText(input.updatedAt) || new Date().toISOString()
  };
};

const ensureStoredCredentials = async () => {
  const existing = await readJsonFile(ADMIN_AUTH_FILE);
  const normalized = normalizeStoredCredentials(existing);

  if (normalized) {
    await writeJsonFile(ADMIN_AUTH_FILE, normalized);
    return normalized;
  }

  const fallback = buildDefaultCredentials();
  await writeJsonFile(ADMIN_AUTH_FILE, fallback);
  return fallback;
};

export const adminAuthRepository = {
  async bootstrap() {
    return ensureStoredCredentials();
  },

  async getCredentials() {
    const existing = await readJsonFile(ADMIN_AUTH_FILE);
    const normalized = normalizeStoredCredentials(existing);
    if (normalized) {
      return normalized;
    }
    return ensureStoredCredentials();
  },

  async saveCredentials(nextCredentials) {
    const payload = {
      ...nextCredentials,
      updatedAt: new Date().toISOString()
    };
    await writeJsonFile(ADMIN_AUTH_FILE, payload);
    return payload;
  },

  hashPassword
};
