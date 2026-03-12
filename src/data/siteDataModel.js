import { cloneDefaultSiteData } from './defaults.js';

const LEGACY_SITE_NAME_VALUES = new Set(['luxurious inferno']);

const normalizeName = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '');

const isLegacySiteName = (siteName) => {
  if (!isObject(siteName)) return false;
  const en = normalizeName(siteName.en);
  const ar = normalizeName(siteName.ar);
  return LEGACY_SITE_NAME_VALUES.has(en) || LEGACY_SITE_NAME_VALUES.has(ar);
};

export const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

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

export const normalizeSiteData = (input) => {
  const defaults = cloneDefaultSiteData();
  const merged = deepMerge(defaults, isObject(input) ? input : {});

  if (!isObject(merged.siteName) || isLegacySiteName(merged.siteName)) {
    merged.siteName = defaults.siteName;
  }

  if (!isObject(merged.settings)) {
    merged.settings = defaults.settings;
  } else {
    merged.settings.theme = isObject(merged.settings.theme)
      ? { ...defaults.settings.theme, ...merged.settings.theme }
      : defaults.settings.theme;
    merged.settings.animation = isObject(merged.settings.animation)
      ? { ...defaults.settings.animation, ...merged.settings.animation }
      : defaults.settings.animation;
    if (!['en', 'ar'].includes(merged.settings.language)) {
      merged.settings.language = defaults.settings.language;
    }
  }

  merged.navLinks = ensureObjectArray(merged.navLinks, defaults.navLinks);
  merged.ctaButtons = ensureObjectArray(merged.ctaButtons, defaults.ctaButtons);
  merged.offers = ensureObjectArray(merged.offers, defaults.offers);
  merged.testimonials = ensureObjectArray(merged.testimonials, defaults.testimonials);
  merged.faq = ensureObjectArray(merged.faq, defaults.faq);
  merged.blog = ensureObjectArray(merged.blog, defaults.blog);
  merged.gallery = ensureObjectArray(merged.gallery, defaults.gallery).filter(
    (image) => typeof image.src === 'string' && image.src.trim().length > 0
  );
  if (!merged.gallery.length) {
    merged.gallery = defaults.gallery;
  }

  if (!isObject(merged.priceTables)) {
    merged.priceTables = defaults.priceTables;
  } else {
    Object.keys(defaults.priceTables).forEach((key) => {
      merged.priceTables[key] = ensureObjectArray(merged.priceTables[key], defaults.priceTables[key]);
    });
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
      if (!Array.isArray(merged.pages[key].sections)) {
        merged.pages[key].sections = defaults.pages[key].sections;
      }
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
      if (!isObject(merged.seo[key])) {
        merged.seo[key] = defaults.seo[key];
      }
    });
  }

  return merged;
};
