// Live Travel API Simulation Engine — Amadeus / Skyscanner / Travelpayouts GDS Layer

import { HOTELS_DATA, VACATION_RENTALS_DATA, CAR_RENTALS_DATA } from './mockData';

export const fetchLiveTravelDeals = ({ category = 'hotels', destination = 'All', maxPrice = 1000, minRating = 0, provider = 'All Providers' }) => {
  let dataset = [];
  if (category === 'hotels') dataset = HOTELS_DATA;
  else if (category === 'rentals') dataset = VACATION_RENTALS_DATA;
  else if (category === 'cars') dataset = CAR_RENTALS_DATA;

  // Apply live rate fluctuations & inventory availability counters
  const liveResults = dataset.map(item => {
    // Generate realistic dynamic surge factor based on demand (between -5% and +8%)
    const pseudoRandomSurge = ((item.id * 17) % 13 - 6) / 100;
    const itemPrice = item.price || item.dailyRate || 100;
    const livePrice = Math.max(20, Math.round(itemPrice * (1 + pseudoRandomSurge)));
    const inventoryLeft = ((item.id * 7) % 4) + 1; // 1 to 4 rooms/cars left

    return {
      ...item,
      price: livePrice,
      inventoryLeft,
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  });

  // Filter based on query parameters
  const filtered = liveResults.filter(item => {
    const locationMatch = destination === 'All' || 
      (item.locationEn && item.locationEn.toLowerCase().includes(destination.toLowerCase())) ||
      (item.locationAr && item.locationAr.includes(destination));
    
    const priceMatch = item.price <= maxPrice;
    const ratingMatch = minRating === 0 || item.rating >= minRating;
    const providerMatch = provider === 'All Providers' || item.provider === provider;

    return locationMatch && priceMatch && ratingMatch && providerMatch;
  });

  return Promise.resolve(filtered);
};

