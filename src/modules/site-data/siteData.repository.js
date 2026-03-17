import crypto from 'node:crypto';
import path from 'node:path';
import { cloneDefaultSiteData } from '../../data/defaults.js';
import { normalizeSiteData } from '../../data/siteDataModel.js';
import { env } from '../../config/env.js';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFileStore.js';
import { queryPostgres } from '../../lib/postgres.js';

const SITE_DATA_FILE = path.join(env.dataDir, 'site-data.json');
const BOOTSTRAP_SITE_DATA_FILE = path.resolve(process.cwd(), 'bootstrap', 'site-data.json');
const IS_POSTGRES_DRIVER = env.dataStorageDriver === 'postgres';
const SITE_DATA_TABLE = 'app_site_data';

let postgresBootstrapPromise = null;

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

const buildDefaultPayload = () => {
  const payload = normalizeSiteData(cloneDefaultSiteData());
  payload.updatedAt = new Date().toISOString();
  return payload;
};

const loadBootstrapPayload = async () => {
  const payload = await readJsonFile(BOOTSTRAP_SITE_DATA_FILE);
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const normalized = normalizeSiteData(payload);
  normalized.updatedAt = payload.updatedAt || new Date().toISOString();
  return normalized;
};

const buildInitialPayload = async () => {
  const bootstrapPayload = await loadBootstrapPayload();
  if (bootstrapPayload) {
    return bootstrapPayload;
  }
  return buildDefaultPayload();
};

const ensureExistingPayload = async () => {
  const existing = await readJsonFile(SITE_DATA_FILE);

  if (!existing || typeof existing !== 'object') {
    const fallback = await buildInitialPayload();
    await writeJsonFile(SITE_DATA_FILE, fallback);
    return fallback;
  }

  const normalized = normalizeSiteData(existing);
  normalized.updatedAt = existing.updatedAt || new Date().toISOString();
  await writeJsonFile(SITE_DATA_FILE, normalized);
  return normalized;
};

const ensurePostgresTable = async () => {
  await queryPostgres(`
    CREATE TABLE IF NOT EXISTS ${SITE_DATA_TABLE} (
      id SMALLINT PRIMARY KEY CHECK (id = 1),
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

const ensurePostgresPayload = async () => {
  if (!postgresBootstrapPromise) {
    postgresBootstrapPromise = (async () => {
      await ensurePostgresTable();
      const existingResult = await queryPostgres(`SELECT payload FROM ${SITE_DATA_TABLE} WHERE id = 1 LIMIT 1;`);
      const existingPayload = normalizePostgresPayload(existingResult.rows?.[0]?.payload);
      if (!existingPayload || typeof existingPayload !== 'object') {
        const fallback = await buildInitialPayload();
        await queryPostgres(
          `
            INSERT INTO ${SITE_DATA_TABLE} (id, payload, updated_at)
            VALUES (1, $1::jsonb, NOW())
            ON CONFLICT (id) DO UPDATE
              SET payload = EXCLUDED.payload,
                  updated_at = EXCLUDED.updated_at;
          `,
          [JSON.stringify(fallback)]
        );
        return fallback;
      }

      const normalized = normalizeSiteData(existingPayload);
      normalized.updatedAt = existingPayload.updatedAt || new Date().toISOString();
      await queryPostgres(
        `
          UPDATE ${SITE_DATA_TABLE}
             SET payload = $1::jsonb,
                 updated_at = NOW()
           WHERE id = 1;
        `,
        [JSON.stringify(normalized)]
      );
      return normalized;
    })();
  }

  return postgresBootstrapPromise;
};

const getSiteDataFromPostgres = async () => {
  await ensurePostgresPayload();
  const result = await queryPostgres(`SELECT payload FROM ${SITE_DATA_TABLE} WHERE id = 1 LIMIT 1;`);
  const payload = normalizePostgresPayload(result.rows?.[0]?.payload);
  if (!payload || typeof payload !== 'object') {
    return ensurePostgresPayload();
  }
  const normalized = normalizeSiteData(payload);
  normalized.updatedAt = payload.updatedAt || new Date().toISOString();
  return normalized;
};

const saveSiteDataToPostgres = async (nextData) => {
  const normalized = normalizeSiteData(nextData);
  normalized.updatedAt = new Date().toISOString();
  await ensurePostgresPayload();
  await queryPostgres(
    `
      INSERT INTO ${SITE_DATA_TABLE} (id, payload, updated_at)
      VALUES (1, $1::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE
        SET payload = EXCLUDED.payload,
            updated_at = EXCLUDED.updated_at;
    `,
    [JSON.stringify(normalized)]
  );
  return normalized;
};

export const siteDataRepository = {
  async bootstrap() {
    if (IS_POSTGRES_DRIVER) {
      return ensurePostgresPayload();
    }
    return ensureExistingPayload();
  },

  async getSiteData() {
    if (IS_POSTGRES_DRIVER) {
      return getSiteDataFromPostgres();
    }
    const payload = await readJsonFile(SITE_DATA_FILE);
    if (!payload || typeof payload !== 'object') {
      return ensureExistingPayload();
    }
    const normalized = normalizeSiteData(payload);
    normalized.updatedAt = payload.updatedAt || new Date().toISOString();
    return normalized;
  },

  async saveSiteData(nextData) {
    if (IS_POSTGRES_DRIVER) {
      return saveSiteDataToPostgres(nextData);
    }
    const normalized = normalizeSiteData(nextData);
    normalized.updatedAt = new Date().toISOString();
    await writeJsonFile(SITE_DATA_FILE, normalized);
    return normalized;
  },

  async addPublicTestimonial(payload) {
    const current = await this.getSiteData();
    const now = new Date().toISOString();
    const testimonial = {
      id: `tm-public-${crypto.randomUUID()}`,
      hotelId: payload.hotelId || null,
      name: {
        en: payload.fullName,
        ar: payload.fullName
      },
      role: {
        en: 'Guest',
        ar: 'ضيف'
      },
      quote: {
        en: payload.comment,
        ar: payload.comment
      },
      rating: payload.rating,
      submittedAt: now
    };

    if (payload.hotelId) {
      const hotels = Array.isArray(current.hotels) ? current.hotels : [];
      const hotel = hotels.find((entry) => entry.id === payload.hotelId);
      if (hotel) {
        hotel.reviews = [testimonial, ...(Array.isArray(hotel.reviews) ? hotel.reviews : [])];
      } else {
        current.testimonials = [testimonial, ...(Array.isArray(current.testimonials) ? current.testimonials : [])];
      }
    } else {
      current.testimonials = [testimonial, ...(Array.isArray(current.testimonials) ? current.testimonials : [])];
    }
    current.updatedAt = now;

    if (IS_POSTGRES_DRIVER) {
      await saveSiteDataToPostgres(current);
    } else {
      await writeJsonFile(SITE_DATA_FILE, current);
    }
    return testimonial;
  },

  async resetSiteData() {
    const fallback = await buildInitialPayload();
    if (IS_POSTGRES_DRIVER) {
      await saveSiteDataToPostgres(fallback);
    } else {
      await writeJsonFile(SITE_DATA_FILE, fallback);
    }
    return fallback;
  }
};
