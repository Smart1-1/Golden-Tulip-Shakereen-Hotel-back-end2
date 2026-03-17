import { env } from '../config/env.js';
import { HttpError } from '../lib/httpError.js';
import { adminAuthService } from '../modules/admin-auth/adminAuth.service.js';

export const requireAdminKey = (req, res, next) => {
  if (adminAuthService.isAuthenticatedRequest(req)) {
    return next();
  }

  if (!env.adminApiKey) {
    throw new HttpError(401, 'Unauthorized.');
  }

  const provided = req.get('x-admin-key');
  if (provided && provided === env.adminApiKey) {
    return next();
  }

  throw new HttpError(401, 'Unauthorized.');
};
