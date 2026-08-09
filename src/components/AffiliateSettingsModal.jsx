import React, { useState } from 'react';
import { Save, X, Check, Key } from 'lucide-react';
import { getAffiliateConfig, saveAffiliateConfig } from '../services/affiliateManager';
import { getTranslation } from '../services/i18n';

export default function AffiliateSettingsModal({ onClose, onSaved, lang }) {
  const [config, setConfig] = useState(getAffiliateConfig());
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const isAr = lang === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      saveAffiliateConfig(config);
      setSuccessMsg(true);
      setErrorMsg(false);
      setTimeout(() => {
        setSuccessMsg(false);
        if (onSaved) onSaved();
        if (onClose) onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg(true);
      console.error(err);
    }
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
        maxWidth: '560px',
        width: '100%',
        padding: '2rem',
        background: 'var(--color-paper-card)',
        position: 'relative',
        borderRadius: 'var(--radius-default)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: isAr ? 'auto' : '16px',
            left: isAr ? '16px' : 'auto',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'var(--color-accent)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0
          }}>
            <Key size={22} color="#131110" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-ink)' }}>
              {getTranslation('affiliateConfigTitle', lang)}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink)', opacity: 0.8, fontWeight: 600 }}>
              {getTranslation('affiliateConfigSub', lang)}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div style={{
            background: 'var(--color-rose)',
            color: '#FFFFFF',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-default)',
            marginBottom: '1rem',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <X size={18} /> {isAr ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving settings. Please try again.'}
          </div>
        )}

        {successMsg && (
          <div style={{
            background: 'var(--color-emerald)',
            color: '#131110',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-default)',
            marginBottom: '1rem',
            fontSize: '0.88rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Check size={18} /> {isAr ? 'تم حفظ الإعدادات بنجاح!' : 'Affiliate Settings Saved Successfully!'}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'block', marginBottom: '0.4rem' }}>
              {isAr ? 'معرّف Travelpayouts Marker (الشبكة العالمية)' : 'Travelpayouts Marker ID (Universal Network)'}
            </label>
            <input
              type="text"
              value={config.travelpayoutsMarker || ''}
              onChange={(e) => setConfig({ ...config, travelpayoutsMarker: e.target.value })}
              placeholder="e.g. 492815"
              className="font-mono"
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
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'block', marginBottom: '0.4rem' }}>
              {isAr ? 'معرّف الشريك التابع لـ Booking.com (AID)' : 'Booking.com Affiliate AID'}
            </label>
            <input
              type="text"
              value={config.bookingComAid || ''}
              onChange={(e) => setConfig({ ...config, bookingComAid: e.target.value })}
              placeholder="e.g. 304142"
              className="font-mono"
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
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', display: 'block', marginBottom: '0.4rem' }}>
              {isAr ? 'معرّف شريك VRBO / Expedia' : 'VRBO / Expedia Vacation Rentals Partner ID'}
            </label>
            <input
              type="text"
              value={config.vrboAffiliateId || ''}
              onChange={(e) => setConfig({ ...config, vrboAffiliateId: e.target.value })}
              placeholder="e.g. vrbo_partner_882"
              className="font-mono"
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
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="submit" className="brand-btn-primary" style={{ flex: 1, padding: '0.85rem', fontSize: '0.95rem' }}>
              <Save size={18} /> {getTranslation('save', lang)}
            </button>
            <button type="button" onClick={onClose} className="brand-btn-secondary" style={{ flex: 1, padding: '0.85rem', fontSize: '0.95rem' }}>
              {getTranslation('cancel', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
