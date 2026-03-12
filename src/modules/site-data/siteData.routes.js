import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { requireAdminKey } from '../../middleware/requireAdminKey.js';
import { siteDataService } from './siteData.service.js';

const siteDataRouter = Router();

siteDataRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const data = await siteDataService.getSiteData();
    res.json({ data });
  })
);

siteDataRouter.put(
  '/',
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const payload = req.body?.data && typeof req.body.data === 'object' ? req.body.data : req.body;
    const data = await siteDataService.saveSiteData(payload);
    res.json({
      message: 'Site data updated successfully.',
      data
    });
  })
);

siteDataRouter.post(
  '/reset',
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const data = await siteDataService.resetSiteData();
    res.json({
      message: 'Site data reset to defaults.',
      data
    });
  })
);

export { siteDataRouter };
