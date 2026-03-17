import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { apiRouter } from './routes/api.routes.js';

const app = express();

const DEFAULT_ALLOWED_METHODS = 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
const DEFAULT_ALLOWED_HEADERS = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-admin-key';

app.use((req, res, next) => {
  const requestOrigin = req.get('origin');
  const requestedHeaders = req.get('access-control-request-headers');

  if (requestOrigin) {
    // Reflect the exact caller origin so credentials work on any frontend port.
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.append('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  res.setHeader('Access-Control-Allow-Headers', requestedHeaders || DEFAULT_ALLOWED_HEADERS);
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json({ limit: env.bodyLimit }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// Always serve packaged and runtime uploads from the backend filesystem.
app.use('/uploads', express.static(env.uploadsDir));
app.use('/api', apiRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
