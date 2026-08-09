import React, { useState } from 'react';
import { Star, MapPin, ExternalLink, Heart, Users, Bed, Car, ShieldCheck, Flame, Zap } from 'lucide-react';
import { getTranslation } from '../services/i18n';

export default function ListingCard({ item, currency, onSelectDeal, isFavorite, onToggleFavorite, lang }) {
  const [hovered, setHovered] = useState(false);

  const currencySymbol = currency === 'EUR €' ? '€' : currency === 'GBP £' ? '£' : '$';
  const currencyMultiplier = currency === 'EUR €' ? 0.92 : currency === 'GBP £' ? 0.78 : 1.0;
  
  const price = item.price || item.dailyRate || 0;
  const originalPrice = item.originalPrice || item.originalRate || null;
  
  const displayPrice = Math.round(price * currencyMultiplier);
  const displayOriginalPrice = originalPrice ? Math.round(originalPrice * currencyMultiplier) : null;

  const title = lang === 'ar' ? (item.titleAr || item.titleEn) : (item.titleEn || item.titleAr || '');
  const location = lang === 'ar' ? (item.locationAr || item.locationEn) : (item.locationEn || '');
  const address = lang === 'ar' ? (item.addressAr || item.addressEn) : (item.addressEn || '');
  const transmission = lang === 'ar' ? (item.transmissionAr || 'أوتوماتيك') : (item.transmissionEn || 'Automatic');
  const amenities = lang === 'ar' ? (item.amenitiesAr || item.featuresAr || []) : (item.amenitiesEn || item.featuresEn || []);

  const viewersCount = ((item.id * 13) % 18) + 8;
  const roomsLeft = ((item.id * 5) % 3) + 1;

  return (
    <article
      className="brand-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', borderBottom: 'var(--border-w-primary) solid var(--color-ink-border)' }}>
        <img
          src={item.image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s var(--ease-bounce)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />

        <div style={{ position: 'absolute', top: '12px', left: lang === 'ar' ? 'auto' : '12px', right: lang === 'ar' ? '12px' : 'auto', zIndex: 2 }}>
          <span className="brand-badge brand-badge-teal">
            <ShieldCheck size={12} /> {item.provider}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          style={{
            position: 'absolute',
            top: '12px',
            right: lang === 'ar' ? 'auto' : '12px',
            left: lang === 'ar' ? '12px' : 'auto',
            zIndex: 2,
            background: isFavorite ? 'var(--color-accent)' : 'var(--color-paper-card)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Heart size={18} color={isFavorite ? 'var(--color-ink)' : 'var(--color-ink)'} fill={isFavorite ? 'var(--color-ink)' : 'none'} />
        </button>

        <div style={{ position: 'absolute', bottom: '12px', left: lang === 'ar' ? 'auto' : '12px', right: lang === 'ar' ? '12px' : 'auto', zIndex: 2 }}>
          <span className="brand-badge brand-badge-accent">
            <Star size={12} fill="var(--color-ink)" color="var(--color-ink)" /> {item.rating}
            {item.reviewsCount && <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>({item.reviewsCount})</span>}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--color-ink)',
            marginBottom: '0.6rem',
            padding: '0.35rem 0.6rem',
            background: 'var(--color-paper-alt)',
            borderRadius: 'var(--radius-default)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent-dark)' }}>
              <Flame size={13} fill="var(--color-accent)" color="var(--color-accent)" /> {viewersCount} {lang === 'ar' ? 'يشاهدون الآن' : 'viewing'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-teal)' }}>
              <Zap size={13} color="var(--color-teal)" /> {roomsLeft} {lang === 'ar' ? 'متبقي بهذا السعر' : 'left at this rate'}
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ink)', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
            <MapPin size={14} color="var(--color-teal)" /> {location} • {address}
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.6rem', color: 'var(--color-ink)', lineHeight: 1.3 }}>
            {title}
          </h3>

          {item.category === 'rentals' && (
            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink)', opacity: 0.8, marginBottom: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={14} /> {item.maxGuests} {getTranslation('guestsMax', lang)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bed size={14} /> {item.bedrooms} {getTranslation('beds', lang)}</span>
            </div>
          )}

          {item.category === 'cars' && (
            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink)', opacity: 0.8, marginBottom: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={14} /> {item.passengers} {getTranslation('seats', lang)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Car size={14} /> {transmission}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="brand-badge" style={{ fontSize: '0.72rem' }}>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: 'var(--border-w-compact) solid var(--color-ink-border)'
        }}>
          <div>
            {displayOriginalPrice && (
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-ink)', opacity: 0.5, textDecoration: 'line-through', marginRight: '0.3rem' }}>
                {currencySymbol}{displayOriginalPrice}
              </span>
            )}
            <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-ink)' }}>
              {currencySymbol}{displayPrice}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ink)', opacity: 0.7, marginLeft: '0.2rem' }}>
              / {item.category === 'cars' ? getTranslation('day', lang) : getTranslation('night', lang)}
            </span>
          </div>

          <button
            className="brand-btn-primary"
            onClick={() => onSelectDeal(item)}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
          >
            {getTranslation('checkDeal', lang)} <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
