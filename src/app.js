import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { apiRouter } from './routes/api.routes.js';

const app = express();

const corsOptions = env.corsOrigins.length ? { origin: env.corsOrigins } : { origin: true };

app.use(cors(corsOptions));
app.use(express.json({ limit: env.bodyLimit }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

if (env.uploadsStorageDriver === 'local') {
  app.use('/uploads', express.static(env.uploadsDir));
}
app.use('/api', apiRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
