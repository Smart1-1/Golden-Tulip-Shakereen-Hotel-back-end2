import { HttpError } from '../../lib/httpError.js';
import { siteDataRepository } from './siteData.repository.js';

const ensurePayload = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Site data payload must be an object.');
  }
};

export const siteDataService = {
  async bootstrap() {
    return siteDataRepository.bootstrap();
  },

  async getSiteData() {
    return siteDataRepository.getSiteData();
  },

  async saveSiteData(payload) {
    ensurePayload(payload);
    return siteDataRepository.saveSiteData(payload);
  },

  async addPublicTestimonial(payload) {
    return siteDataRepository.addPublicTestimonial(payload);
  },

  async resetSiteData() {
    return siteDataRepository.resetSiteData();
  }
};
