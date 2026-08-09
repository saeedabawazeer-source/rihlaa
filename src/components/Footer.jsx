import React, { useState } from 'react';
import { Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { getTranslation } from '../services/i18n';
import AdSlot from './AdSlot';
import LegalModal from './LegalModal';

export default function Footer({ lang }) {
  const [legalType, setLegalType] = useState(null);

  const SAEED_COLORS = [
    { letter: 'S', top: '#FFFDF6', side: '#D8CFBE', front: '#F6EFE3' },  // Paper triad
    { letter: 'A', top: '#17A099', side: '#07514D', front: '#0B7A75' },  // Teal triad
    { letter: 'E', top: '#FFFDF6', side: '#D8CFBE', front: '#F6EFE3' },  // Paper triad
    { letter: 'E', top: '#FFFDF6', side: '#D8CFBE', front: '#F6EFE3' },  // Paper triad
    { letter: 'D', top: '#FF8B5E', side: '#D14E1F', front: '#FF6B35' },  // Orange triad
  ];

  return (
    <footer style={{
      marginTop: 'auto',
      background: 'var(--color-ink)',
      borderTop: 'var(--border-w-primary) solid var(--color-ink-border)',
      padding: '4rem 1.5rem 2rem 1.5rem',
      color: 'var(--color-paper)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Top Section: Brand + Newsletter */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'var(--color-accent)',
                border: 'var(--border-w-compact) solid var(--color-ink-border)',
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0px var(--color-ink-border)'
              }}>
                <Compass size={28} color="#131110" />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-paper)' }}>
                  {lang === 'ar' ? 'رحلاء' : 'Rahlaa'}
                </span>
                <span className="brand-badge brand-badge-teal" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                  {getTranslation('oneWord', lang)}
                </span>
              </div>
            </div>
            <p style={{ fontWeight: 600, opacity: 0.8, marginBottom: '1rem', maxWidth: '300px', color: 'var(--color-paper)' }}>
              {lang === 'ar' ? 'اكتشف العالم بأفضل الأسعار.' : 'Discover the world with the best rates.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-teal)' }}>
              <ShieldCheck size={20} />
              {getTranslation('bestRateGuaranteed', lang)}
            </div>
          </div>

          <div className="brand-card" style={{ padding: '1.5rem', background: 'var(--color-paper-card)', color: 'var(--color-ink)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {lang === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Join our Newsletter'}
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem', fontWeight: 500 }}>
              {lang === 'ar' ? 'احصل على أفضل عروض السفر مباشرة في بريدك.' : 'Get the best travel deals delivered to your inbox.'}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email address'} 
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: '2px solid var(--color-ink-border)',
                  borderRadius: 'var(--radius-default)',
                  background: 'var(--color-paper)',
                  color: 'var(--color-ink)',
                  fontWeight: 600,
                  outline: 'none',
                  boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.05)'
                }}
              />
              <button className="brand-btn-primary" style={{ padding: '0.75rem', background: 'var(--color-teal)' }}>
                <ArrowRight size={20} color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {/* Site Map & Compliance Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', padding: '2rem 0', borderTop: '2px solid var(--color-paper)', borderBottom: '2px solid var(--color-paper)' }}>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--color-paper)' }}>{lang === 'ar' ? 'اكتشف' : 'Explore'}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600, opacity: 0.8, color: 'var(--color-paper)' }}>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'الفنادق' : 'Hotels'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'بيوت العطلات' : 'Vacation Rentals'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'تأجير السيارات' : 'Car Rentals'}</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--color-paper)' }}>{lang === 'ar' ? 'الخدمات' : 'Services'}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600, opacity: 0.8, color: 'var(--color-paper)' }}>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'الخريطة' : 'Map'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'المكافآت' : 'Rewards'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'التحليلات' : 'Analytics'}</li>
              <li style={{ cursor: 'pointer' }}>{lang === 'ar' ? 'عن رحلاء' : 'About'}</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--color-paper)' }}>{lang === 'ar' ? 'الدعم والامتثال' : 'Support & Compliance'}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600, opacity: 0.8, color: 'var(--color-paper)' }}>
              <li onClick={() => setLegalType('privacy')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</li>
              <li onClick={() => setLegalType('terms')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{lang === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}</li>
            </ul>
          </div>
        </div>

        {/* Designated AdSlot Zone */}
        <div>
          <AdSlot slotId="footer-ad-banner" format="horizontal" />
        </div>

        {/* Signature & Disclaimer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-paper)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Built by
            </div>

            <div className="brick-signature" style={{ display: 'flex', gap: '2px' }}>
              {SAEED_COLORS.map((brick, i) => (
                <div key={i} style={{ width: '32px', height: '40px' }}>
                  <svg viewBox="0 0 32 40" width="100%" height="100%">
                    <polygon points="16,2 30,8 16,14 2,8" fill={brick.top} stroke="var(--color-ink-border)" strokeWidth="1" strokeLinejoin="round" />
                    <polygon points="2,8 16,14 16,38 2,32" fill={brick.side} stroke="var(--color-ink-border)" strokeWidth="1" strokeLinejoin="round" />
                    <polygon points="16,14 30,8 30,32 16,38" fill={brick.front} stroke="var(--color-ink-border)" strokeWidth="1" strokeLinejoin="round" />
                    <text x="21" y="27" fill="var(--color-ink)" fontSize="14" fontWeight="900" fontFamily="var(--font-mono)" textAnchor="middle" transform="skewY(22)">
                      {brick.letter}
                    </text>
                  </svg>
                </div>
              ))}
            </div>
            
          </div>

          <div style={{ fontSize: '0.78rem', opacity: 0.7, fontWeight: 500, lineHeight: 1.6, maxWidth: '800px', color: 'var(--color-paper)' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              Affiliate Disclosure: Rahlaa (رحلاء) participates in travel affiliate programs including Travelpayouts, Booking.com, VRBO, Agoda, and DiscoverCars. Referral tracking parameters are securely applied to outbound booking links at zero additional cost to users.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)' }}>
              © {new Date().getFullYear()} Rahlaa (رحلاء). Built per Saeed's Shared Brand System.
            </p>
          </div>
        </div>
      </div>

      {legalType && (
        <LegalModal type={legalType} onClose={() => setLegalType(null)} lang={lang} />
      )}
    </footer>
  );
}
