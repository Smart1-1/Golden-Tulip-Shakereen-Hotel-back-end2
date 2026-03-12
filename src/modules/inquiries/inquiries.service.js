import { inquiriesRepository } from './inquiries.repository.js';
import { validateBookingRequest, validateContactRequest } from './inquiries.validation.js';

const getMetaFromRequest = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') ?? ''
});

export const inquiriesService = {
  async bootstrap() {
    await inquiriesRepository.bootstrap?.();
  },

  async createContactRequest(payload, req) {
    const validated = validateContactRequest(payload);
    return inquiriesRepository.create('contact', {
      ...validated,
      ...getMetaFromRequest(req)
    });
  },

  async createBookingRequest(payload, req) {
    const validated = validateBookingRequest(payload);
    return inquiriesRepository.create('booking', {
      ...validated,
      ...getMetaFromRequest(req)
    });
  },

  async listContactRequests(limit) {
    return inquiriesRepository.list('contact', limit);
  },

  async listBookingRequests(limit) {
    return inquiriesRepository.list('booking', limit);
  }
};
