// Affiliate Program & Referral Link Manager — Rahlaa Brand

const DEFAULT_AFFILIATE_CONFIG = {
  travelpayoutsMarker: '492815',
  bookingComAid: '304142',
  vrboAffiliateId: 'vrbo_partner_882',
  discoverCarsId: 'dc_aff_1092',
  agodaCid: '1892019',
  stay22ApiKey: 'stay22_demo_key',
  mode: 'demo'
};

const STORAGE_KEY = 'rahlaa_affiliate_settings';
const LOGS_STORAGE_KEY = 'rahlaa_click_logs';

export const getAffiliateConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_AFFILIATE_CONFIG;
  } catch (e) {
    return DEFAULT_AFFILIATE_CONFIG;
  }
};

export const saveAffiliateConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save affiliate settings:', e);
  }
};

export const buildAffiliateUrl = (item, configOverride = null) => {
  const config = configOverride || getAffiliateConfig();
  const marker = config.travelpayoutsMarker || '492815';

  if (!item.directUrl) {
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(item.locationEn || 'Paris')}&aid=${config.bookingComAid || '304142'}`;
  }

  try {
    const url = new URL(item.directUrl);

    switch (item.provider) {
      case 'Booking.com':
        url.searchParams.set('aid', config.bookingComAid || '304142');
        url.searchParams.set('marker', marker);
        url.searchParams.set('subId', item.category || 'travel');
        break;

      case 'VRBO':
        url.searchParams.set('aff_id', config.vrboAffiliateId || 'vrbo_partner_882');
        url.searchParams.set('camref', marker);
        break;

      case 'DiscoverCars':
        url.searchParams.set('a_aid', config.discoverCarsId || 'dc_aff_1092');
        url.searchParams.set('data1', marker);
        break;

      case 'Agoda':
        url.searchParams.set('cid', config.agodaCid || '1892019');
        url.searchParams.set('tag', marker);
        break;

      default:
        return `https://tp.media/r?marker=${marker}&p=5055&u=${encodeURIComponent(item.directUrl)}`;
    }

    return url.toString();
  } catch (e) {
    return item.directUrl;
  }
};

export const trackAffiliateClick = (item) => {
  const config = getAffiliateConfig();
  const logEntry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    itemId: item.id,
    title: item.titleEn || item.titleAr || item.title || '',
    category: item.category || 'hotels',
    provider: item.provider || 'Booking.com',
    price: item.price || 150,
    estimatedCommission: Math.round((item.price || 150) * 0.08 * 100) / 100,
    marker: config.travelpayoutsMarker
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
