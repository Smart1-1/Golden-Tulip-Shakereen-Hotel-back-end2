import { Router } from 'express';
import { inquiriesRouter } from '../modules/inquiries/inquiries.routes.js';
import { siteDataRouter } from '../modules/site-data/siteData.routes.js';
import { testimonialsRouter } from '../modules/testimonials/testimonials.routes.js';
import { uploadsRouter } from '../modules/uploads/uploads.routes.js';

const apiRouter = Router();

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'shakereen-inferno-api',
    timestamp: new Date().toISOString()
  });
});

apiRouter.use('/site-data', siteDataRouter);
apiRouter.use('/uploads', uploadsRouter);
apiRouter.use('/testimonials', testimonialsRouter);
apiRouter.use('/', inquiriesRouter);

export { apiRouter };
