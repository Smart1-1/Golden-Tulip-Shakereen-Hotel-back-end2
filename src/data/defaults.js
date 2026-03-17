import { BASE_THEME_COLORS } from './themePresets.js';
import { companyContent, pageSeeds, t } from './companySeed.js';
import { brandTestimonialsSeed, hotelSeedData } from './hotelsSeed.js';

export const PAGE_KEYS = ['home', 'hotels', 'destinations', 'services', 'about', 'whyChooseUs', 'contact'];

export const PAGE_ROUTES = {
  home: '/',
  hotels: '/hotels',
  destinations: '/destinations',
  services: '/services',
  about: '/about',
  whyChooseUs: '/why-us',
  contact: '/contact',
  search: '/search',
  admin: '/admin'
};

export const HOTEL_CITIES = ['makkah', 'madinah'];
export const GALLERY_CATEGORIES = ['exterior', 'lobby', 'rooms', 'suites', 'amenities'];
export const LANGUAGES = ['en', 'ar'];
export const ADMIN_TABS = ['branding', 'company', 'hotels', 'availability', 'reviews', 'navigation', 'theme', 'animation', 'data'];

const navLinks = [
  { id: 'nav-home', pageKey: 'home', path: '/', label: t('Home', 'الرئيسية'), visible: true, order: 1 },
  { id: 'nav-hotels', pageKey: 'hotels', path: '/hotels', label: t('Hotels', 'فنادقنا'), visible: true, order: 2 },
  { id: 'nav-destinations', pageKey: 'destinations', path: '/destinations', label: t('Destinations', 'الوجهات'), visible: true, order: 3 },
  { id: 'nav-services', pageKey: 'services', path: '/services', label: t('Services', 'خدماتنا'), visible: true, order: 4 },
  { id: 'nav-about', pageKey: 'about', path: '/about', label: t('About', 'عن الشركة'), visible: true, order: 5 },
  { id: 'nav-why', pageKey: 'whyChooseUs', path: '/why-us', label: t('Why Us', 'لماذا نحن'), visible: true, order: 6 },
  { id: 'nav-contact', pageKey: 'contact', path: '/contact', label: t('Contact', 'تواصل معنا'), visible: true, order: 7 }
];

const ctaButtons = [{ id: 'cta-search', text: t('Book Now', 'احجز الآن'), path: '/search', visible: true, style: 'primary' }];

const pageVisibility = {
  home: true,
  hotels: true,
  destinations: true,
  services: true,
  about: true,
  whyChooseUs: true,
  contact: true
};

const seo = {
  home: {
    title: t('Diyar Al Diwaniyah | Hotel Management in Makkah & Madinah', 'شركة ديار الديوانية | إدارة وتشغيل فنادق في مكة والمدينة'),
    description: t('Discover a multi-hotel hospitality company with managed properties in Makkah and Madinah, date-based search, and hotel detail pages.', 'اكتشف شركة ضيافة متعددة الفنادق مع منشآت مُدارة في مكة والمدينة وبحث حسب التواريخ وصفحات تفصيلية لكل فندق.'),
    keywords: 'diyar al diwaniyah, hotel management, makkah hotels, madinah hotels'
  },
  hotels: { title: t('Our Hotels | Diyar Al Diwaniyah', 'فنادقنا | شركة ديار الديوانية'), description: t('Browse all managed hotels in Makkah and Madinah.', 'تصفح جميع الفنادق تحت إدارتنا في مكة والمدينة.'), keywords: 'managed hotels, makkah, madinah' },
  destinations: { title: t('Destinations | Diyar Al Diwaniyah', 'الوجهات | شركة ديار الديوانية'), description: t('Explore hotels by destination in Makkah and Madinah.', 'استعرض الفنادق حسب الوجهة في مكة والمدينة.'), keywords: 'makkah hotels, madinah hotels, destinations' },
  services: { title: t('Services | Diyar Al Diwaniyah', 'خدماتنا | شركة ديار الديوانية'), description: t('Integrated hotel management and operations services.', 'خدمات متكاملة في إدارة وتشغيل الفنادق.'), keywords: 'hotel operations, hotel revenue, hotel management' },
  about: { title: t('About Us | Diyar Al Diwaniyah', 'عن الشركة | شركة ديار الديوانية'), description: t('Learn more about our hospitality company, vision, and values.', 'تعرف على شركتنا ورؤيتنا وقيمنا في مجال الضيافة.'), keywords: 'about diyar al diwaniyah, hospitality company' },
  whyChooseUs: { title: t('Why Choose Us | Diyar Al Diwaniyah', 'لماذا نحن | شركة ديار الديوانية'), description: t('See what makes Diyar Al Diwaniyah a strong hotel management partner.', 'اكتشف ما يجعل شركة ديار الديوانية شريكاً قوياً في إدارة الفنادق.'), keywords: 'why choose us, hotel management expertise' },
  contact: { title: t('Contact | Diyar Al Diwaniyah', 'تواصل معنا | شركة ديار الديوانية'), description: t('Contact our team for reservations and hotel management partnerships.', 'تواصل مع فريقنا للحجوزات وشراكات الإدارة الفندقية.'), keywords: 'contact, reservations, hotel partnerships' },
  search: { title: t('Search Hotels | Diyar Al Diwaniyah', 'ابحث عن الفنادق | شركة ديار الديوانية'), description: t('Search available hotels by city, dates, and guests.', 'ابحث عن الفنادق المتاحة حسب المدينة والتواريخ وعدد الضيوف.'), keywords: 'hotel availability, search hotels, dates' }
};

const contactInfo = {
  phones: ['+966 14 800 4400', '+966 12 800 1140'],
  emails: ['reservations@diyardiwaniyah.com', 'partnerships@diyardiwaniyah.com'],
  address: t('Saudi Arabia - Makkah & Al Madinah', 'المملكة العربية السعودية - مكة المكرمة والمدينة المنورة'),
  mapUrl: 'https://maps.google.com'
};

const searchSettings = {
  defaultCity: 'all',
  defaultCheckIn: '2026-04-10',
  defaultCheckOut: '2026-04-13',
  defaultGuests: 2,
  cities: [
    { id: 'all', label: t('All Cities', 'كل المدن') },
    { id: 'makkah', label: t('Makkah Al Mukarramah', 'مكة المكرمة') },
    { id: 'madinah', label: t('Al Madinah Al Munawwarah', 'المدينة المنورة') }
  ]
};

export const DEFAULT_SITE_DATA = {
  siteName: t('Diyar Al Diwaniyah', 'شركة ديار الديوانية'),
  siteTagline: t('Hotel Management & Operations', 'لإدارة وتشغيل الفنادق'),
  updatedAt: '2026-03-16T00:00:00.000Z',
  settings: {
    language: 'ar',
    theme: { ...BASE_THEME_COLORS },
    animation: {
      enabled: true,
      intensity: 0.86,
      pageTransitions: true,
      parallax: true,
      reveal: true
    }
  },
  navLinks,
  ctaButtons,
  pageVisibility,
  seo,
  pages: pageSeeds,
  company: companyContent,
  hotels: hotelSeedData,
  testimonials: brandTestimonialsSeed,
  contactInfo,
  searchSettings
};

export const cloneDefaultSiteData = () => JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
