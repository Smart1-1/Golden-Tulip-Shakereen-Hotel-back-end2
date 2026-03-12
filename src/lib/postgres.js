import { env } from '../config/env.js';

let cachedPoolPromise = null;

const loadPgModule = async () => {
  try {
    return await import('pg');
  } catch (error) {
    const hint = 'PostgreSQL storage requires the `pg` package. Install it with `npm install pg`.';
    const wrapped = new Error(hint);
    wrapped.cause = error;
    throw wrapped;
  }
};

export const getPostgresPool = async () => {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is required when DATA_STORAGE_DRIVER=postgres.');
  }

  if (!cachedPoolPromise) {
    cachedPoolPromise = (async () => {
      const { Pool } = await loadPgModule();
      const pool = new Pool({
        connectionString: env.databaseUrl,
        ssl: env.pgSsl ? { rejectUnauthorized: false } : undefined
      });
      return pool;
    })();
  }

  return cachedPoolPromise;
};

export const queryPostgres = async (text, values = []) => {
  const pool = await getPostgresPool();
  return pool.query(text, values);
};
