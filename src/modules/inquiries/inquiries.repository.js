import crypto from 'node:crypto';
import path from 'node:path';
import { env } from '../../config/env.js';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFileStore.js';
import { queryPostgres } from '../../lib/postgres.js';

const CONTACT_REQUESTS_FILE = path.join(env.dataDir, 'contact-requests.json');
const BOOKING_REQUESTS_FILE = path.join(env.dataDir, 'booking-requests.json');
const IS_POSTGRES_DRIVER = env.dataStorageDriver === 'postgres';
const INQUIRIES_TABLE = 'app_inquiries';

let postgresBootstrapPromise = null;

const getFilePath = (type) => (type === 'contact' ? CONTACT_REQUESTS_FILE : BOOKING_REQUESTS_FILE);

const loadList = async (type) => {
  const filePath = getFilePath(type);
  const payload = await readJsonFile(filePath);

  if (!Array.isArray(payload)) {
    await writeJsonFile(filePath, []);
    return [];
  }

  return payload;
};

const saveList = async (type, list) => {
  await writeJsonFile(getFilePath(type), list);
};

const normalizePostgresPayload = (value) => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return typeof value === 'object' ? value : null;
};

const ensurePostgresTable = async () => {
  await queryPostgres(`
    CREATE TABLE IF NOT EXISTS ${INQUIRIES_TABLE} (
      id UUID PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('contact', 'booking')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      payload JSONB NOT NULL
    );
  `);
  await queryPostgres(`
    CREATE INDEX IF NOT EXISTS idx_${INQUIRIES_TABLE}_type_created_at
      ON ${INQUIRIES_TABLE} (type, created_at DESC);
  `);
};

const ensurePostgresReady = async () => {
  if (!postgresBootstrapPromise) {
    postgresBootstrapPromise = ensurePostgresTable();
  }
  return postgresBootstrapPromise;
};

export const inquiriesRepository = {
  async bootstrap() {
    if (IS_POSTGRES_DRIVER) {
      await ensurePostgresReady();
    } else {
      await Promise.all([loadList('contact'), loadList('booking')]);
    }
  },

  async create(type, payload) {
    const record = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...payload
    };

    if (IS_POSTGRES_DRIVER) {
      await ensurePostgresReady();
      await queryPostgres(
        `
          INSERT INTO ${INQUIRIES_TABLE} (id, type, created_at, payload)
          VALUES ($1, $2, $3::timestamptz, $4::jsonb);
        `,
        [record.id, type, record.createdAt, JSON.stringify(record)]
      );
      return record;
    }

    const list = await loadList(type);
    list.unshift(record);
    await saveList(type, list);
    return record;
  },

  async list(type, limit = 50) {
    const safeLimit = Math.max(1, Math.min(500, Number(limit) || 50));

    if (IS_POSTGRES_DRIVER) {
      await ensurePostgresReady();
      const result = await queryPostgres(
        `
          SELECT payload
            FROM ${INQUIRIES_TABLE}
           WHERE type = $1
           ORDER BY created_at DESC
           LIMIT $2;
        `,
        [type, safeLimit]
      );
      return result.rows
        .map((row) => normalizePostgresPayload(row.payload))
        .filter((entry) => entry && typeof entry === 'object');
    }

    const list = await loadList(type);
    return list.slice(0, safeLimit);
  }
};
