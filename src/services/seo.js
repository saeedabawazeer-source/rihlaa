// SEO & Dynamic Metadata Service for Rahlaa (رحلاء)

export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

export const PAGE_SEO_METADATA = {
  landing: {
    en: {
      title: 'Rahlaa (رحلاء) | Wander Further — Stays, Villas & Car Hire',
      description: 'Discover and compare live travel deals across Booking.com, VRBO, DiscoverCars, Agoda, and Stay22 with direct referral tracking & rewards.',
      keywords: 'travel deals, luxury hotels, vacation rentals, airbnb alternatives, car hire, travel rewards'
    },
    ar: {
      title: 'رحلاء | الترحال والاستكشاف — الفنادق، فيلات العطلات وتأجير السيارات',
      description: 'قارن أفضل عروض السفر والإقامة عبر بوكينج، فيربو، ديسكوفر كارز، وأجودا مع تتبع الإحالات ومكافآت السفر.',
      keywords: 'عروض سفر, فنادق فاخرة, شقق مفروشة, تأجير سيارات, تتبع إحالة'
    }
  },
  hotels: {
    en: {
      title: 'Luxury Hotels & Resorts | Rahlaa Travel Comparison',
      description: 'Search and compare 5-star resorts, boutique city hotels, and budget stays worldwide with price guarantees.',
      keywords: 'hotel booking, luxury resorts, boutique hotels, cheap hotel deals'
    },
    ar: {
      title: 'الفنادق والمنتجعات الفاخرة | رحلاء لمقارنة الأسعار',
      description: 'ابحث وقارن بين المنتجات الفاخرة ٥ نجوم، فنادق المدن البوتيكية، والإقامات الاقتصادية مع ضمان أفضل السعر.',
      keywords: 'حجز فنادق, منتجعات فاخرة, فنادق بوتيك, فنادق رخيصة'
    }
  },
  rentals: {
    en: {
      title: 'Airbnb Alternatives & Vacation Rentals | Rahlaa',
      description: 'Browse private glass villas, mountain chalets, and city penthouses on VRBO and Stay22.',
      keywords: 'vacation rentals, airbnb alternative, luxury villas, chalets, private homes'
    },
    ar: {
      title: 'بدائل إير بي إن بي وبيوت العطلات | رحلاء',
      description: 'تصفح الفيلات الزجاجية الخاصة، الشاليهات الجبلية، والبنتهاوس السكني عبر فيربو وستاي22.',
      keywords: 'بيوت عطلات, بدائل اير بي ان بي, فيلات فاخرة, شاليهات'
    }
  },
  cars: {
    en: {
      title: 'Car Rentals & SUV Hire | Rahlaa',
      description: 'Compare car hire deals across Sixt, Hertz, Avis, and Enterprise on DiscoverCars.',
      keywords: 'car rental, SUV hire, electric vehicle rental, Tesla rental, cheap car hire'
    },
    ar: {
      title: 'تأجير السيارات والدفع الرباعي | رحلاء',
      description: 'قارن عروض تأجير السيارات عبر سيكست، هيرتز، أفيس، وإنترايز على ديسكوفر كارز.',
      keywords: 'تأجير سيارات, سيارات دفع رباعي, سيارات كهربائية, تسلا'
    }
  },
  map: {
    en: {
      title: 'Interactive Travel Map Explorer | Rahlaa',
      description: 'Explore hotel stays, vacation homes, and car hire hubs visually on an interactive map.',
      keywords: 'travel map, hotel map search, rental map view'
    },
    ar: {
      title: 'خريطة السفر التفاعلية | رحلاء',
      description: 'استكشف الفنادق، بيوت العطلات، ومراكز تأجير السيارات على خريطة تفاعلية مباشرة.',
      keywords: 'خريطة سفر, خريطة الفنادق, خريطة السيارات'
    }
  },
  rewards: {
    en: {
      title: 'Rahlaa Rewards & Travel Gamification | Earn XP & Vouchers',
      description: 'Earn travel XP, complete daily quests, and unlock exclusive $15 - $50 OFF referral vouchers.',
      keywords: 'travel rewards, travel quests, discount coupons, travel gamification'
    },
    ar: {
      title: 'مكافآت رحلاء والترحال المقارن | اكسب نقاط وقسائم خصم',
      description: 'اكسب نقاط الخبرة، أكمل المهام اليومية، وافتح قسائم خصم حصرية من ١٥$ إلى ٥٠$.',
      keywords: 'مكافآت سفر, مهام يومية, قسائم خصم سفر'
    }
  },
  analytics: {
    en: {
      title: 'Affiliate Analytics & Revenue Hub | Rahlaa',
      description: 'Track real-time referral outbound clicks, conversion rates, and estimated commission payouts.',
      keywords: 'affiliate analytics, travel payouts, referral tracking'
    },
    ar: {
      title: 'مركز تحليلات وأرباح الإحالة | رحلاء',
      description: 'تتبع نقرات الإحالة الصادرة، معدلات التحويل، وعمولات الأرباح التقديرية.',
      keywords: 'تحليلات الإحالة, ارباح التسويق بالعمولة'
    }
  },
  about: {
    en: {
      title: 'About Rahlaa | Our Mission & Affiliate Transparency',
      description: 'Learn about Rahlaa’s core brand strategy (OneWord: Wander), partner network transparency, and travel engine.',
      keywords: 'about rahlaa, travel affiliate disclosure, travel strategy'
    },
    ar: {
      title: 'عن رحلاء | مهمتنا وشفافية التسويق بالعمولة',
      description: 'تعرف على استراتيجية رحلاء (الترحال)، وشفافية شبكات الشركاء الإحالة.',
      keywords: 'عن رحلاء, شفافية التسويق بالعمولة'
    }
  }
};

export const updateSEOMeta = (page = 'landing', lang = 'en') => {
  try {
    const meta = PAGE_SEO_METADATA[page]?.[lang] || PAGE_SEO_METADATA['landing']['en'];
    
    // Update Document Title
    document.title = meta.title;

    // Helper to set meta attribute
    const setMetaTag = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, val);
      }
    };

    setMetaTag('meta[name="description"]', 'content', meta.description);
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:image"]', 'content', DEFAULT_OG_IMAGE);
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'content', DEFAULT_OG_IMAGE);
  } catch (e) {
    console.error('Error updating SEO meta:', e);
  }
};
