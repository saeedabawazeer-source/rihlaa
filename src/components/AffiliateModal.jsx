import React, { useState, useEffect } from 'react';
import { ExternalLink, ShieldCheck, X, Sparkles, ArrowRight } from 'lucide-react';
import { buildAffiliateUrl, trackAffiliateClick, getAffiliateConfig } from '../services/affiliateManager';
import { getTranslation } from '../services/i18n';

export default function AffiliateModal({ item, onClose, currency, lang }) {
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [config, setConfig] = useState(getAffiliateConfig());

  useEffect(() => {
    if (item) {
      const url = buildAffiliateUrl(item, config);
      setAffiliateUrl(url);
      trackAffiliateClick(item);
    }
  }, [item]);

  if (!item) return null;

  const currencySymbol = currency === 'EUR €' ? '€' : currency === 'GBP £' ? '£' : '$';
  const currencyMultiplier = currency === 'EUR €' ? 0.92 : currency === 'GBP £' ? 0.78 : 1.0;

  const price = item.price || item.dailyRate || 0;
  const rawPrice = Math.round(price * currencyMultiplier);
  const title = lang === 'ar' ? (item.titleAr || item.titleEn) : item.titleEn;
  const location = lang === 'ar' ? (item.locationAr || item.locationEn) : item.locationEn;

  const urgencyCount = ((item.id.charCodeAt(1) || 5) * 7) % 30 + 12;

  const handleDirectRedirect = () => {
    window.open(affiliateUrl || item.directUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(19, 17, 16, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="brand-card" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '2rem',
        background: 'var(--color-paper-card)',
        border: 'var(--border-w-primary) solid var(--color-ink-border)',
        boxShadow: 'var(--shadow-dramatic)',
        position: 'relative',
        borderRadius: 'var(--radius-default)'
      }}>
        <button
          onClick={onClose}
          id="affiliate-modal-close-btn"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: lang === 'ar' ? 'auto' : '16px',
            left: lang === 'ar' ? '16px' : 'auto',
            background: 'var(--color-paper-alt)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            color: 'var(--color-ink)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            color: 'var(--color-ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem auto',
            border: 'var(--border-w-primary) solid var(--color-ink-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={28} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem' }}>
            {getTranslation('redirecting', lang)} ({item.provider})
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-ink)', opacity: 0.7, fontWeight: 600 }}>
            {lang === 'ar' ? 'تم العثور على أفضل سعر. يتم تحويلك الآن.' : 'We found you the best rate. Redirecting now.'}
          </p>
        </div>

        <div className="brand-card" style={{
          padding: '1.1rem',
          marginBottom: '1.25rem',
          background: 'var(--color-paper-alt)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: 'var(--border-w-compact) solid var(--color-ink-border)', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
            <img
              src={item.image}
              alt={title}
              style={{ width: '80px', height: '65px', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-teal)', fontWeight: 800 }}>
                {location} • {item.provider}
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {title}
              </h4>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
              <span>{lang === 'ar' ? 'السعر' : 'Standard Rate'}:</span>
              <span className="font-mono">{currencySymbol}{rawPrice}/{item.category === 'cars' ? getTranslation('day', lang) : getTranslation('night', lang)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, borderTop: 'var(--border-w-compact) solid var(--color-ink-border)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
              <span>{lang === 'ar' ? 'أفضل سعر عبر موقع' : 'Best rate found on'} {item.provider}:</span>
              <span className="font-mono" style={{ color: 'var(--color-accent)' }}>{currencySymbol}{rawPrice}</span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--color-paper-card)',
          border: 'var(--border-w-compact) solid var(--color-ink-border)',
          borderRadius: 'var(--radius-default)',
          padding: '0.75rem 1rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--color-ink)',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <ShieldCheck size={16} color="var(--color-teal)" />
          {lang === 'ar' ? 'رابط شريك إحالة — أنت تدفع نفس السعر' : 'Affiliate partner link — you pay the same rate'}
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--color-accent-dark)',
          marginBottom: '1.25rem'
        }}>
          {urgencyCount} {lang === 'ar' ? 'شخص حجزوا هذا في آخر 24 ساعة' : 'people booked this in the last 24h'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            id="affiliate-modal-continue-btn"
            className="brand-btn-primary"
            onClick={handleDirectRedirect}
            style={{ padding: '0.85rem', fontSize: '1.05rem', justifyContent: 'center' }}
          >
            {getTranslation('continueTo', lang)} {item.provider} <ArrowRight size={18} />
          </button>

          <button
            className="brand-btn-secondary"
            onClick={onClose}
            style={{ padding: '0.75rem', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            {getTranslation('cancel', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
