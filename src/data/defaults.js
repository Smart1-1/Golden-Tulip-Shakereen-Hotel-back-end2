import { BASE_THEME_COLORS } from './themePresets.js';

export const PAGE_KEYS = [
  'home',
  'rooms',
  'suites',
  'gallery',
  'offers',
  'dining',
  'experiences',
  'about',
  'blog',
  'contact',
  'booking',
  'faq'
];

export const PAGE_ROUTES = {
  home: '/',
  rooms: '/rooms',
  suites: '/suites',
  gallery: '/gallery',
  offers: '/offers',
  dining: '/dining',
  experiences: '/experiences',
  about: '/about',
  blog: '/blog',
  contact: '/contact',
  booking: '/booking',
  faq: '/faq',
  admin: '/admin'
};

export const GALLERY_CATEGORIES = ['rooms', 'suites', 'dining', 'exterior', 'amenities'];
export const FAQ_CATEGORIES = ['booking', 'rooms', 'dining', 'amenities', 'transport', 'policies'];
export const LANGUAGES = ['en', 'ar'];
export const ADMIN_TABS = [
  'content',
  'images',
  'pages',
  'navigation',
  'faq',
  'testimonials',
  'offers',
  'blog',
  'seo',
  'theme',
  'animation',
  'data'
];

const t = (en, ar) => ({ en, ar });

const categoryLabel = {
  rooms: t('Rooms', 'الغرف'),
  suites: t('Suites', 'الأجنحة'),
  dining: t('Dining', 'المطاعم'),
  exterior: t('Exterior', 'الواجهة الخارجية'),
  amenities: t('Amenities', 'الخدمات')
};

const createGallery = () => {
  const counts = { rooms: 12, suites: 12, dining: 12, exterior: 12, amenities: 12 };
  const gallery = [];
  Object.entries(counts).forEach(([category, count]) => {
    for (let i = 1; i <= count; i += 1) {
      const n = i.toString().padStart(2, '0');
      const seed = `lux-inferno-${category}-${n}`;
      gallery.push({
        id: `${category}-${n}`,
        category,
        src: `https://picsum.photos/seed/${seed}/2000/1300`,
        thumb: `https://picsum.photos/seed/${seed}/900/620`,
        title: t(`${categoryLabel[category].en} Frame ${n}`, `لقطة ${n} من ${categoryLabel[category].ar}`),
        description: t(
          `Cinematic ${categoryLabel[category].en.toLowerCase()} shot with copper highlights and controlled contrast.`,
          `لقطة سينمائية لفئة ${categoryLabel[category].ar} مع إبراز نحاسي وتباين مضبوط.`
        ),
        alt: t(
          `Luxurious inferno ${category} scene ${n}`,
          `مشهد ${n} من فئة ${categoryLabel[category].ar} بطابع إنفيرنو`
        )
      });
    }
  });
  return gallery;
};

const heroImages = {
  home: 'https://picsum.photos/seed/inferno-home-hero/2200/1200',
  rooms: 'https://picsum.photos/seed/inferno-rooms-hero/2200/1200',
  suites: 'https://picsum.photos/seed/inferno-suites-hero/2200/1200',
  gallery: 'https://picsum.photos/seed/inferno-gallery-hero/2200/1200',
  offers: 'https://picsum.photos/seed/inferno-offers-hero/2200/1200',
  dining: 'https://picsum.photos/seed/inferno-dining-hero/2200/1200',
  experiences: 'https://picsum.photos/seed/inferno-experiences-hero/2200/1200',
  about: 'https://picsum.photos/seed/inferno-about-hero/2200/1200',
  blog: 'https://picsum.photos/seed/inferno-blog-hero/2200/1200',
  contact: 'https://picsum.photos/seed/inferno-contact-hero/2200/1200',
  booking: 'https://picsum.photos/seed/inferno-booking-hero/2200/1200',
  faq: 'https://picsum.photos/seed/inferno-faq-hero/2200/1200'
};

const makePage = (key, enTitle, arTitle, enSub, arSub, enDesc, arDesc, sections) => ({
  hero: {
    kicker: t('Luxurious Inferno', 'الجحيم الفاخر'),
    title: t(enTitle, arTitle),
    subtitle: t(enSub, arSub),
    description: t(enDesc, arDesc),
    image: heroImages[key]
  },
  sections
});

const baseSections = (topicEn, topicAr) => [
  {
    id: `${topicEn}-a`,
    title: t('Design Perspective', 'منظور التصميم'),
    body: t(
      `The ${topicEn} narrative merges cinematic mood with practical hospitality standards, balancing spectacle with daily comfort and intuitive use.`,
      `سرد ${topicAr} يمزج بين المزاج السينمائي ومعايير الضيافة العملية، ليوازن بين المشهدية والراحة اليومية وسهولة الاستخدام.`
    )
  },
  {
    id: `${topicEn}-b`,
    title: t('Operational Precision', 'دقة التشغيل'),
    body: t(
      `Service touchpoints are mapped with clear timing and accountable ownership, so guests feel fluid continuity from arrival to departure.`,
      `نقاط الخدمة موزعة بتوقيت واضح ومسؤوليات محددة، ليشعر الضيف بانسيابية مستمرة من الوصول حتى المغادرة.`
    )
  },
  {
    id: `${topicEn}-c`,
    title: t('Material & Light', 'المواد والضوء'),
    body: t(
      `Charcoal textures, deep red layers, and copper highlights create a controlled heat signature across every scene.`,
      `القوامات الفحمية والطبقات الحمراء العميقة والإضاءات النحاسية تصنع بصمة حرارية منضبطة في كل مشهد.`
    )
  }
];

const pages = {
  home: {
    hero: {
      kicker: t('Luxurious Inferno', 'الجحيم الفاخر'),
      title: t('Where Fire Meets Glass in Absolute Silence', 'حيث يلتقي اللهيب بالزجاج في صمت مطلق'),
      subtitle: t(
        'A cinematic retreat shaped by ember light, copper details, and precise hospitality.',
        'ملاذ سينمائي تصوغه أضواء الجمر وتفاصيل النحاس وضيافة دقيقة.'
      ),
      description: t(
        'This destination is engineered as an emotional sequence. Every corridor, lounge, and room is calibrated to carry a signature rhythm of contrast, warmth, and controlled drama.',
        'هذه الوجهة مصممة كتسلسل شعوري. كل ممر وصالة وغرفة مضبوطة لتحمل إيقاعًا مميزًا من التباين والدفء والدراما المنضبطة.'
      ),
      image: heroImages.home,
      primaryCta: t('Start Booking', 'ابدأ الحجز'),
      secondaryCta: t('Explore Suites', 'استكشف الأجنحة')
    },
    sections: baseSections('home', 'الرئيسية'),
    highlights: [
      {
        id: 'h-1',
        title: t('Private Ember Lounges', 'صالات جمر خاصة'),
        text: t(
          'Quiet acoustic lounges with copper bars and custom evening playlists.',
          'صالات هادئة بعزل صوتي وبارات نحاسية وقوائم موسيقية ليلية مخصصة.'
        )
      },
      {
        id: 'h-2',
        title: t('Night Concierge', 'كونسيرج ليلي'),
        text: t(
          'Round-the-clock concierge orchestration for transport, dining, and logistics.',
          'تنسيق كونسيرج على مدار الساعة للنقل والطعام واللوجستيات.'
        )
      },
      {
        id: 'h-3',
        title: t('Wellness Labs', 'مختبرات العافية'),
        text: t(
          'Recovery suites, breathing sessions, and precision wellness planning.',
          'أجنحة تعافٍ، جلسات تنفس، وتخطيط عافية دقيق.'
        )
      }
    ],
    stats: [
      { id: 's1', label: t('Luxury Units', 'وحدات فاخرة'), value: '186' },
      { id: 's2', label: t('Dining Concepts', 'مفاهيم مطاعم'), value: '7' },
      { id: 's3', label: t('Signature Events', 'فعاليات مميزة'), value: '42' },
      { id: 's4', label: t('Guest Satisfaction', 'رضا الضيوف'), value: '98%' }
    ]
  },
  rooms: makePage(
    'rooms',
    'Calibrated Comfort in Ember Tones',
    'راحة مضبوطة بدرجات الجمر',
    'Discover standard, deluxe, and panoramic room lines.',
    'اكتشف خطوط الغرف القياسية والديلوكس والبانورامية.',
    'Room architecture emphasizes flow, privacy, and precise climate-light control.',
    'تركز هندسة الغرف على الانسيابية والخصوصية والتحكم الدقيق بالمناخ والضوء.',
    baseSections('rooms', 'الغرف')
  ),
  suites: makePage(
    'suites',
    'Statement Suites for Extended Stays',
    'أجنحة لافتة للإقامات الطويلة',
    'Layered living zones with skyline terraces and private hosting capability.',
    'مساحات معيشية متعددة الطبقات مع تراسات بإطلالات وقدرة استضافة خاصة.',
    'Suites combine intimacy and occasion with tailored concierge workflows.',
    'الأجنحة تجمع الخصوصية والمشهدية مع إجراءات كونسيرج مخصصة.',
    baseSections('suites', 'الأجنحة')
  ),
  gallery: makePage(
    'gallery',
    'A Fire & Glass Gallery',
    'معرض النار والزجاج',
    'A large visual archive across rooms, dining, exterior, and amenities.',
    'أرشيف بصري كبير عبر الغرف والمطاعم والواجهات والخدمات.',
    'Filter and inspect every image in immersive full-screen lightbox mode.',
    'قم بتصفية الصور ومعاينة كل لقطة بوضع عرض كامل غامر.',
    baseSections('gallery', 'المعرض')
  ),
  offers: makePage(
    'offers',
    'Curated Packages with High Value',
    'باقات منتقاة بقيمة عالية',
    'Seasonal rates, executive bundles, wellness and family plans.',
    'أسعار موسمية وباقات تنفيذية وخطط عافية وعائلية.',
    'Offers are structured to keep flexibility while preserving premium standards.',
    'العروض مصممة للحفاظ على المرونة دون التنازل عن معايير الفخامة.',
    baseSections('offers', 'العروض')
  ),
  dining: makePage(
    'dining',
    'Flame-Driven Cuisine & Artisan Pairings',
    'مطبخ يقوده اللهب وتوليفات حرفية',
    'From open-fire grills to private chef table rituals.',
    'من مطابخ اللهب المفتوح إلى طقوس طاولة الشيف الخاصة.',
    'Dining experiences are designed as storytelling arcs with seasonal products.',
    'تجارب الطعام مصممة كمسارات سردية بمنتجات موسمية.',
    baseSections('dining', 'المطاعم')
  ),
  experiences: makePage(
    'experiences',
    'Beyond Accommodation',
    'أكثر من مجرد إقامة',
    'Curated city loops, wellness paths, and private itineraries.',
    'جولات مدينة منتقاة ومسارات عافية وبرامج خاصة.',
    'Guests can choose ready-made arcs or build custom timelines.',
    'يمكن للضيف اختيار مسارات جاهزة أو تصميم جداول مخصصة.',
    baseSections('experiences', 'التجارب')
  ),
  about: makePage(
    'about',
    'Built as a Cinematic Hospitality House',
    'بُني كبيت ضيافة سينمائي',
    'A multidisciplinary team shaping precision-led experiences.',
    'فريق متعدد التخصصات يصنع تجارب قائمة على الدقة.',
    'Our philosophy fuses emotional architecture with operational rigor.',
    'فلسفتنا تمزج بين العمارة الشعورية والانضباط التشغيلي.',
    baseSections('about', 'عنّا')
  ),
  blog: makePage(
    'blog',
    'Insights, Stories, and Behind-the-Scenes',
    'رؤى وحكايات وكواليس',
    'Articles from chefs, designers, operators, and guest teams.',
    'مقالات من الشيفات والمصممين وفرق التشغيل وتجربة الضيف.',
    'Our journal documents trends in travel, gastronomy, and premium service.',
    'مدونتنا توثق اتجاهات السفر وفنون الطهي والخدمة الراقية.',
    baseSections('blog', 'المدونة')
  ),
  contact: makePage(
    'contact',
    'Speak with Our Concierge Desk',
    'تحدث مع مكتب الكونسيرج',
    'Reservations, private events, media inquiries, and partnerships.',
    'الحجوزات والفعاليات الخاصة والاستفسارات الإعلامية والشراكات.',
    'Support is available around the clock in Arabic and English.',
    'الدعم متاح على مدار الساعة بالعربية والإنجليزية.',
    baseSections('contact', 'تواصل')
  ),
  booking: makePage(
    'booking',
    'Reserve with Confidence',
    'احجز بثقة',
    'Transparent pricing, flexible conditions, and fast confirmation.',
    'تسعير واضح وشروط مرنة وتأكيد سريع.',
    'Build your stay step by step with room, offer, and experience modules.',
    'ابنِ إقامتك خطوة بخطوة مع وحدات الغرف والعروض والتجارب.',
    baseSections('booking', 'الحجز')
  ),
  faq: makePage(
    'faq',
    'Frequently Asked Questions',
    'الأسئلة المتكررة',
    'Quick answers for booking, dining, transport, and policies.',
    'إجابات سريعة للحجز والمطاعم والنقل والسياسات.',
    'We keep policies transparent and easy to browse by category.',
    'نحافظ على السياسات واضحة وسهلة الاستعراض حسب الفئة.',
    baseSections('faq', 'الأسئلة')
  )
};

const navLinks = [
  { id: 'nav-home', pageKey: 'home', path: '/', label: t('Home', 'الرئيسية'), visible: true, order: 1 },
  { id: 'nav-rooms', pageKey: 'rooms', path: '/rooms', label: t('Rooms', 'الغرف'), visible: true, order: 2 },
  { id: 'nav-suites', pageKey: 'suites', path: '/suites', label: t('Suites', 'الأجنحة'), visible: true, order: 3 },
  { id: 'nav-gallery', pageKey: 'gallery', path: '/gallery', label: t('Gallery', 'المعرض'), visible: true, order: 4 },
  { id: 'nav-offers', pageKey: 'offers', path: '/offers', label: t('Offers', 'العروض'), visible: true, order: 5 },
  { id: 'nav-dining', pageKey: 'dining', path: '/dining', label: t('Dining', 'المطاعم'), visible: true, order: 6 },
  { id: 'nav-experiences', pageKey: 'experiences', path: '/experiences', label: t('Experiences', 'التجارب'), visible: true, order: 7 },
  { id: 'nav-about', pageKey: 'about', path: '/about', label: t('About', 'عنّا'), visible: true, order: 8 },
  { id: 'nav-blog', pageKey: 'blog', path: '/blog', label: t('Blog', 'المدونة'), visible: true, order: 9 },
  { id: 'nav-contact', pageKey: 'contact', path: '/contact', label: t('Contact', 'تواصل'), visible: true, order: 10 },
  { id: 'nav-booking', pageKey: 'booking', path: '/booking', label: t('Booking', 'الحجز'), visible: true, order: 11 },
  { id: 'nav-faq', pageKey: 'faq', path: '/faq', label: t('FAQ', 'الأسئلة'), visible: true, order: 12 }
];

const ctaButtons = [
  { id: 'cta-book', text: t('Book Now', 'احجز الآن'), path: '/booking', visible: true, style: 'primary' },
  { id: 'cta-offers', text: t('View Offers', 'شاهد العروض'), path: '/offers', visible: true, style: 'ghost' }
];

const pageVisibility = PAGE_KEYS.reduce((acc, key) => ({ ...acc, [key]: true }), {});

const seo = PAGE_KEYS.reduce((acc, key) => {
  const title = pages[key]?.hero?.title ?? t('Luxurious Inferno', 'Luxurious Inferno');
  return {
    ...acc,
    [key]: {
      title,
      description: pages[key]?.hero?.description ?? t('Premium hospitality destination.', 'وجهة ضيافة راقية.'),
      keywords: `luxurious inferno, ${key}, fire and glass, luxury hospitality`
    }
  };
}, {});
seo.admin = {
  title: t('Admin Console | Luxurious Inferno', 'لوحة التحكم | Luxurious Inferno'),
  description: t('Manage all website content and settings.', 'إدارة جميع محتويات وإعدادات الموقع.'),
  keywords: 'admin dashboard, cms, settings'
};

const priceTables = {
  rooms: [
    {
      id: 'room-1',
      name: t('Essential Room', 'غرفة أساسية'),
      area: '38m2',
      occupancy: t('2 Adults', '2 بالغين'),
      price: '$240 / night',
      features: t('Rain shower, smart control, city glow view', 'دش مطري، تحكم ذكي، إطلالة مدينة')
    },
    {
      id: 'room-2',
      name: t('Deluxe Ember Room', 'غرفة ديلوكس جمرية'),
      area: '46m2',
      occupancy: t('2 Adults + 1 Child', '2 بالغين + 1 طفل'),
      price: '$320 / night',
      features: t('Lounge corner, premium bedding, balcony', 'ركن جلوس، أسرّة فاخرة، شرفة')
    },
    {
      id: 'room-3',
      name: t('Panorama Room', 'غرفة بانوراما'),
      area: '52m2',
      occupancy: t('3 Adults', '3 بالغين'),
      price: '$395 / night',
      features: t('Wide glass, curated minibar, private lane', 'زجاج بانورامي، ميني بار، مسار خاص')
    }
  ],
  suites: [
    {
      id: 'suite-1',
      name: t('Signature Suite', 'جناح سيجنتشر'),
      area: '82m2',
      occupancy: t('3 Adults', '3 بالغين'),
      price: '$560 / night',
      features: t('Living salon, immersive audio, concierge dining', 'صالة معيشة، صوت غامر، خدمة طعام')
    },
    {
      id: 'suite-2',
      name: t('Inferno Residence', 'إقامة إنفيرنو'),
      area: '118m2',
      occupancy: t('4 Adults', '4 بالغين'),
      price: '$780 / night',
      features: t('Private terrace, butler line, wellness package', 'تراس خاص، باتلر، باقة عافية')
    },
    {
      id: 'suite-3',
      name: t('Glass Penthouse', 'بنتهاوس زجاجي'),
      area: '168m2',
      occupancy: t('5 Adults', '5 بالغين'),
      price: '$1,250 / night',
      features: t('Executive table, private access, skyline deck', 'طاولة تنفيذية، وصول خاص، سطح إطلالة')
    }
  ],
  dining: [
    {
      id: 'dining-1',
      name: t('Fireline Grill', 'فايرلاين جريل'),
      area: t('Open-Fire Kitchen', 'مطبخ لهب مفتوح'),
      occupancy: t('80 Seats', '80 مقعدًا'),
      price: '$95 avg / guest',
      features: t('Dry-aged cuts, ember vegetables, pairing', 'لحوم معتقة، خضروات جمرية، توليف')
    },
    {
      id: 'dining-2',
      name: t('Copper Lounge', 'كوبر لاونج'),
      area: t('Skyline Lounge', 'لاونج بإطلالة'),
      occupancy: t('46 Seats', '46 مقعدًا'),
      price: '$68 avg / guest',
      features: t('Artisan tapas, signature mocktails, jazz', 'تاباس حرفية، مشروبات مميزة، جاز')
    },
    {
      id: 'dining-3',
      name: t('Chef Glass Table', 'طاولة الشيف الزجاجية'),
      area: t('Private Experience', 'تجربة خاصة'),
      occupancy: t('10 Seats', '10 مقاعد'),
      price: '$180 tasting',
      features: t('7-course menu, story service', 'قائمة 7 أطباق، خدمة قصصية')
    }
  ],
  experiences: [
    {
      id: 'xp-1',
      name: t('Urban Ember Route', 'مسار الجمر الحضري'),
      area: t('6 Hours', '6 ساعات'),
      occupancy: t('Up to 4 Guests', 'حتى 4 ضيوف'),
      price: '$420 / package',
      features: t('Private driver, design district, sunset roof', 'سائق خاص، منطقة التصميم، محطة غروب')
    },
    {
      id: 'xp-2',
      name: t('Wellness Reset', 'إعادة ضبط العافية'),
      area: t('Full Day', 'يوم كامل'),
      occupancy: t('2 Guests', 'ضيفان'),
      price: '$360 / package',
      features: t('Spa ritual, nutrition consult, breathwork', 'طقس سبا، استشارة تغذية، تنفس')
    },
    {
      id: 'xp-3',
      name: t('Executive Precision Day', 'يوم تنفيذي دقيق'),
      area: t('8 Hours', '8 ساعات'),
      occupancy: t('1-3 Guests', '1-3 ضيوف'),
      price: '$540 / package',
      features: t('Meeting pods, transfer, late-night dining', 'مساحات اجتماع، نقل، عشاء ليلي')
    }
  ]
};

const faq = [
  {
    id: 'faq-01',
    category: 'booking',
    question: t('What is your cancellation policy?', 'ما هي سياسة الإلغاء؟'),
    answer: t(
      'Most rates allow free cancellation up to 72 hours before arrival, while peak offers can be non-refundable.',
      'تسمح معظم الأسعار بإلغاء مجاني حتى 72 ساعة قبل الوصول، بينما قد تكون عروض الذروة غير قابلة للاسترداد.'
    )
  },
  {
    id: 'faq-02',
    category: 'booking',
    question: t('Do you provide airport transfer?', 'هل توفرون خدمة نقل المطار؟'),
    answer: t(
      'Yes, shared and private transfer options are available 24/7 and can be booked at checkout.',
      'نعم، تتوفر خيارات نقل مشتركة وخاصة 24/7 ويمكن حجزها أثناء إتمام الحجز.'
    )
  },
  {
    id: 'faq-03',
    category: 'rooms',
    question: t('Are interconnected rooms available?', 'هل الغرف المتصلة متاحة؟'),
    answer: t(
      'Interconnected rooms are available in selected categories and depend on real-time inventory.',
      'الغرف المتصلة متاحة في فئات محددة وتعتمد على التوفر اللحظي.'
    )
  },
  {
    id: 'faq-04',
    category: 'dining',
    question: t('Can menus support allergies?', 'هل القوائم تدعم الحساسية الغذائية؟'),
    answer: t(
      'Our culinary team supports vegetarian, vegan, gluten-free, and allergy-safe requests.',
      'فريق الطهي يدعم طلبات النباتيين والخالي من الجلوتين والحساسية الغذائية.'
    )
  },
  {
    id: 'faq-05',
    category: 'amenities',
    question: t('What wellness facilities are included?', 'ما مرافق العافية المتضمنة؟'),
    answer: t(
      'Thermal suites, recovery lounge, gym studio, and guided movement sessions are available.',
      'تتوفر الأجنحة الحرارية وصالة التعافي واستوديو اللياقة وجلسات الحركة الموجهة.'
    )
  },
  {
    id: 'faq-06',
    category: 'policies',
    question: t('Are all indoor areas non-smoking?', 'هل جميع المساحات الداخلية غير مخصصة للتدخين؟'),
    answer: t(
      'Yes, all indoor areas are non-smoking with dedicated outdoor smoking zones.',
      'نعم، جميع المساحات الداخلية غير مخصصة للتدخين مع مناطق خارجية مخصصة.'
    )
  },
  {
    id: 'faq-07',
    category: 'transport',
    question: t('Can I reserve chauffeur service?', 'هل يمكن حجز سائق خاص؟'),
    answer: t(
      'Executive sedans and premium SUVs are available by hour or full-day booking.',
      'تتوفر سيارات سيدان تنفيذية وSUV فاخرة بالحجز بالساعة أو اليوم الكامل.'
    )
  },
  {
    id: 'faq-08',
    category: 'policies',
    question: t('Do you host private events?', 'هل تستضيفون فعاليات خاصة؟'),
    answer: t(
      'Yes, our events desk coordinates weddings, launches, and executive gatherings.',
      'نعم، مكتب الفعاليات لدينا ينظم حفلات الزفاف والإطلاقات والتجمعات التنفيذية.'
    )
  },
  {
    id: 'faq-09',
    category: 'booking',
    question: t('Can I modify reservation dates?', 'هل يمكن تعديل تواريخ الحجز؟'),
    answer: t(
      'Date changes are possible based on rate policy and availability, with potential fare differences.',
      'تعديل التواريخ ممكن حسب سياسة السعر والتوفر، وقد تُطبق فروقات سعرية.'
    )
  },
  {
    id: 'faq-10',
    category: 'amenities',
    question: t('Do you have accessibility-ready rooms?', 'هل تتوفر غرف مجهزة لإمكانية الوصول؟'),
    answer: t(
      'Yes, we provide adapted bathrooms and mobility-friendly room layouts.',
      'نعم، نوفر حمامات معدلة وتخطيطات غرف مناسبة للحركة.'
    )
  },
  {
    id: 'faq-11',
    category: 'transport',
    question: t('Is valet parking available?', 'هل خدمة صف السيارات متاحة؟'),
    answer: t(
      'Valet is complimentary for suites and available at fixed rates for other categories.',
      'خدمة صف السيارات مجانية للأجنحة ومتاحة برسوم ثابتة للفئات الأخرى.'
    )
  },
  {
    id: 'faq-12',
    category: 'policies',
    question: t('What are check-in/check-out times?', 'ما مواعيد تسجيل الدخول والمغادرة؟'),
    answer: t(
      'Standard check-in starts 3:00 PM and checkout is 12:00 PM with express options on request.',
      'تسجيل الدخول يبدأ 3:00 مساءً والمغادرة 12:00 ظهرًا مع خيارات سريعة عند الطلب.'
    )
  }
];

const testimonials = [
  {
    id: 'tm-01',
    name: t('Amina Khaled', 'أمينة خالد'),
    role: t('Creative Director, Riyadh', 'مديرة إبداعية، الرياض'),
    quote: t(
      'Every space has intent and rhythm. This is cinematic luxury without excess noise.',
      'كل مساحة لها نية وإيقاع. هذه فخامة سينمائية بلا ضوضاء زائدة.'
    ),
    rating: 5
  },
  {
    id: 'tm-02',
    name: t('Omar Hegazy', 'عمر حجازي'),
    role: t('Startup Founder, Cairo', 'مؤسس شركة ناشئة، القاهرة'),
    quote: t(
      'Fast onboarding, practical systems, and one of the most consistent concierge teams I have used.',
      'تسجيل سريع وأنظمة عملية وفريق كونسيرج من الأكثر ثباتًا في الجودة.'
    ),
    rating: 5
  },
  {
    id: 'tm-03',
    name: t('Leila Mansour', 'ليلى منصور'),
    role: t('Brand Strategist, Dubai', 'استراتيجية علامة، دبي'),
    quote: t(
      'Design identity is bold and clear, and the dining concepts are truly differentiated.',
      'الهوية التصميمية جريئة وواضحة، ومفاهيم المطاعم مختلفة فعلًا.'
    ),
    rating: 5
  },
  {
    id: 'tm-04',
    name: t('Karim Fares', 'كريم فارس'),
    role: t('Consultant, London', 'استشاري، لندن'),
    quote: t(
      'The suite layout made private meetings and evening hosting effortless.',
      'تخطيط الجناح جعل الاجتماعات الخاصة والاستضافة المسائية سهلة جدًا.'
    ),
    rating: 4
  },
  {
    id: 'tm-05',
    name: t('Nora Aziz', 'نورا عزيز'),
    role: t('Travel Journalist, Amman', 'صحفية سفر، عمان'),
    quote: t(
      'This property understands pacing: calm mornings, energetic evenings, zero friction.',
      'هذه المنشأة تفهم الإيقاع: صباحات هادئة، أمسيات نشطة، دون احتكاك.'
    ),
    rating: 5
  },
  {
    id: 'tm-06',
    name: t('Hassan Adel', 'حسن عادل'),
    role: t('Product Lead, Berlin', 'قائد منتج، برلين'),
    quote: t(
      'Practical luxury and thoughtful details from arrival to checkout.',
      'فخامة عملية وتفاصيل مدروسة من الوصول حتى المغادرة.'
    ),
    rating: 5
  },
  {
    id: 'tm-07',
    name: t('Maya Rahim', 'مايا رحيم'),
    role: t('Photographer, Doha', 'مُصورة، الدوحة'),
    quote: t(
      'Light gradients are exceptional. The property is a visual playground.',
      'تدرجات الضوء استثنائية. المكان ملعب بصري حقيقي.'
    ),
    rating: 5
  },
  {
    id: 'tm-08',
    name: t('Samir Nabil', 'سمير نبيل'),
    role: t('Finance Executive, Jeddah', 'مدير مالي، جدة'),
    quote: t(
      'Everything is clear, fast, and refined. Exactly what premium should feel like.',
      'كل شيء واضح وسريع وراقي. هذا هو الإحساس الصحيح للفخامة.'
    ),
    rating: 4
  }
];

const offers = [
  {
    id: 'offer-01',
    tag: t('Weekend Premium', 'عطلة نهاية أسبوع مميزة'),
    title: t('72-Hour Inferno Escape', 'هروب إنفيرنو لـ72 ساعة'),
    description: t(
      'Three nights with dining credits, late checkout, and wellness access.',
      'ثلاث ليالٍ مع رصيد مطاعم ومغادرة متأخرة ودخول مرافق العافية.'
    ),
    price: '$890 total',
    cta: t('Reserve Package', 'احجز الباقة')
  },
  {
    id: 'offer-02',
    tag: t('Executive', 'تنفيذي'),
    title: t('Boardroom + Suite Bundle', 'باقة جناح + اجتماعات'),
    description: t(
      'Suite stay with private meeting hours and concierge workflow.',
      'إقامة جناح مع ساعات اجتماعات خاصة وإدارة كونسيرج.'
    ),
    price: '$1,450 total',
    cta: t('Book Executive', 'احجز التنفيذي')
  },
  {
    id: 'offer-03',
    tag: t('Dining', 'مطاعم'),
    title: t('Chef Table Discovery', 'اكتشاف طاولة الشيف'),
    description: t(
      'Two-night stay plus curated 7-course tasting for two.',
      'إقامة ليلتين مع تذوق 7 أطباق لشخصين.'
    ),
    price: '$760 total',
    cta: t('Claim Dining Offer', 'احصل على العرض')
  },
  {
    id: 'offer-04',
    tag: t('Wellness', 'عافية'),
    title: t('Reset & Recover Week', 'أسبوع إعادة التوازن'),
    description: t(
      'Five-night stay with infrared recovery and nutrition guidance.',
      'إقامة 5 ليالٍ مع تعافٍ بالأشعة تحت الحمراء وإرشاد غذائي.'
    ),
    price: '$1,980 total',
    cta: t('Start Wellness Plan', 'ابدأ خطة العافية')
  },
  {
    id: 'offer-05',
    tag: t('Family', 'عائلي'),
    title: t('Family Ember Edition', 'نسخة العائلة الجمرية'),
    description: t(
      'Connecting rooms, family breakfast, and activity concierge support.',
      'غرف متصلة وإفطار عائلي ودعم كونسيرج للأنشطة.'
    ),
    price: '$1,120 total',
    cta: t('View Family Offer', 'عرض الباقة العائلية')
  },
  {
    id: 'offer-06',
    tag: t('Romance', 'رومانسي'),
    title: t('Copper Night Ritual', 'طقس الليلة النحاسية'),
    description: t(
      'Suite booking with private terrace dinner and cinematic setup.',
      'حجز جناح مع عشاء خاص على التراس وتجهيز سينمائي.'
    ),
    price: '$990 total',
    cta: t('Plan the Night', 'خطط الليلة')
  }
];

const blog = [
  {
    id: 'blog-01',
    title: t('Designing Hospitality Through Light Gradients', 'تصميم الضيافة عبر تدرجات الضوء'),
    excerpt: t(
      'An architectural look at how controlled contrast affects guest mood and recall.',
      'نظرة معمارية على أثر التباين المنضبط في مزاج الضيف وتذكره للتجربة.'
    ),
    date: '2026-01-16',
    category: 'design'
  },
  {
    id: 'blog-02',
    title: t('How Concierge AI Supports Human Service', 'كيف يدعم ذكاء الكونسيرج الخدمة البشرية'),
    excerpt: t(
      'Operational AI speeds up responses while preserving warmth and empathy.',
      'الذكاء التشغيلي يسرّع الاستجابة مع الحفاظ على الدفء الإنساني.'
    ),
    date: '2026-01-24',
    category: 'operations'
  },
  {
    id: 'blog-03',
    title: t('Chef Notes: Building a Fire-Forward Menu', 'ملاحظات الشيف: بناء قائمة بطابع النار'),
    excerpt: t(
      'Balancing smoke depth, texture, and ingredient clarity in premium cuisine.',
      'موازنة عمق الدخان والقوام ووضوح المكونات في المطبخ الراقي.'
    ),
    date: '2026-02-03',
    category: 'dining'
  },
  {
    id: 'blog-04',
    title: t('The Anatomy of a 60-Second Check-In', 'تشريح تسجيل دخول في 60 ثانية'),
    excerpt: t(
      'A practical walkthrough of front-desk choreography and digital readiness.',
      'شرح عملي لكوريوغرافيا الاستقبال والجاهزية الرقمية.'
    ),
    date: '2026-02-09',
    category: 'operations'
  },
  {
    id: 'blog-05',
    title: t('Wellness Labs Beyond Spa Trends', 'مختبرات العافية بعد صيحات السبا'),
    excerpt: t(
      'Recovery protocols that improve focus and travel resilience.',
      'بروتوكولات تعافٍ تعزز التركيز والمرونة أثناء السفر.'
    ),
    date: '2026-02-15',
    category: 'wellness'
  },
  {
    id: 'blog-06',
    title: t('The New Language of Urban Luxury', 'اللغة الجديدة للفخامة الحضرية'),
    excerpt: t(
      'A reading of luxury demand shifts across MENA metropolitan markets.',
      'قراءة لتحولات طلب الفخامة في أسواق المدن بالشرق الأوسط.'
    ),
    date: '2026-03-06',
    category: 'insights'
  },
  {
    id: 'blog-07',
    title: t('From Arrival to Departure: Service Timeline', 'من الوصول للمغادرة: خط زمني للخدمة'),
    excerpt: t(
      'How cross-team handoffs maintain polish without slowing operations.',
      'كيف تحافظ نقاط تسليم الفرق على الرقي دون إبطاء التشغيل.'
    ),
    date: '2026-03-07',
    category: 'operations'
  }
];

const contactInfo = {
  phones: ['+20 2 5577 4400', '+971 4 882 1940'],
  emails: ['reservations@luxuriousinferno.com', 'concierge@luxuriousinferno.com'],
  address: t('Ember District, Skyline Avenue, Downtown', 'حي الجمر، شارع سكاي لاين، وسط المدينة'),
  mapUrl: 'https://maps.google.com'
};

const bookingSettings = {
  checkInDefault: '2026-04-10',
  checkOutDefault: '2026-04-13',
  adultsDefault: 2,
  childrenDefault: 0,
  roomTypes: [
    { id: 'rt-1', label: t('Essential Room', 'غرفة أساسية') },
    { id: 'rt-2', label: t('Deluxe Ember Room', 'غرفة ديلوكس جمرية') },
    { id: 'rt-3', label: t('Panorama Room', 'غرفة بانوراما') },
    { id: 'rt-4', label: t('Signature Suite', 'جناح سيجنتشر') },
    { id: 'rt-5', label: t('Glass Penthouse', 'بنتهاوس زجاجي') }
  ]
};

export const DEFAULT_SITE_DATA = {
  siteName: t('Golden Tulip Shakereen Hotel', 'فندق جولدين توليب الشاكرين'),
  siteTagline: t('Fire & Glass Hospitality House', 'بيت ضيافة النار والزجاج'),
  updatedAt: '2026-03-08T00:00:00.000Z',
  settings: {
    language: 'en',
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
  pages,
  priceTables,
  faq,
  testimonials,
  offers,
  blog,
  gallery: createGallery(),
  contactInfo,
  bookingSettings
};

export const cloneDefaultSiteData = () => JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
