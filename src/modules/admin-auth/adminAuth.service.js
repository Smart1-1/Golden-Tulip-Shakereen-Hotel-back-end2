import crypto from 'node:crypto';
import { env } from '../../config/env.js';
import { HttpError } from '../../lib/httpError.js';
import { adminAuthRepository } from './adminAuth.repository.js';

const SESSION_COOKIE_NAME = 'shk_admin_session';
const SESSION_TTL_MS = env.adminSessionTtlHours * 60 * 60 * 1000;

const sessions = new Map();

const asText = (value) => (typeof value === 'string' ? value.trim() : '');

const parseCookies = (cookieHeader) => {
  const output = {};
  if (!cookieHeader) return output;

  cookieHeader.split(';').forEach((chunk) => {
    const separator = chunk.indexOf('=');
    if (separator === -1) return;
    const key = chunk.slice(0, separator).trim();
    const value = chunk.slice(separator + 1).trim();
    if (!key) return;
    output[key] = decodeURIComponent(value);
  });

  return output;
};

const serializeCookie = (name, value, options = {}) => {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge === 0) {
    parts.push('Max-Age=0');
    parts.push('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  } else if (Number.isFinite(options.maxAge)) {
    parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`);
  }

  parts.push(`Path=${options.path || '/'}`);
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);

  if (options.httpOnly !== false) {
    parts.push('HttpOnly');
  }
  if (options.secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
};

const cleanupExpiredSessions = () => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (!session || session.expiresAt <= now) {
      sessions.delete(token);
    }
  }
};

const getSessionToken = (req) => {
  const cookies = parseCookies(req.get('cookie') ?? '');
  return asText(cookies[SESSION_COOKIE_NAME]);
};

const getActiveSession = (req) => {
  cleanupExpiredSessions();
  const token = getSessionToken(req);
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, ...session };
};

const isValidAdminKey = (req) => {
  if (!env.adminApiKey) return false;
  const provided = req.get('x-admin-key');
  return Boolean(provided && provided === env.adminApiKey);
};

const setSessionCookie = (res, token, maxAgeMs) => {
  const secure = env.nodeEnv === 'production';
  res.setHeader(
    'Set-Cookie',
    serializeCookie(SESSION_COOKIE_NAME, token, {
      maxAge: Math.floor(maxAgeMs / 1000),
      secure
    })
  );
};

const clearSessionCookie = (res) => {
  const secure = env.nodeEnv === 'production';
  res.setHeader(
    'Set-Cookie',
    serializeCookie(SESSION_COOKIE_NAME, '', {
      maxAge: 0,
      secure
    })
  );
};

const validateUsername = (value) => {
  const username = asText(value);
  if (username.length < 3 || username.length > 60) {
    throw new HttpError(400, 'Invalid username.');
  }
  return username;
};

const validatePassword = (value, field = 'password') => {
  const password = asText(value);
  if (password.length < 8 || password.length > 120) {
    throw new HttpError(400, `Invalid ${field}.`);
  }
  return password;
};

export const adminAuthService = {
  async bootstrap() {
    return adminAuthRepository.bootstrap();
  },

  async getStatus(req) {
    if (isValidAdminKey(req)) {
      return {
        authenticated: true,
        username: 'api-key-admin',
        mode: 'api-key'
      };
    }

    const session = getActiveSession(req);
    if (!session) {
      return {
        authenticated: false,
        username: '',
        mode: 'guest'
      };
    }

    return {
      authenticated: true,
      username: session.username,
      mode: 'session'
    };
  },

  async login(payload, res) {
    const username = validateUsername(payload?.username);
    const password = validatePassword(payload?.password);
    const stored = await adminAuthRepository.getCredentials();

    const passwordHash = adminAuthRepository.hashPassword(password, stored.passwordSalt);
    if (stored.username !== username || stored.passwordHash !== passwordHash) {
      throw new HttpError(401, 'Invalid username or password.');
    }

    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, {
      username: stored.username,
      expiresAt: Date.now() + SESSION_TTL_MS
    });
    setSessionCookie(res, token, SESSION_TTL_MS);

    return {
      authenticated: true,
      username: stored.username
    };
  },

  async logout(req, res) {
    const session = getActiveSession(req);
    if (session?.token) {
      sessions.delete(session.token);
    }
    clearSessionCookie(res);

    return {
      authenticated: false,
      username: ''
    };
  },

  async updateCredentials(req, payload) {
    const stored = await adminAuthRepository.getCredentials();
    const currentPassword = validatePassword(payload?.currentPassword, 'currentPassword');
    const currentHash = adminAuthRepository.hashPassword(currentPassword, stored.passwordSalt);

    if (currentHash !== stored.passwordHash) {
      throw new HttpError(401, 'Current password is incorrect.');
    }

    const nextUsername = payload?.username ? validateUsername(payload.username) : stored.username;
    const nextPassword = asText(payload?.newPassword);

    const nextCredentials = {
      ...stored,
      username: nextUsername
    };

    if (nextPassword) {
      const validPassword = validatePassword(nextPassword, 'newPassword');
      const nextSalt = crypto.randomBytes(16).toString('hex');
      nextCredentials.passwordSalt = nextSalt;
      nextCredentials.passwordHash = adminAuthRepository.hashPassword(validPassword, nextSalt);
    }

    await adminAuthRepository.saveCredentials(nextCredentials);

    const session = getActiveSession(req);
    if (session?.token) {
      sessions.set(session.token, {
        username: nextUsername,
        expiresAt: Date.now() + SESSION_TTL_MS
      });
    }

    return {
      username: nextUsername
    };
  },

  isAuthenticatedRequest(req) {
    if (isValidAdminKey(req)) {
      return true;
    }
    return Boolean(getActiveSession(req));
  }
};
