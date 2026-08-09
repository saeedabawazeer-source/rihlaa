// Affiliate Program & Referral Link Manager — Rahlaa Brand

const DEFAULT_AFFILIATE_CONFIG = {
  travelpayoutsMarker: '762177',
  travelpayoutsTrs: '560249',
  klookDeepLink: 'https://klook.tpx.lu/vw9vOsLH',
  aviasalesDeepLink: 'https://aviasales.tpx.lu/g7Ibnl8a',
  bookingComAid: '304142',
  vrboAffiliateId: 'vrbo_partner_882',
  discoverCarsId: 'dc_aff_1092',
  agodaCid: '1892019',
  stay22ApiKey: 'stay22_demo_key',
  mode: 'live'
};

const STORAGE_KEY = 'rahlaa_affiliate_settings';
const LOGS_STORAGE_KEY = 'rahlaa_click_logs';

export const getUrlSearchParams = () => {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      init_marker: params.get('init_marker') || params.get('marker') || null,
      init_trs: params.get('init_trs') || params.get('trs') || null,
      init_locale: params.get('init_locale') || params.get('locale') || null
    };
  } catch (e) {
    return {};
  }
};

export const getAffiliateConfig = () => {
  const urlParams = getUrlSearchParams();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : DEFAULT_AFFILIATE_CONFIG;
    
    if (urlParams.init_marker) parsed.travelpayoutsMarker = urlParams.init_marker;
    if (urlParams.init_trs) parsed.travelpayoutsTrs = urlParams.init_trs;

    return parsed;
  } catch (e) {
    return {
      ...DEFAULT_AFFILIATE_CONFIG,
      travelpayoutsMarker: urlParams.init_marker || DEFAULT_AFFILIATE_CONFIG.travelpayoutsMarker,
      travelpayoutsTrs: urlParams.init_trs || DEFAULT_AFFILIATE_CONFIG.travelpayoutsTrs
    };
  }
};

export const saveAffiliateConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save affiliate settings:', e);
  }
};

export const buildLiveSearchUrl = ({ destination = 'Paris', category = 'hotels', checkIn = '2026-08-15', checkOut = '2026-08-22', guests = 2, provider = 'Booking.com' }) => {
  const config = getAffiliateConfig();
  const urlParams = getUrlSearchParams();
  const marker = urlParams.init_marker || config.travelpayoutsMarker || '762177';
  const trs = urlParams.init_trs || config.travelpayoutsTrs || '560249';

  const destQuery = destination === 'All' ? 'Paris' : destination;

  if (category === 'flights' || provider === 'Aviasales') {
    return config.aviasalesDeepLink || 'https://aviasales.tpx.lu/g7Ibnl8a';
  }

  if (category === 'experiences' || provider === 'Klook') {
    return config.klookDeepLink || 'https://klook.tpx.lu/vw9vOsLH';
  }

  if (category === 'cars') {
    return `https://www.discovercars.com/car-rental/search?pick_up=${encodeURIComponent(destQuery)}&pickup_date=${checkIn}&dropoff_date=${checkOut}&a_aid=${config.discoverCarsId || 'dc_aff_1092'}&data1=${marker}&trs=${trs}`;
  }

  if (category === 'rentals') {
    return `https://www.vrbo.com/search?destination=${encodeURIComponent(destQuery)}&filter_guests=${guests}&aff_id=${config.vrboAffiliateId || 'vrbo_partner_882'}&camref=${marker}&trs=${trs}`;
  }

  if (provider === 'Agoda') {
    return `https://www.agoda.com/search?city=${encodeURIComponent(destQuery)}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}&cid=${config.agodaCid || '1892019'}&tag=${marker}&trs=${trs}`;
  }

  // Default Booking.com Hotel Search
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destQuery)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests}&aid=${config.bookingComAid || '304142'}&marker=${marker}&trs=${trs}`;
};

export const buildAffiliateUrl = (item, configOverride = null) => {
  const config = configOverride || getAffiliateConfig();
  const urlParams = getUrlSearchParams();
  const marker = urlParams.init_marker || config.travelpayoutsMarker || '762177';
  const trs = urlParams.init_trs || config.travelpayoutsTrs || '560249';

  if (item.provider === 'Aviasales' || item.category === 'flights') {
    return config.aviasalesDeepLink || 'https://aviasales.tpx.lu/g7Ibnl8a';
  }

  if (item.provider === 'Klook' || item.category === 'experiences') {
    return config.klookDeepLink || 'https://klook.tpx.lu/vw9vOsLH';
  }

  if (!item.directUrl) {
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(item.locationEn || 'Paris')}&aid=${config.bookingComAid || '304142'}&marker=${marker}&trs=${trs}`;
  }

  try {
    const url = new URL(item.directUrl);

    switch (item.provider) {
      case 'Booking.com':
        url.searchParams.set('aid', config.bookingComAid || '304142');
        url.searchParams.set('marker', marker);
        url.searchParams.set('trs', trs);
        url.searchParams.set('subId', item.category || 'travel');
        break;

      case 'VRBO':
        url.searchParams.set('aff_id', config.vrboAffiliateId || 'vrbo_partner_882');
        url.searchParams.set('camref', marker);
        url.searchParams.set('trs', trs);
        break;

      case 'DiscoverCars':
        url.searchParams.set('a_aid', config.discoverCarsId || 'dc_aff_1092');
        url.searchParams.set('data1', marker);
        url.searchParams.set('trs', trs);
        break;

      case 'Agoda':
        url.searchParams.set('cid', config.agodaCid || '1892019');
        url.searchParams.set('tag', marker);
        url.searchParams.set('trs', trs);
        break;

      default:
        return `https://tp.media/r?marker=${marker}&trs=${trs}&p=5055&u=${encodeURIComponent(item.directUrl)}`;
    }

    return url.toString();
  } catch (e) {
    return item.directUrl;
  }
};

export const trackAffiliateClick = (item) => {
  const config = getAffiliateConfig();
  const urlParams = getUrlSearchParams();
  const logEntry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    itemId: item.id || 'search_' + Date.now(),
    title: item.titleEn || item.titleAr || item.title || item.locationEn || 'Search Result',
    category: item.category || 'hotels',
    provider: item.provider || 'Booking.com',
    price: item.price || 150,
    estimatedCommission: Math.round((item.price || 150) * 0.08 * 100) / 100,
    marker: urlParams.init_marker || config.travelpayoutsMarker,
    trs: urlParams.init_trs || config.travelpayoutsTrs
  };

  try {
    const existingLogs = getAffiliateLogs();
    const updatedLogs = [logEntry, ...existingLogs.slice(0, 49)];
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch (e) {
    console.error('Failed to log affiliate click:', e);
  }

  return logEntry;
};

export const getAffiliateLogs = () => {
  try {
    const saved = localStorage.getItem(LOGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const getClickAnalytics = () => {
  const logs = getAffiliateLogs();
  const totalClicks = logs.length;
  const totalEstimatedCommission = logs.reduce((acc, curr) => acc + (curr.estimatedCommission || 0), 0);

  return {
    totalClicks,
    totalEstimatedCommission: Math.round(totalEstimatedCommission * 100) / 100,
    logs
  };
};
