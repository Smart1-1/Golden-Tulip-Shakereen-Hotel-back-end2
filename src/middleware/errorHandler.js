import { HttpError } from '../lib/httpError.js';

export const errorHandler = (error, req, res, _next) => {
  const multerStatusCode =
    error?.name === 'MulterError'
      ? error.code === 'LIMIT_FILE_SIZE'
        ? 413
        : 400
      : null;

  const statusCode =
    error instanceof HttpError
      ? error.statusCode
      : Number.isInteger(multerStatusCode)
      ? multerStatusCode
      : Number.isInteger(error?.statusCode)
      ? error.statusCode
      : 500;

  const message =
    error instanceof HttpError
      ? error.message
      : statusCode >= 500
      ? 'Internal server error.'
      : error?.message || 'Request failed.';

  if (statusCode >= 500) {
    console.error('[api:error]', error);
  }

  res.status(statusCode).json({
    error: {
      message
    }
  });
};
