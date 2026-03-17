import { companyImages, t } from './companySeed.js';

const { heroOne, heroTwo, heroThree, heroFour, heroFive, heroSix } = companyImages;

const createGalleryItem = (id, category, src, titleEn, titleAr, descEn, descAr) => ({
  id,
  category,
  src,
  thumb: src,
  title: t(titleEn, titleAr),
  description: t(descEn, descAr),
  alt: t(titleEn, titleAr)
});

const createReview = (id, nameEn, nameAr, quoteEn, quoteAr, rating, hotelId) => ({
  id,
  hotelId,
  name: t(nameEn, nameAr),
  role: t('Guest Review', 'تقييم ضيف'),
  quote: t(quoteEn, quoteAr),
  rating,
  submittedAt: '2026-03-10T10:00:00.000Z'
});

const makeAvailability = (id, startDate, endDate, availableUnits, nightlyRate, closed = false) => ({
  id,
  startDate,
  endDate,
  availableUnits,
  nightlyRate,
  closed
});

export const hotelSeedData = [
  {
    id: 'hotel-shakereen',
    slug: 'golden-tulip-shakereen',
    name: t('Golden Tulip Shakereen Hotel', 'فندق الشاكرين جولدن توليب'),
    city: 'madinah',
    cityLabel: t('Al Madinah Al Munawwarah', 'المدينة المنورة'),
    starRating: 5,
    roomCount: 420,
    badge: t('Flagship Property', 'الفندق الرئيسي'),
    heroImage: heroThree,
    primaryImage: heroThree,
    shortDescription: t('A polished flagship stay in Madinah with premium rooms, efficient guest flow, and a warm brand presence.', 'إقامة رئيسية راقية في المدينة المنورة بغرف متميزة وتشغيل منظم وتجربة ضيف أنيقة.'),
    description: t('Golden Tulip Shakereen Hotel balances polished public spaces, efficient room operations, and booking clarity for business, family, and religious travel.', 'يُعد فندق الشاكرين جولدن توليب من الواجهات الفندقية الرئيسية في المدينة المنورة، حيث يجمع بين المساحات الأنيقة والتشغيل المنظم ووضوح تجربة الحجز لرحلات الأعمال والعائلات والزوار.'),
    address: t('Central Area, Al Madinah Al Munawwarah', 'المنطقة المركزية، المدينة المنورة'),
    gallery: [
      createGalleryItem('shakereen-exterior', 'exterior', heroThree, 'Shakereen Exterior', 'واجهة فندق الشاكرين', 'A prominent street-facing entrance with strong evening lighting.', 'واجهة فندقية بارزة بإضاءة مسائية قوية.'),
      createGalleryItem('shakereen-lobby', 'lobby', heroOne, 'Lobby Welcome', 'استقبال الفندق', 'Reception moments shaped around warmth and arrival clarity.', 'لحظات استقبال مصممة حول الدفء ووضوح تجربة الوصول.'),
      createGalleryItem('shakereen-room', 'rooms', heroFive, 'Guest Room', 'غرفة ضيوف', 'Comfortable room composition with premium finishes and quiet lighting.', 'غرفة مريحة بتشطيبات راقية وإضاءة هادئة.'),
      createGalleryItem('shakereen-suite', 'suites', heroFour, 'Executive Suite', 'جناح تنفيذي', 'A refined suite layout for longer stays and higher privacy.', 'جناح راقٍ مناسب للإقامات الأطول مع خصوصية أعلى.'),
      createGalleryItem('shakereen-amenities', 'amenities', heroSix, 'Service Spaces', 'مرافق وخدمات', 'Service facilities designed to support smooth guest journeys.', 'مرافق خدمية تدعم رحلة الضيف بسلاسة.')
    ],
    amenityHighlights: [t('Premium lobby experience', 'ردهة استقبال فاخرة'), t('Family-friendly room mix', 'تنوع غرف مناسب للعائلات'), t('High-capacity seasonal operations', 'جاهزية تشغيلية عالية للمواسم'), t('24/7 guest support', 'دعم ضيوف على مدار الساعة')],
    roomTypes: [
      {
        id: 'shakereen-deluxe',
        name: t('Deluxe Room', 'غرفة ديلوكس'),
        category: 'room',
        occupancy: 2,
        size: t('32 sqm', '32 م²'),
        beds: t('1 King Bed', 'سرير كينج'),
        baseRate: 950,
        currency: 'SAR',
        description: t('A well-composed room for couples and business travelers with warm finishes and efficient layout.', 'غرفة متوازنة تناسب الأزواج ورجال الأعمال بتشطيبات دافئة وتخطيط عملي.'),
        amenities: [t('Smart TV', 'تلفاز ذكي'), t('High-speed Wi-Fi', 'إنترنت عالي السرعة'), t('Tea & coffee setup', 'ركن شاي وقهوة')],
        images: [heroFive, heroOne],
        availability: [makeAvailability('shak-deluxe-1', '2026-04-01', '2026-04-20', 18, 950), makeAvailability('shak-deluxe-2', '2026-04-21', '2026-05-15', 10, 1040)]
      },
      {
        id: 'shakereen-family',
        name: t('Family Room', 'غرفة عائلية'),
        category: 'room',
        occupancy: 4,
        size: t('44 sqm', '44 م²'),
        beds: t('2 Queen Beds', 'سريران كوين'),
        baseRate: 1320,
        currency: 'SAR',
        description: t('An efficient family setup with more floor area, better storage, and easy circulation.', 'غرفة عائلية بمساحة أوسع وتخزين أفضل وحركة مريحة داخل الغرفة.'),
        amenities: [t('Family seating corner', 'ركن جلوس عائلي'), t('Extra luggage area', 'مساحة إضافية للأمتعة'), t('City-facing windows', 'نوافذ بإطلالة على المدينة')],
        images: [heroThree, heroTwo],
        availability: [makeAvailability('shak-family-1', '2026-04-01', '2026-04-15', 6, 1320), makeAvailability('shak-family-2', '2026-04-16', '2026-05-10', 4, 1390)]
      },
      {
        id: 'shakereen-executive-suite',
        name: t('Executive Suite', 'جناح تنفيذي'),
        category: 'suite',
        occupancy: 3,
        size: t('62 sqm', '62 م²'),
        beds: t('1 King Bed + Lounge', 'سرير كينج + صالة'),
        baseRate: 1880,
        currency: 'SAR',
        description: t('A signature suite layout with lounge space, stronger privacy, and elevated guest amenities.', 'جناح مميز بصالة مستقلة وخصوصية أعلى وخدمات ضيافة أرقى.'),
        amenities: [t('Private lounge', 'صالة خاصة'), t('Priority check-in support', 'دعم أولوية في تسجيل الوصول'), t('Premium bathroom amenities', 'مستلزمات حمام فاخرة')],
        images: [heroFour, heroSix],
        availability: [makeAvailability('shak-suite-1', '2026-04-01', '2026-04-30', 3, 1880), makeAvailability('shak-suite-2', '2026-05-01', '2026-05-20', 2, 2010)]
      }
    ],
    reviews: [
      createReview('review-shak-1', 'Amina Khaled', 'أمينة خالد', 'The hotel felt polished from arrival to checkout, and the booking details were clear.', 'كانت التجربة منظمة منذ الوصول وحتى المغادرة، وتفاصيل الحجز كانت واضحة جداً.', 5, 'hotel-shakereen'),
      createReview('review-shak-2', 'Omar Hegazy', 'عمر حجازي', 'A comfortable Madinah stay with fast service and a reliable front-office team.', 'إقامة مريحة في المدينة مع خدمة سريعة وفريق استقبال يعتمد عليه.', 4, 'hotel-shakereen')
    ]
  },
  {
    id: 'hotel-taqwa',
    slug: 'diar-al-taqwa',
    name: t('Diyar Al Taqwa Hotel', 'فندق ديار التقوى'),
    city: 'madinah',
    cityLabel: t('Al Madinah Al Munawwarah', 'المدينة المنورة'),
    starRating: 4,
    roomCount: 144,
    badge: t('Boutique Managed Stay', 'فندق بوتيك مُدار'),
    heroImage: heroSix,
    primaryImage: heroSix,
    shortDescription: t('A compact managed property in Madinah focused on calm hospitality and efficient guest support.', 'فندق مُدار في المدينة يركز على الضيافة الهادئة والخدمة المنضبطة وسهولة الحركة.'),
    description: t('Diyar Al Taqwa Hotel is designed as a quieter hospitality choice in Madinah, where the guest experience prioritizes clarity, cleanliness, and smooth operational control.', 'فندق ديار التقوى خيار ضيافة أكثر هدوءًا في المدينة المنورة، يركز على الوضوح والنظافة والانضباط التشغيلي ضمن مخزون غرف أكثر خصوصية.'),
    address: t('Northern Central Zone, Al Madinah Al Munawwarah', 'المنطقة المركزية الشمالية، المدينة المنورة'),
    gallery: [
      createGalleryItem('taqwa-exterior', 'exterior', heroSix, 'Diyar Al Taqwa Exterior', 'واجهة ديار التقوى', 'Elegant exterior composition with refined entrance lighting.', 'واجهة أنيقة بإضاءة مدخل راقية.'),
      createGalleryItem('taqwa-lobby', 'lobby', heroOne, 'Arrival Hall', 'صالة الوصول', 'A calm reception setting tailored for quick guest support.', 'مساحة استقبال هادئة ومصممة لخدمة ضيوف سريعة.'),
      createGalleryItem('taqwa-room', 'rooms', heroFour, 'Standard Room', 'غرفة قياسية', 'A compact, balanced room for short and medium stays.', 'غرفة متوازنة تناسب الإقامات القصيرة والمتوسطة.'),
      createGalleryItem('taqwa-suite', 'suites', heroFive, 'Junior Suite', 'جناح جونيور', 'A private suite setup for guests who need more space.', 'جناح عملي لمن يحتاج مساحة إضافية وخصوصية أكبر.'),
      createGalleryItem('taqwa-amenities', 'amenities', heroTwo, 'Quiet Service Areas', 'مناطق الخدمة', 'Operational spaces built around a smooth guest flow.', 'مناطق خدمة تدعم انسيابية تجربة الضيف.')
    ],
    amenityHighlights: [t('Quiet hospitality style', 'أسلوب ضيافة هادئ'), t('Compact and efficient operations', 'تشغيل منظم وفعّال'), t('Suitable for short stays', 'مناسب للإقامات القصيرة'), t('Central Madinah access', 'وصول ممتاز داخل المدينة')],
    roomTypes: [
      {
        id: 'taqwa-standard',
        name: t('Standard Room', 'غرفة قياسية'),
        category: 'room',
        occupancy: 2,
        size: t('28 sqm', '28 م²'),
        beds: t('1 Queen Bed', 'سرير كوين'),
        baseRate: 720,
        currency: 'SAR',
        description: t('A practical room for guests looking for clarity, comfort, and fast access to services.', 'غرفة عملية لمن يبحث عن الوضوح والراحة وسهولة الوصول إلى الخدمات.'),
        amenities: [t('Work desk', 'مكتب عمل'), t('Mini fridge', 'ثلاجة صغيرة'), t('Fast Wi-Fi', 'إنترنت سريع')],
        images: [heroFour, heroOne],
        availability: [makeAvailability('taqwa-standard-1', '2026-04-01', '2026-04-09', 10, 720), makeAvailability('taqwa-standard-2', '2026-04-10', '2026-04-20', 0, 760, true), makeAvailability('taqwa-standard-3', '2026-04-21', '2026-05-20', 8, 780)]
      },
      {
        id: 'taqwa-junior-suite',
        name: t('Junior Suite', 'جناح جونيور'),
        category: 'suite',
        occupancy: 3,
        size: t('48 sqm', '48 م²'),
        beds: t('1 King Bed', 'سرير كينج'),
        baseRate: 1180,
        currency: 'SAR',
        description: t('A comfortable suite for guests who want a quieter stay with extra room and better circulation.', 'جناح مريح للضيوف الذين يفضلون إقامة هادئة مع مساحة أكبر.'),
        amenities: [t('Separate sitting area', 'جلسة مستقلة'), t('Premium linen', 'بياضات فاخرة'), t('Additional wardrobe space', 'خزائن إضافية')],
        images: [heroFive, heroSix],
        availability: [makeAvailability('taqwa-suite-1', '2026-04-01', '2026-04-12', 2, 1180), makeAvailability('taqwa-suite-2', '2026-04-13', '2026-04-22', 0, 1230, true), makeAvailability('taqwa-suite-3', '2026-04-23', '2026-05-20', 3, 1260)]
      }
    ],
    reviews: [createReview('review-taqwa-1', 'Nora Aziz', 'نورا عزيز', 'The stay was calm and organized, exactly what we wanted in Madinah.', 'الإقامة كانت هادئة ومنظمة، وهذا بالضبط ما كنا نبحث عنه في المدينة.', 4, 'hotel-taqwa')]
  },
  {
    id: 'hotel-nasaem',
    slug: 'nasaem-al-jiwar',
    name: t('Nasaem Al Jiwar Hotel', 'فندق نسائم الجوار'),
    city: 'makkah',
    cityLabel: t('Makkah Al Mukarramah', 'مكة المكرمة'),
    starRating: 5,
    roomCount: 731,
    badge: t('High Capacity in Makkah', 'سعة عالية في مكة'),
    heroImage: heroTwo,
    primaryImage: heroTwo,
    shortDescription: t('A high-capacity Makkah hotel built for strong seasonal operations and structured guest movement.', 'فندق كبير في مكة المكرمة مصمم لاستيعاب المواسم بكفاءة عالية وحركة ضيوف منظمة.'),
    description: t('Nasaem Al Jiwar Hotel in Makkah is structured for high-demand seasons, combining scale, operational discipline, and accommodation options that serve pilgrims, families, and organized groups.', 'فندق نسائم الجوار في مكة المكرمة مجهز للمواسم عالية الطلب، ويجمع بين السعة الكبيرة والانضباط التشغيلي وخيارات إقامة مناسبة للحجاج والعائلات والمجموعات.'),
    address: t('Makkah Central District', 'المنطقة المركزية، مكة المكرمة'),
    gallery: [
      createGalleryItem('nasaem-exterior', 'exterior', heroTwo, 'Nasaem Exterior', 'واجهة نسائم الجوار', 'Large-scale exterior presence shaped for heavy guest circulation.', 'واجهة كبيرة مناسبة لحركة ضيوف مكثفة.'),
      createGalleryItem('nasaem-lobby', 'lobby', heroOne, 'Reception Experience', 'تجربة الاستقبال', 'A lobby layout focused on flow and large-volume arrivals.', 'تصميم استقبال مهيأ للتعامل مع أعداد كبيرة من الضيوف.'),
      createGalleryItem('nasaem-room', 'rooms', heroFive, 'Twin Room', 'غرفة مزدوجة', 'Comfortable room setup for pilgrims and short city stays.', 'غرفة مريحة مناسبة للحجاج والإقامات القصيرة.'),
      createGalleryItem('nasaem-suite', 'suites', heroFour, 'Senior Suite', 'جناح سينيور', 'A larger suite option with higher privacy and lounge space.', 'جناح أكبر مع خصوصية أعلى وصالة جلوس.'),
      createGalleryItem('nasaem-amenities', 'amenities', heroThree, 'Hotel Facilities', 'مرافق الفندق', 'Hospitality facilities designed for high-occupancy operations.', 'مرافق مصممة لخدمة الإشغال المرتفع بكفاءة.')
    ],
    amenityHighlights: [t('Large room inventory', 'مخزون غرف كبير'), t('Strong seasonal readiness', 'جاهزية موسمية عالية'), t('Group-friendly operations', 'مناسب للمجموعات'), t('Premium guest handling flow', 'تنظيم احترافي لحركة الضيوف')],
    roomTypes: [
      {
        id: 'nasaem-classic',
        name: t('Classic Twin Room', 'غرفة كلاسيك مزدوجة'),
        category: 'room',
        occupancy: 2,
        size: t('30 sqm', '30 م²'),
        beds: t('2 Twin Beds', 'سريران منفصلان'),
        baseRate: 860,
        currency: 'SAR',
        description: t('A practical twin room for pilgrims and small groups with easy movement and efficient storage.', 'غرفة مزدوجة عملية للحجاج والمجموعات الصغيرة مع سهولة حركة ومساحة تخزين جيدة.'),
        amenities: [t('Twin layout', 'توزيع بسريرين'), t('Prayer preparation area', 'مساحة تجهيز مناسبة'), t('Satellite TV', 'تلفاز فضائي')],
        images: [heroFive, heroTwo],
        availability: [makeAvailability('nasaem-classic-1', '2026-04-01', '2026-04-25', 40, 860), makeAvailability('nasaem-classic-2', '2026-04-26', '2026-05-20', 22, 910)]
      },
      {
        id: 'nasaem-triple',
        name: t('Triple Guest Room', 'غرفة ثلاثية'),
        category: 'room',
        occupancy: 3,
        size: t('36 sqm', '36 م²'),
        beds: t('3 Single Beds', '3 أسرة مفردة'),
        baseRate: 980,
        currency: 'SAR',
        description: t('A larger room mix suited for group travel, pilgrimage, and practical multi-guest stays.', 'غرفة أكبر مناسبة لرحلات المجموعات والحج والإقامات العملية متعددة الضيوف.'),
        amenities: [t('Extra storage', 'مساحة تخزين إضافية'), t('Flexible seating', 'جلسة مرنة'), t('Daily housekeeping', 'خدمة غرف يومية')],
        images: [heroTwo, heroThree],
        availability: [makeAvailability('nasaem-triple-1', '2026-04-01', '2026-04-18', 16, 980), makeAvailability('nasaem-triple-2', '2026-04-19', '2026-05-20', 12, 1030)]
      },
      {
        id: 'nasaem-senior-suite',
        name: t('Senior Suite', 'جناح سينيور'),
        category: 'suite',
        occupancy: 4,
        size: t('70 sqm', '70 م²'),
        beds: t('1 King Bed + Living Area', 'سرير كينج + معيشة'),
        baseRate: 2140,
        currency: 'SAR',
        description: t('A premium suite for longer stays, family comfort, and better privacy inside a large Makkah operation.', 'جناح فاخر للإقامات الأطول وراحة العائلة وخصوصية أعلى داخل فندق كبير في مكة.'),
        amenities: [t('Living room', 'غرفة معيشة'), t('Premium service line', 'خدمة مميزة'), t('Additional bath area', 'منطقة حمام إضافية')],
        images: [heroFour, heroSix],
        availability: [makeAvailability('nasaem-senior-1', '2026-04-01', '2026-04-30', 5, 2140), makeAvailability('nasaem-senior-2', '2026-05-01', '2026-05-20', 3, 2260)]
      }
    ],
    reviews: [
      createReview('review-nasaem-1', 'Samir Nabil', 'سمير نبيل', 'The hotel handled high occupancy professionally and our booking was smooth.', 'الفندق تعامل مع الإشغال العالي باحترافية والحجز كان سلساً جداً.', 5, 'hotel-nasaem'),
      createReview('review-nasaem-2', 'Leila Mansour', 'ليلى منصور', 'A strong Makkah option for groups, with organized movement and clear communication.', 'خيار قوي في مكة للمجموعات مع تنظيم ممتاز ووضوح في التواصل.', 4, 'hotel-nasaem')
    ]
  }
];

export const brandTestimonialsSeed = [
  createReview('brand-review-1', 'Karim Fares', 'كريم فارس', 'A clear hospitality brand with excellent communication and structured operations.', 'علامة ضيافة واضحة بتواصل ممتاز وتشغيل منظم للغاية.', 5, null),
  createReview('brand-review-2', 'Maya Rahim', 'مايا رحيم', 'The brand language feels premium while the actual booking flow stays simple and practical.', 'لغة العلامة التجارية راقية بينما يظل مسار الحجز بسيطاً وعملياً.', 5, null),
  createReview('brand-review-3', 'Hassan Adel', 'حسن عادل', 'Strong positioning for a multi-hotel company with distinct property identities.', 'تموضع قوي لشركة متعددة الفنادق مع شخصية واضحة لكل فندق.', 4, null)
];
