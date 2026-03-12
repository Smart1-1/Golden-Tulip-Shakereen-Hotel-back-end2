import app from './app.js';
import { env } from './config/env.js';
import { inquiriesService } from './modules/inquiries/inquiries.service.js';
import { siteDataService } from './modules/site-data/siteData.service.js';

const start = async () => {
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
