import React, { useState } from 'react';
import { Search, MapPin, Calendar as CalendarIcon, Users, Car, Sparkles, Check, ChevronDown } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../services/mockData';
import { getTranslation } from '../services/i18n';

export default function HeroSearch({
  activeTab,
  selectedLocation,
  setSelectedLocation,
  guests,
  setGuests,
  onSearchSubmit,
  lang
}) {
  const isAr = lang === 'ar';
  
  // Interactive Date Selector State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState('2026-08-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-22');

  const formattedCheckIn = new Date(checkInDate).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' });
  const formattedCheckOut = new Date(checkOutDate).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="section-teal" style={{
      position: 'relative',
      padding: '4rem 2rem',
      background: 'var(--color-teal)',
      color: '#FFFFFF'
    }}>
      {/* Hero Header */}
      <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
        <div className="brand-badge" style={{ marginBottom: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem', background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: 'var(--border-w-compact) solid var(--color-ink)' }}>
          <Sparkles size={14} /> {getTranslation('heroTagline', lang)}
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.12,
          marginBottom: '1rem',
          color: '#FFFFFF'
        }}>
          {activeTab === 'hotels' && getTranslation('heroTitleHotels', lang)}
          {activeTab === 'rentals' && getTranslation('heroTitleRentals', lang)}
          {activeTab === 'cars' && getTranslation('heroTitleCars', lang)}
        </h1>

        <p style={{ color: '#FFFFFF', opacity: 0.9, fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', fontWeight: 500 }}>
          {getTranslation('heroSub', lang)}
        </p>
      </div>

      {/* Console Search Box */}
      <div className="brand-card" style={{
        maxWidth: '1040px',
        margin: '0 auto',
        padding: '1.75rem',
        background: 'var(--color-paper-card)',
        color: 'var(--color-ink)',
        boxShadow: 'var(--shadow-dramatic)',
        position: 'relative'
      }}>
        <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          
          {/* Destination Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={16} color="var(--color-teal)" /> {getTranslation('destination', lang)}
            </label>
            <select
              id="hero-destination-select"
              aria-label={getTranslation('destination', lang)}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--color-paper-alt)',
                color: 'var(--color-ink)',
                border: 'var(--border-w-compact) solid var(--color-ink-border)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-default)',
                fontSize: '0.95rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer'
              }}
            >
              <option value="All">{getTranslation('allDestinations', lang)}</option>
              {POPULAR_DESTINATIONS.map(dest => (
                <option key={dest.id} value={dest.nameEn}>
                  {isAr ? dest.nameAr : dest.nameEn} ({dest.code})
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Date Range Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', position: 'relative' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CalendarIcon size={16} color="var(--color-accent)" /> {getTranslation('checkInOut', lang)}
            </label>
            
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="font-mono"
              style={{
                width: '100%',
                background: 'var(--color-paper-alt)',
                color: 'var(--color-ink)',
                border: 'var(--border-w-compact) solid var(--color-ink-border)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-default)',
                fontSize: '0.88rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{formattedCheckIn} - {formattedCheckOut} (7 {isAr ? 'ليال' : 'nights'})</span>
              <ChevronDown size={16} />
            </button>

            {/* Date Selector Popover Card */}
            {showDatePicker && (
              <div className="brand-card" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 100,
                marginTop: '8px',
                padding: '1rem',
                background: 'var(--color-paper-card)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>Check-In Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #000' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>Check-Out Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #000' }}
                    />
                  </div>
                  <button
                    type="button"
                    className="brand-btn-primary"
                    onClick={() => setShowDatePicker(false)}
                    style={{ padding: '0.4rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    <Check size={14} /> Apply Dates
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Guests / Vehicle Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {activeTab === 'cars' ? <Car size={16} color="var(--color-teal)" /> : <Users size={16} color="var(--color-teal)" />}
              {activeTab === 'cars' ? getTranslation('carType', lang) : getTranslation('guestsAndRooms', lang)}
            </label>
            {activeTab === 'cars' ? (
              <select
                id="hero-car-type-select"
                aria-label={getTranslation('carType', lang)}
                style={{
                  width: '100%',
                  background: 'var(--color-paper-alt)',
                  color: 'var(--color-ink)',
                  border: 'var(--border-w-compact) solid var(--color-ink-border)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-default)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-sm)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">{isAr ? 'جميع الفئات' : 'Any Vehicle Category'}</option>
                <option value="Electric">{isAr ? 'كهربائية / تسلا' : 'Electric / Tesla'}</option>
                <option value="Convertible">{isAr ? 'سيارة مكشوفة فاخرة' : 'Convertible / Luxury'}</option>
              </select>
            ) : (
              <select
                id="hero-guests-select"
                aria-label={getTranslation('guestsAndRooms', lang)}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'var(--color-paper-alt)',
                  color: 'var(--color-ink)',
                  border: 'var(--border-w-compact) solid var(--color-ink-border)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-default)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-sm)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value={1}>{isAr ? 'ضيف ١، غرفة ١' : '1 Guest, 1 Room'}</option>
                <option value={2}>{isAr ? 'ضيفان، غرفة ١' : '2 Guests, 1 Room'}</option>
                <option value={4}>{isAr ? '٤ ضيوف، غرفتان' : '4 Guests, 2 Rooms'}</option>
              </select>
            )}
          </div>

          {/* Primary Submit Button (Coral Amber) */}
          <button id="hero-search-submit-btn" aria-label={getTranslation('compareDeals', lang)} type="submit" className="brand-btn-primary" style={{ padding: '0.85rem 1.5rem', height: '48px', fontSize: '1.05rem', boxShadow: 'var(--shadow-md)' }}>
            <Search size={20} /> {getTranslation('compareDeals', lang)}
          </button>
        </form>

        {/* Quick Destination Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginTop: '1.25rem',
          flexWrap: 'wrap',
          fontSize: '0.85rem'
        }}>
          <span style={{ fontWeight: 800 }}>{getTranslation('popular', lang)}</span>
          {POPULAR_DESTINATIONS.map(dest => (
            <button
              key={dest.id}
              id={`hero-quick-dest-${dest.id}`}
              aria-label={`Select ${dest.nameEn}`}
              onClick={() => setSelectedLocation(dest.nameEn)}
              style={{
                background: selectedLocation === dest.nameEn ? 'var(--color-accent)' : 'var(--color-paper-alt)',
                color: 'var(--color-ink)',
                border: 'var(--border-w-compact) solid var(--color-ink-border)',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: selectedLocation === dest.nameEn ? '3px 3px 0px var(--color-ink-border)' : '1px 1px 0px var(--color-ink-border)'
              }}
            >
              {isAr ? dest.nameAr : dest.nameEn}
            </button>
          ))}
          {selectedLocation !== 'All' && (
            <button
              id="hero-clear-filter-btn"
              aria-label={getTranslation('clearFilter', lang)}
              onClick={() => setSelectedLocation('All')}
              style={{
                background: 'transparent',
                color: 'var(--color-accent)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 800,
                textDecoration: 'underline'
              }}
            >
              {getTranslation('clearFilter', lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
