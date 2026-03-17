import { cloneDefaultSiteData } from './defaults.js';

const LEGACY_SITE_NAME_VALUES = new Set(['luxurious inferno', 'golden tulip shakereen hotel']);

export const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const normalizeName = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '');

const isLegacySiteName = (siteName) => {
  if (!isObject(siteName)) return false;
  const en = normalizeName(siteName.en);
  const ar = normalizeName(siteName.ar);
  return LEGACY_SITE_NAME_VALUES.has(en) || LEGACY_SITE_NAME_VALUES.has(ar);
};

export const deepMerge = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }
  if (!isObject(base)) {
    return override ?? base;
  }

  const output = { ...base };
  if (!isObject(override)) {
    return output;
  }

  Object.keys(override).forEach((key) => {
    output[key] = key in base ? deepMerge(base[key], override[key]) : override[key];
  });
  return output;
};

const ensureObjectArray = (value, fallback) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.filter(isObject);
  return cleaned.length ? cleaned : fallback;
};

const ensureTextArray = (value, fallback) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.filter((entry) => typeof entry === 'string' || isObject(entry));
  return cleaned.length ? cleaned : fallback;
};

const ensureRoomType = (roomType, fallback) => {
  const merged = deepMerge(fallback, isObject(roomType) ? roomType : {});
  merged.images = Array.isArray(merged.images) ? merged.images.filter((value) => typeof value === 'string' && value.trim()) : fallback.images;
  if (!merged.images.length) {
    merged.images = fallback.images;
  }
  merged.amenities = ensureTextArray(merged.amenities, fallback.amenities);
  merged.availability = ensureObjectArray(merged.availability, fallback.availability);
  merged.baseRate = Number.isFinite(Number(merged.baseRate)) ? Number(merged.baseRate) : fallback.baseRate;
  merged.occupancy = Number.isFinite(Number(merged.occupancy)) ? Number(merged.occupancy) : fallback.occupancy;
  return merged;
};

const ensureHotel = (hotel, fallback) => {
  const merged = deepMerge(fallback, isObject(hotel) ? hotel : {});
  merged.starRating = Math.min(5, Math.max(1, Number(merged.starRating) || fallback.starRating));
  merged.roomCount = Math.max(0, Number(merged.roomCount) || fallback.roomCount);
  merged.gallery = ensureObjectArray(merged.gallery, fallback.gallery).filter((image) => typeof image.src === 'string' && image.src.trim());
  if (!merged.gallery.length) {
    merged.gallery = fallback.gallery;
  }
  merged.amenityHighlights = ensureTextArray(merged.amenityHighlights, fallback.amenityHighlights);
  merged.reviews = ensureObjectArray(merged.reviews, fallback.reviews);
  merged.roomTypes = ensureObjectArray(merged.roomTypes, fallback.roomTypes).map((roomType, index) =>
    ensureRoomType(roomType, fallback.roomTypes[index] ?? fallback.roomTypes[0])
  );
  if (!merged.roomTypes.length) {
    merged.roomTypes = fallback.roomTypes;
  }
  return merged;
};

export const normalizeSiteData = (input) => {
  const defaults = cloneDefaultSiteData();
  const merged = deepMerge(defaults, isObject(input) ? input : {});

  if (!isObject(merged.siteName) || isLegacySiteName(merged.siteName)) {
    merged.siteName = defaults.siteName;
  }

  if (!isObject(merged.settings)) {
    merged.settings = defaults.settings;
  } else {
    merged.settings.theme = isObject(merged.settings.theme) ? { ...defaults.settings.theme, ...merged.settings.theme } : defaults.settings.theme;
    merged.settings.animation = isObject(merged.settings.animation)
      ? { ...defaults.settings.animation, ...merged.settings.animation }
      : defaults.settings.animation;
    if (!['en', 'ar'].includes(merged.settings.language)) {
      merged.settings.language = defaults.settings.language;
    }
  }

  merged.navLinks = ensureObjectArray(merged.navLinks, defaults.navLinks);
  merged.ctaButtons = ensureObjectArray(merged.ctaButtons, defaults.ctaButtons);
  merged.testimonials = ensureObjectArray(merged.testimonials, defaults.testimonials);
  merged.hotels = ensureObjectArray(merged.hotels, defaults.hotels).map((hotel, index) =>
    ensureHotel(hotel, defaults.hotels[index] ?? defaults.hotels[0])
  );
  if (!merged.hotels.length) {
    merged.hotels = defaults.hotels;
  }

  if (!isObject(merged.company)) {
    merged.company = defaults.company;
  } else {
    merged.company = deepMerge(defaults.company, merged.company);
    merged.company.values = ensureObjectArray(merged.company.values, defaults.company.values);
    merged.company.services = ensureObjectArray(merged.company.services, defaults.company.services);
    merged.company.whyChooseUs = ensureObjectArray(merged.company.whyChooseUs, defaults.company.whyChooseUs);
    merged.company.destinations = ensureObjectArray(merged.company.destinations, defaults.company.destinations);
    merged.company.stats = ensureObjectArray(merged.company.stats, defaults.company.stats);
  }

  if (!isObject(merged.pages)) {
    merged.pages = defaults.pages;
  } else {
    Object.keys(defaults.pages).forEach((key) => {
      if (!isObject(merged.pages[key])) {
        merged.pages[key] = defaults.pages[key];
        return;
      }
      merged.pages[key].hero = isObject(merged.pages[key].hero)
        ? { ...defaults.pages[key].hero, ...merged.pages[key].hero }
        : defaults.pages[key].hero;
    });
  }

  if (!isObject(merged.pageVisibility)) {
    merged.pageVisibility = defaults.pageVisibility;
  } else {
    Object.keys(defaults.pageVisibility).forEach((key) => {
      if (typeof merged.pageVisibility[key] !== 'boolean') {
        merged.pageVisibility[key] = defaults.pageVisibility[key];
      }
    });
  }

  if (!isObject(merged.seo)) {
    merged.seo = defaults.seo;
  } else {
    Object.keys(defaults.seo).forEach((key) => {
      merged.seo[key] = isObject(merged.seo[key]) ? { ...defaults.seo[key], ...merged.seo[key] } : defaults.seo[key];
    });
  }

  merged.contactInfo = isObject(merged.contactInfo) ? { ...defaults.contactInfo, ...merged.contactInfo } : defaults.contactInfo;
  merged.searchSettings = isObject(merged.searchSettings)
    ? { ...defaults.searchSettings, ...merged.searchSettings, cities: ensureObjectArray(merged.searchSettings.cities, defaults.searchSettings.cities) }
    : defaults.searchSettings;

  return merged;
};
