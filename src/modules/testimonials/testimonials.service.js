import { HttpError } from '../../lib/httpError.js';
import { siteDataService } from '../site-data/siteData.service.js';
import { validatePublicTestimonial } from './testimonials.validation.js';

const SUBMISSION_THROTTLE_MS = 15000;
const submissionByIp = new Map();

const enforceSubmissionThrottle = (ipAddress) => {
  if (!ipAddress) return;

  const now = Date.now();
  const lastAttempt = submissionByIp.get(ipAddress) ?? 0;
  if (now - lastAttempt < SUBMISSION_THROTTLE_MS) {
    throw new HttpError(429, 'Please wait a few seconds before submitting another review.');
  }
  submissionByIp.set(ipAddress, now);
};

export const testimonialsService = {
  async createPublicTestimonial(payload, req) {
    const validated = validatePublicTestimonial(payload);
    enforceSubmissionThrottle(req.ip);
    return siteDataService.addPublicTestimonial(validated);
  }
};
