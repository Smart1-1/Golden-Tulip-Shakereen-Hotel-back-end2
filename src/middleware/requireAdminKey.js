import { env } from '../config/env.js';
import { HttpError } from '../lib/httpError.js';

export const requireAdminKey = (req, res, next) => {
  if (!env.adminApiKey) {
    return next();
  }

  const provided = req.get('x-admin-key');
  if (provided && provided === env.adminApiKey) {
    return next();
  }

  throw new HttpError(401, 'Unauthorized.');
};
