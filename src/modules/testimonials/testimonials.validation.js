import { HttpError } from '../../lib/httpError.js';

const asText = (value) => (typeof value === 'string' ? value.trim() : '');

const requiredText = (value, field, min = 1, max = 500) => {
  const normalized = asText(value);
  if (normalized.length < min || normalized.length > max) {
    throw new HttpError(400, `Invalid ${field}.`);
  }
  return normalized;
};

const requiredRating = (value) => {
  const parsed = Number.parseInt(`${value}`, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) {
    throw new HttpError(400, 'Invalid rating.');
  }
  return parsed;
};

export const validatePublicTestimonial = (payload) => {
  const fullName = requiredText(payload?.fullName ?? payload?.name, 'fullName', 2, 90);
  const comment = requiredText(payload?.comment ?? payload?.quote, 'comment', 8, 1200);
  const rating = requiredRating(payload?.rating);

  return {
    fullName,
    comment,
    rating
  };
};
