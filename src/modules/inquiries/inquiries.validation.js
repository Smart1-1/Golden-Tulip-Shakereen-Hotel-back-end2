import { HttpError } from '../../lib/httpError.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const asText = (value) => (typeof value === 'string' ? value.trim() : '');

const requiredText = (value, field, min = 1, max = 200) => {
  const normalized = asText(value);
  if (normalized.length < min || normalized.length > max) {
    throw new HttpError(400, `Invalid ${field}.`);
  }
  return normalized;
};

const optionalText = (value, max = 500) => {
  const normalized = asText(value);
  if (!normalized) return '';
  if (normalized.length > max) {
    throw new HttpError(400, 'One or more fields exceed the allowed length.');
  }
  return normalized;
};

const requiredEmail = (value) => {
  const normalized = asText(value).toLowerCase();
  if (!EMAIL_PATTERN.test(normalized)) {
    throw new HttpError(400, 'Invalid email address.');
  }
  return normalized;
};

const requiredDate = (value, field) => {
  const normalized = asText(value);
  if (!DATE_PATTERN.test(normalized) || Number.isNaN(Date.parse(`${normalized}T00:00:00Z`))) {
    throw new HttpError(400, `Invalid ${field}.`);
  }
  return normalized;
};

const boundedInt = (value, field, min, max) => {
  const parsed = Number.parseInt(`${value}`, 10);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new HttpError(400, `Invalid ${field}.`);
  }
  return parsed;
};

export const validateContactRequest = (payload) => {
  const fullName = requiredText(payload?.fullName, 'fullName', 2, 120);
  const email = requiredEmail(payload?.email);
  const topic = optionalText(payload?.topic, 160);
  const message = requiredText(payload?.message, 'message', 8, 4000);
  const phone = optionalText(payload?.phone, 60);

  return {
    fullName,
    email,
    phone,
    topic,
    message
  };
};

export const validateBookingRequest = (payload) => {
  const fullName = requiredText(payload?.fullName, 'fullName', 2, 120);
  const email = requiredEmail(payload?.email);
  const phone = optionalText(payload?.phone, 60);
  const checkIn = requiredDate(payload?.checkIn, 'checkIn');
  const checkOut = requiredDate(payload?.checkOut, 'checkOut');

  if (new Date(`${checkOut}T00:00:00Z`) <= new Date(`${checkIn}T00:00:00Z`)) {
    throw new HttpError(400, 'checkOut must be after checkIn.');
  }

  return {
    fullName,
    email,
    phone,
    checkIn,
    checkOut,
    adults: boundedInt(payload?.adults, 'adults', 1, 8),
    children: boundedInt(payload?.children, 'children', 0, 8),
    roomType: requiredText(payload?.roomType, 'roomType', 1, 120),
    notes: optionalText(payload?.notes, 4000)
  };
};
