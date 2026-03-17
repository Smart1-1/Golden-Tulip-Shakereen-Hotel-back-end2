const heroOne = '/uploads/seed/0K9A6673.jpg';
const heroTwo = '/uploads/seed/0K9A6699.jpg';
const heroThree = '/uploads/seed/0K9A6736.jpg';
const heroFour = '/uploads/seed/0K9A6748.jpg';
const heroFive = '/uploads/seed/0K9A6780.jpg';
const heroSix = '/uploads/seed/0K9A6816.jpg';

const t = (en, ar) => ({ en, ar });

export { t };

export const companyContent = {
  slogan: t('We Elevate Hospitality in the Heart of the Two Holy Mosques', 'نحن نرتقي بالضيافة في قلب الحرمين الشريفين'),
  welcomeMessage: t('We are at your service', 'نحن في خدمتكم'),
  intro: t(
    'Diyar Al Diwaniyah is a Saudi company specialized in hotel management and operations, with a strategic focus on Makkah and Madinah.',
    'شركة ديار الديوانية هي شركة سعودية متخصصة في إدارة وتشغيل الفنادق مع تركيز استراتيجي على مكة المكرمة والمدينة المنورة.'
  ),
  aboutBody: t(
    'We commit to exceptional hospitality experiences backed by a high-caliber team and a practical obsession with quality, profitability, and operational control.',
    'نلتزم بتقديم تجارب ضيافة استثنائية، مدعومة بفريق عالي الكفاءة وشغف واضح بالجودة والربحية والانضباط التشغيلي.'
  ),
  vision: t(
    'To become the preferred hotel management partner in Makkah and Madinah, known for quality, innovation, and profitability for hotel owners.',
    'أن نكون الشريك المفضل لإدارة وتشغيل الفنادق في مكة المكرمة والمدينة المنورة، معروفين بتقديم أعلى مستويات الجودة والابتكار والربحية لأصحاب الفنادق.'
  ),
  mission: t(
    'To deliver integrated hotel management services that maximize efficiency and returns while creating memorable guest experiences shaped by the spirit of the two holy cities.',
    'تقديم خدمات إدارة وتشغيل فنادق متكاملة ومبتكرة، تضمن تحقيق أقصى قدر من الكفاءة التشغيلية والربحية، مع خلق تجربة ضيافة متميزة تعكس روحانية المدينتين المقدستين.'
  ),
  values: [
    { id: 'value-excellence', title: t('Excellence', 'التميز'), body: t('We pursue the highest quality standards across operations, guest service, and brand presentation.', 'نسعى دائماً إلى تحقيق أعلى معايير الجودة في التشغيل، وخدمة الضيوف، وتقديم العلامة التجارية.') },
    { id: 'value-integrity', title: t('Integrity', 'النزاهة'), body: t('We work with transparency, accountability, and measurable trust in every partnership.', 'نعمل بشفافية ومصداقية ومسؤولية واضحة في كل شراكة.') },
    { id: 'value-innovation', title: t('Innovation', 'الابتكار'), body: t('We adopt modern hospitality systems, pricing discipline, and operational tools that move results forward.', 'نتبنى أحدث الأنظمة والحلول التشغيلية والتسويقية التي تدفع النتائج إلى الأمام.') },
    { id: 'value-guest', title: t('Guest First', 'التركيز على الضيف'), body: t('Guest comfort, clarity, and trust remain at the center of every decision we make.', 'نضع راحة الضيف ووضوح التجربة وثقته في صميم كل قرار نتخذه.') },
    { id: 'value-community', title: t('Social Responsibility', 'المسؤولية الاجتماعية'), body: t('We support local communities and create operations that respect the context of the two holy cities.', 'ندعم المجتمعات المحلية ونبني عمليات تراعي خصوصية المدينتين المقدستين.') },
    { id: 'value-profit', title: t('Sustainable Profitability', 'الربحية المستدامة'), body: t('We optimize long-term returns by balancing occupancy, efficiency, and service quality.', 'نعمل على تعظيم العائد المستدام عبر الموازنة بين الإشغال والكفاءة وجودة الخدمة.') }
  ],
  services: [
    { id: 'service-ops', title: t('Full Hotel Operations', 'الإدارة التشغيلية الكاملة'), body: t('Daily supervision of rooms, front office, housekeeping, engineering, and guest-touchpoint delivery.', 'الإشراف اليومي على الغرف، والاستقبال، والتدبير الفندقي، والهندسة، وتجربة الضيف.') },
    { id: 'service-revenue', title: t('Revenue, Sales & Marketing', 'إدارة الإيرادات والتسويق والمبيعات'), body: t('Pricing strategy, digital marketing, distribution channels, and sales planning to grow occupancy and revenue.', 'تطوير استراتيجيات التسعير والتسويق الرقمي وقنوات التوزيع وخطط المبيعات لزيادة الإشغال والإيرادات.') },
    { id: 'service-finance', title: t('Finance & Accounting', 'إدارة الشؤون المالية والمحاسبة'), body: t('Budgets, recurring financial reports, cash flow control, and decision-grade analysis.', 'إعداد الميزانيات، والتقارير المالية الدورية، وإدارة التدفقات النقدية، والتحليل المالي.') },
    { id: 'service-hr', title: t('HR & Training', 'إدارة الموارد البشرية والتدريب'), body: t('Recruitment, training, and performance development for hospitality teams built around service culture.', 'استقطاب وتوظيف وتدريب أفضل الكفاءات في مجال الضيافة وبناء ثقافة خدمة واضحة.') },
    { id: 'service-facilities', title: t('Facilities & Maintenance', 'الصيانة وإدارة المرافق'), body: t('Asset care plans that preserve hotel quality, safety, and the long-term condition of the property.', 'الحفاظ على جودة وأداء الأصول الفندقية عبر خطط صيانة ومتابعة احترافية.') },
    { id: 'service-quality', title: t('Quality & Compliance', 'الجودة والامتثال'), body: t('Alignment with local and international standards for health, safety, environment, and service delivery.', 'ضمان الالتزام بالمعايير الدولية والمحلية للصحة والسلامة والبيئة وجودة الخدمة.') },
    { id: 'service-development', title: t('Planning & Development', 'التخطيط والتطوير'), body: t('Advisory support for new hotel projects, repositioning plans, and improvement programs for existing assets.', 'تقديم الاستشارات لتطوير المشاريع الفندقية الجديدة أو إعادة تأهيل الفنادق القائمة.') }
  ],
  whyChooseUs: [
    { id: 'reason-market', title: t('Specialized Holy Cities Expertise', 'خبرة متخصصة في سوق الحرمين'), body: t('We understand the operational rhythm, guest expectations, and seasonality of Makkah and Madinah.', 'نمتلك فهماً عميقاً لخصوصية سوق الضيافة في مكة والمدينة، بما يشمل مواسم الذروة وتوقعات الضيوف.') },
    { id: 'reason-leadership', title: t('Experienced Leadership', 'فريق قيادي محترف'), body: t('Our team covers hotel management, revenue, marketing, finance, HR, and operations with real field experience.', 'يضم فريقنا خبرات متقدمة في إدارة الفنادق، والإيرادات، والتسويق، والمالية، والموارد البشرية، والعمليات.') },
    { id: 'reason-return', title: t('Return-Focused Management', 'تحقيق أعلى عائد على الاستثمار'), body: t('We work on occupancy growth, cost optimization, and quality control to protect owner returns.', 'نستخدم استراتيجيات مبتكرة لزيادة الإيرادات وخفض التكاليف وتحسين الكفاءة التشغيلية بما يحقق ربحية أعلى.') },
    { id: 'reason-standards', title: t('Global Service Standards', 'معايير خدمة عالمية'), body: t('We apply clear SOPs and guest-service standards that create a memorable and consistent stay.', 'نطبق أفضل الممارسات العالمية في خدمة العملاء لضمان تجربة ضيافة احترافية وثابتة.') },
    { id: 'reason-tech', title: t('Advanced Hospitality Technology', 'تكنولوجيا متطورة'), body: t('We invest in PMS, revenue systems, digital tools, and reporting workflows that improve performance visibility.', 'نستثمر في أنظمة إدارة الفنادق والإيرادات وأدوات التسويق والتقارير الرقمية لتعزيز الأداء.') },
    { id: 'reason-culture', title: t('Cultural & Spiritual Alignment', 'الالتزام بالهوية الثقافية'), body: t('Our service design respects the cultural and spiritual context of the two holy cities.', 'نحرص على أن تعكس خدماتنا هوية مكة والمدينة الروحية والثقافية في التصميم والتشغيل.') }
  ],
  destinations: [
    { id: 'dest-makkah', slug: 'makkah', name: t('Makkah Al Mukarramah', 'مكة المكرمة'), image: heroSix, summary: t('Managed properties near the holy sites, designed for high-demand seasonal operations and clear guest flow.', 'فنادق مُدارة بالقرب من المشاعر والمناطق الحيوية، بتشغيل جاهز للمواسم العالية وتجربة ضيف منظمة.') },
    { id: 'dest-madinah', slug: 'madinah', name: t('Al Madinah Al Munawwarah', 'المدينة المنورة'), image: heroTwo, summary: t('Hospitality experiences tailored for visitors of Al Masjid An Nabawi, with calm service and strong operational control.', 'تجارب ضيافة مصممة لزوار المسجد النبوي بخدمة هادئة وتشغيل منضبط وكفاءة عالية.') }
  ],
  stats: [
    { id: 'stat-hotels', label: t('Managed Hotels', 'فنادق تحت الإدارة'), value: '3' },
    { id: 'stat-rooms', label: t('Total Rooms', 'إجمالي الغرف'), value: '1295' },
    { id: 'stat-cities', label: t('Key Cities', 'مدن التشغيل'), value: '2' },
    { id: 'stat-support', label: t('Guest Support', 'دعم الضيوف'), value: '24/7' }
  ]
};

export const pageSeeds = {
  home: {
    hero: {
      kicker: t('Diyar Al Diwaniyah Hospitality', 'شركة ديار الديوانية'),
      title: t('Hotel Management Across the Two Holy Cities', 'إدارة وتشغيل فنادق في قلب الحرمين الشريفين'),
      subtitle: t('A multi-property hospitality brand built around operational control, refined presentation, and guest trust.', 'علامة ضيافة متعددة الفنادق مبنية على الانضباط التشغيلي، والتقديم الراقي، وثقة الضيف.'),
      description: t('Search by city and dates, compare hotel availability, and move directly into the property that fits your stay.', 'ابحث حسب المدينة والتواريخ، وقارن بين الفنادق المتاحة، ثم انتقل مباشرة إلى الفندق الأنسب لإقامتك.'),
      image: heroOne,
      primaryCta: t('Search Hotels', 'ابحث عن الفنادق'),
      primaryCtaPath: '/search',
      secondaryCta: t('Explore Our Hotels', 'استعرض فنادقنا'),
      secondaryCtaPath: '/hotels'
    }
  },
  hotels: {
    hero: {
      kicker: t('Managed Portfolio', 'فنادق تحت إدارتنا'),
      title: t('Explore Our Hotels', 'استعرض فنادقنا'),
      subtitle: t('Three distinctive properties across Makkah and Madinah.', 'ثلاثة فنادق مميزة في مكة والمدينة.'),
      description: t('Browse hotel profiles, compare amenities and stars, then open each property page for rooms, gallery, and guest reviews.', 'تصفح ملفات الفنادق، وقارن المزايا وعدد النجوم، ثم افتح صفحة كل فندق للغرف والمعرض وتقييمات الضيوف.'),
      image: heroThree
    }
  },
  destinations: {
    hero: {
      kicker: t('Destinations', 'الوجهات'),
      title: t('Makkah & Madinah', 'مكة المكرمة والمدينة المنورة'),
      subtitle: t('Hospitality experiences shaped for the operational needs of the two holy cities.', 'تجارب ضيافة مصممة لخصوصية التشغيل في المدينتين المقدستين.'),
      description: t('Choose a destination first, then search available hotels and room types in the dates that suit your stay.', 'ابدأ باختيار الوجهة، ثم ابحث عن الفنادق وأنواع الغرف المتاحة في التواريخ المناسبة لك.'),
      image: heroSix
    }
  },
  services: {
    hero: {
      kicker: t('Services', 'خدماتنا'),
      title: t('Hotel Operations with Measurable Control', 'تشغيل فندقي بضبط ونتائج قابلة للقياس'),
      subtitle: t('Integrated hotel management from revenue discipline to guest-facing delivery.', 'إدارة وتشغيل متكاملان من الانضباط المالي إلى تجربة الضيف.'),
      description: t('Our services are structured to protect asset value, improve guest satisfaction, and sustain profitable growth.', 'خدماتنا مصممة لحماية قيمة الأصل، ورفع رضا الضيوف، ودعم النمو الربحي المستدام.'),
      image: heroFour
    }
  },
  about: {
    hero: {
      kicker: t('About Diyar Al Diwaniyah', 'عن شركة ديار الديوانية'),
      title: t('We Elevate Hospitality in the Heart of the Two Holy Mosques', 'نحن نرتقي بالضيافة في قلب الحرمين الشريفين'),
      subtitle: t('A Saudi hospitality company specialized in managing and operating hotel assets.', 'شركة سعودية متخصصة في إدارة وتشغيل الأصول الفندقية.'),
      description: t('We combine operational discipline, hospitality expertise, and strong local understanding to build standout guest experiences.', 'نجمع بين الانضباط التشغيلي، والخبرة الفندقية، والفهم المحلي العميق لبناء تجارب ضيافة متميزة.'),
      image: heroTwo
    }
  },
  whyChooseUs: {
    hero: {
      kicker: t('Why Us', 'لماذا نحن'),
      title: t('Why Choose Diyar Al Diwaniyah?', 'لماذا تختار شركة ديار الديوانية؟'),
      subtitle: t('Built on deep market knowledge, disciplined operations, and a premium service standard.', 'مبنية على فهم سوقي عميق، وانضباط تشغيلي، ومعايير خدمة راقية.'),
      description: t('We help hotel assets perform better while keeping the guest experience clear, warm, and memorable.', 'نساعد الأصول الفندقية على تحقيق أداء أفضل مع الحفاظ على تجربة ضيف واضحة وراقية ولا تُنسى.'),
      image: heroFive
    }
  },
  contact: {
    hero: {
      kicker: t('Contact', 'تواصل معنا'),
      title: t('Talk to Our Hospitality Team', 'تواصل مع فريق الضيافة لدينا'),
      subtitle: t('For hotel management partnerships, reservations, or operational inquiries.', 'لشراكات الإدارة الفندقية أو الحجوزات أو الاستفسارات التشغيلية.'),
      description: t('Reach our team for partnership opportunities, hotel management discussions, or direct guest support.', 'تواصل معنا لفرص الشراكة، أو مناقشات الإدارة الفندقية، أو دعم الضيوف بشكل مباشر.'),
      image: heroOne
    }
  },
  search: {
    hero: {
      kicker: t('Availability Search', 'البحث عن التوافر'),
      title: t('Find the Right Stay by City and Dates', 'ابحث عن الإقامة المناسبة حسب المدينة والتواريخ'),
      subtitle: t('Compare all managed properties in one place, with clear available and unavailable states.', 'قارن كل الفنادق تحت الإدارة في صفحة واحدة، مع توضيح المتاح وغير المتاح.'),
      description: t('Search once, compare hotels, then move directly into the property page to review rooms, rates, stars, and guest feedback.', 'ابحث مرة واحدة، ثم قارن الفنادق، وانتقل مباشرة إلى صفحة الفندق لمراجعة الغرف والأسعار والنجوم وتقييمات الضيوف.'),
      image: heroThree
    }
  }
};

export const companyImages = { heroOne, heroTwo, heroThree, heroFour, heroFive, heroSix };
