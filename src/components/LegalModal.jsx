import React from 'react';
import { ShieldCheck, FileText, X } from 'lucide-react';

export default function LegalModal({ type = 'privacy', onClose, lang }) {
  const isPrivacy = type === 'privacy';

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
        maxWidth: '640px',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '2rem',
        background: 'var(--color-paper-card)',
        border: 'var(--border-w-primary) solid var(--color-ink-border)',
        boxShadow: 'var(--shadow-dramatic)',
        position: 'relative',
        borderRadius: 'var(--radius-default)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="legal-modal-close-btn"
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            background: isPrivacy ? 'var(--color-teal)' : 'var(--color-accent)',
            color: isPrivacy ? '#FFFFFF' : '#131110',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {isPrivacy ? <ShieldCheck size={24} /> : <FileText size={24} />}
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {isPrivacy ? (lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy') : (lang === 'ar' ? 'الشروط والأحكام' : 'Terms of Service')}
            </h2>
            <p style={{ fontSize: '0.82rem', opacity: 0.7, fontWeight: 600 }}>
              {lang === 'ar' ? 'امتثال كامل لمعايير AdSense و GAMR' : 'AdSense & GAMR Regulatory Compliance Document'}
            </p>
          </div>
        </div>

        {/* Legal Text Content */}
        <div style={{ fontSize: '0.88rem', opacity: 0.85, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Data Collection & Analytics:</strong> Rahlaa (رحلاء) respects user privacy. We do not collect personal identifying information (PII) without consent. We use third-party analytics cookies to measure aggregated referral click performance across Booking.com, VRBO, DiscoverCars, and Agoda.
              </p>
              <p>
                <strong>2. Third-Party Advertising:</strong> We may display advertisements served by Google AdSense or GAMR partner networks. These third-party vendors use cookies to serve ads based on prior website visits.
              </p>
              <p>
                <strong>3. Affiliate Disclosure:</strong> Rahlaa is a participant in travel affiliate programs. Referral links automatically attach partner tracking tokens at zero additional cost to you.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Acceptance of Terms:</strong> By accessing or using the Rahlaa platform, you agree to comply with and be bound by these Terms of Service.
              </p>
              <p>
                <strong>2. Comparison Services:</strong> Rahlaa acts solely as an aggregator and comparison tool for travel stays, vacation rentals, and car hire. Bookings and payment transactions are fulfilled directly by the partner provider (Booking.com, VRBO, DiscoverCars).
              </p>
              <p>
                <strong>3. Gamified Rewards & Vouchers:</strong> Rahlaa Rewards XP and discount vouchers are promotional tools provided for user engagement and are subject to availability and partner terms.
              </p>
            </>
          )}
        </div>

        <button
          className="brand-btn-primary"
          onClick={onClose}
          style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
        >
          {lang === 'ar' ? 'فهمت وموافق' : 'I Understand & Agree'}
        </button>
      </div>
    </div>
  );
}
