import app from './app.js';
import { env } from './config/env.js';
import { adminAuthService } from './modules/admin-auth/adminAuth.service.js';
import { inquiriesService } from './modules/inquiries/inquiries.service.js';
import { siteDataService } from './modules/site-data/siteData.service.js';
import { uploadsService } from './modules/uploads/uploads.service.js';

const start = async () => {
  await uploadsService.bootstrap();
  await adminAuthService.bootstrap();
  await siteDataService.bootstrap();
  await inquiriesService.bootstrap();

  app.listen(env.port, () => {
    console.log(`[api] listening on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error('[api] failed to start', error);
  process.exit(1);
});
