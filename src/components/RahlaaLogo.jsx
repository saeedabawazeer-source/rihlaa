import React from 'react';
import { Compass } from 'lucide-react';
import { getTranslation } from '../services/i18n';

export default function RahlaaLogo({ lang = 'en', submarkOnly = false, size = 'medium' }) {
  const isAr = lang === 'ar';
  
  const iconSizes = {
    small: 20,
    medium: 24,
    large: 32
  };

  const badgeSizes = {
    small: '36px',
    medium: '44px',
    large: '56px'
  };

  const fontSizeMap = {
    small: '1.2rem',
    medium: '1.5rem',
    large: '2rem'
  };

  return (
    <div className="rahlaa-logo-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', userSelect: 'none' }}>
      {/* Submark (Icon-only reduction inside bold neobrutalist badge) */}
      <div style={{
        background: 'var(--color-accent)',
        border: 'var(--border-w-primary) solid var(--color-ink-border)',
        width: badgeSizes[size] || '44px',
        height: badgeSizes[size] || '44px',
        borderRadius: 'var(--radius-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        flexShrink: 0
      }}>
        <Compass size={iconSizes[size] || 24} color="#131110" />
      </div>

      {!submarkOnly && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-display)',
              fontWeight: 900,
              fontSize: fontSizeMap[size] || '1.5rem',
              color: 'var(--color-ink)',
              letterSpacing: isAr ? '0' : '-0.03em',
              lineHeight: 1
            }}>
              {isAr ? 'رحلاء' : 'Rahlaa'}
            </span>
            <span className="brand-badge brand-badge-teal" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
              {getTranslation('oneWord', lang)}
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-ink)', opacity: 0.75, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.15rem' }}>
            {getTranslation('brandTagline', lang)}
          </span>
        </div>
      )}
    </div>
  );
}
