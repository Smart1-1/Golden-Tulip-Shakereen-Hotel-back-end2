import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { requireAdminKey } from '../../middleware/requireAdminKey.js';
import { adminAuthService } from './adminAuth.service.js';

const adminAuthRouter = Router();

adminAuthRouter.get(
  '/status',
  asyncHandler(async (req, res) => {
    const data = await adminAuthService.getStatus(req);
    res.json({ data });
  })
);

adminAuthRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const data = await adminAuthService.login(req.body, res);
    res.json({
      message: 'Admin login successful.',
      data
    });
  })
);

adminAuthRouter.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const data = await adminAuthService.logout(req, res);
    res.json({
      message: 'Admin logout successful.',
      data
    });
  })
);

adminAuthRouter.put(
  '/credentials',
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const data = await adminAuthService.updateCredentials(req, req.body);
    res.json({
      message: 'Admin credentials updated successfully.',
      data
    });
  })
);

export { adminAuthRouter };
