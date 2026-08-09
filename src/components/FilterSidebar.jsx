import React from 'react';
import { Filter, Star, ShieldCheck, RotateCcw, CheckSquare, Square, CircleDot, Circle } from 'lucide-react';
import { getTranslation } from '../services/i18n';

export default function FilterSidebar({
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  selectedProvider,
  setSelectedProvider,
  selectedAmenities,
  setSelectedAmenities,
  activeTab,
  onResetFilters,
  lang = 'en',
  isRtl = false
}) {
  const providers = activeTab === 'hotels'
    ? ['All Providers', 'Booking.com', 'Agoda']
    : activeTab === 'rentals'
    ? ['All Providers', 'VRBO', 'Stay22', 'Airbnb Alternative']
    : ['All Providers', 'DiscoverCars', 'Rentalcars.com', 'Sixt', 'Hertz'];

  const availableAmenities = activeTab === 'cars'
    ? ['Automatic', 'Unlimited Mileage', 'Collision Damage Waiver', 'Electric / Hybrid', 'GPS Navigation']
    : ['Free WiFi', 'Swimming Pool', 'Eiffel View', 'Oceanfront Pool', 'Spa & Wellness', 'Air Conditioning'];

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const activeRtl = isRtl || lang === 'ar';

  return (
    <div className="brand-card" dir={activeRtl ? 'rtl' : 'ltr'} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--color-paper)' }}>
      {/* Sidebar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'var(--border-w-primary) solid var(--color-ink)', paddingBottom: '0.85rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Filter size={20} color="var(--color-ink)" /> {getTranslation('filterOptions', lang)}
        </h3>
        <button
          className="brand-btn-primary"
          onClick={onResetFilters}
          style={{
            padding: '0.3rem 0.6rem',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            minHeight: '44px'
          }}
        >
          <RotateCcw size={14} /> {getTranslation('reset', lang)}
        </button>
      </div>

      {/* Max Price Range Slider */}
      <div className="brand-card" style={{ padding: '1rem', backgroundColor: 'var(--color-paper-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.8rem' }}>
          <span>{getTranslation('maxPrice', lang)} / {activeTab === 'cars' ? getTranslation('day', lang) : getTranslation('night', lang)}</span>
          <span style={{ backgroundColor: 'var(--color-paper)', border: 'var(--border-w-primary) solid var(--color-ink)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-default)' }}>${maxPrice}</span>
        </div>
        <input
          type="range"
          min="40"
          max="600"
          step="20"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--color-accent)',
            cursor: 'pointer',
            height: '10px',
            background: 'var(--color-paper)',
            border: 'var(--border-w-primary) solid var(--color-ink)',
            borderRadius: 'var(--radius-default)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.4rem', color: 'var(--color-ink)' }}>
          <span>$40</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Guest Rating Threshold */}
      <div className="brand-card" style={{ padding: '1rem', backgroundColor: 'var(--color-paper-card)' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem', color: 'var(--color-ink)' }}>
          {getTranslation('minRating', lang)}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[0, 4.5, 4.8, 4.9].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0.45rem 0',
                backgroundColor: minRating === rating ? 'var(--color-accent)' : 'var(--color-paper)',
                color: 'var(--color-ink)',
                border: 'var(--border-w-primary) solid var(--color-ink)',
                borderRadius: 'var(--radius-default)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                boxShadow: minRating === rating ? 'inset 2px 2px 0px var(--color-ink)' : '2px 2px 0px var(--color-ink)',
                transform: minRating === rating ? 'translate(2px, 2px)' : 'none',
                transition: 'all 0.1s'
              }}
            >
              {rating === 0 ? getTranslation('any', lang) : `${rating}+`}
              {rating > 0 && <Star size={12} fill={minRating === rating ? "var(--color-ink)" : "transparent"} color="var(--color-ink)" />}
            </button>
          ))}
        </div>
      </div>

      {/* Affiliate Partner Network Selector */}
      <div className="brand-card" style={{ padding: '1rem', backgroundColor: 'var(--color-paper-card)' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem', color: 'var(--color-ink)' }}>
          {getTranslation('partnerNetwork', lang)}
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {providers.map((provider) => (
            <button
              key={provider}
              onClick={() => setSelectedProvider(provider)}
              style={{
                textAlign: 'left',
                minHeight: '44px',
                padding: '0.5rem 0.8rem',
                backgroundColor: selectedProvider === provider ? 'var(--color-accent)' : 'var(--color-paper)',
                color: 'var(--color-ink)',
                border: 'var(--border-w-primary) solid var(--color-ink)',
                borderRadius: 'var(--radius-default)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: selectedProvider === provider ? 'inset 2px 2px 0px var(--color-ink)' : '2px 2px 0px var(--color-ink)'
              }}
            >
              {selectedProvider === provider ? <CircleDot size={16} color="var(--color-ink)" /> : <Circle size={16} color="var(--color-ink)" />}
              {provider === 'All Providers' ? getTranslation('allProviders', lang) : provider}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div className="brand-card" style={{ padding: '1rem', backgroundColor: 'var(--color-paper-card)' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-ink)', display: 'block', marginBottom: '0.8rem' }}>
          {getTranslation('amenities', lang)}
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {availableAmenities.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <div
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                style={{ minHeight: '44px', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                {isChecked ? (
                  <CheckSquare size={18} color="var(--color-ink)" />
                ) : (
                  <Square size={18} color="var(--color-ink)" />
                )}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
