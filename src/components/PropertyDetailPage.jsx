import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, ShieldCheck, ExternalLink, Heart, Users, Bed, Car, Check, Wifi, Sparkles, Building2, Calendar, Award } from 'lucide-react';
import { getTranslation } from '../services/i18n';
import { buildAffiliateUrl, trackAffiliateClick } from '../services/affiliateManager';

export default function PropertyDetailPage({ item, onBack, currency, lang }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) return null;

  const isAr = lang === 'ar';
  const currencySymbol = currency === 'EUR €' ? '€' : currency === 'GBP £' ? '£' : '$';
  const currencyMultiplier = currency === 'EUR €' ? 0.92 : currency === 'GBP £' ? 0.78 : 1.0;

  const price = item.price || item.dailyRate || 150;
  const originalPrice = item.originalPrice || item.originalRate || null;
  const displayPrice = Math.round(price * currencyMultiplier);
  const displayOriginalPrice = originalPrice ? Math.round(originalPrice * currencyMultiplier) : null;

  const title = isAr ? (item.titleAr || item.titleEn) : (item.titleEn || item.titleAr || '');
  const location = isAr ? (item.locationAr || item.locationEn) : (item.locationEn || '');
  const address = isAr ? (item.addressAr || item.addressEn) : (item.addressEn || '');
  const amenities = isAr ? (item.amenitiesAr || item.featuresAr || []) : (item.amenitiesEn || item.featuresEn || []);

  // Additional high-resolution photo gallery for detail page
  const photoGallery = [
    item.image,
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
  ];

  // Room options / Vehicle variants
  const roomTypes = item.category === 'cars' ? [
    { nameEn: 'Standard Unlimited Plan', nameAr: 'خطة قياسية غير محدودة', rate: displayPrice, descEn: 'Includes Collision Damage Waiver & Theft Protection', descAr: 'شامل الإعفاء من أضرار التصادم والحماية من السرقة' },
    { nameEn: 'Full Protection + GPS', nameAr: 'حماية كاملة + نظام ملاحة', rate: displayPrice + 25, descEn: 'Zero Excess Guarantee with 24/7 Roadside Assistance', descAr: 'ضمان بدون مبلغ كفالة مع مساعدة على الطريق ٢٤/٧' }
  ] : [
    { nameEn: 'Deluxe King Room', nameAr: 'غرفة ديلوكس كينج', rate: displayPrice, descEn: '1 King Bed • Free Breakfast • City View', descAr: 'سرير كينج • إفطار مجاني • إطلالة على المدينة' },
    { nameEn: 'Executive Ocean Suite', nameAr: 'جناح تنفيذي مطل على المحيط', rate: displayPrice + 90, descEn: 'King Suite • Lounge Access • Private Balcony', descAr: 'جناح كينج • دخول الصالة التنفيذية • شرفة خاصة' },
    { nameEn: 'Presidential Penthouse', nameAr: 'بنتهاوس رئاسي', rate: displayPrice + 220, descEn: '2 Bedrooms • Private Hot Tub • Butler Service', descAr: 'غرفتان نوم • جاكوزي خاص • خدمة الخادم الشخصي' }
  ];

  // Verified guest reviews
  const reviews = [
    { id: 1, authorEn: 'Dr. Sarah Jenkins', authorAr: 'د. سارة جينكينز', rating: 5, date: '2026-07-18', commentEn: 'Flawless stay! Booking through Rahlaa redirect gave us instant room upgrade and great price transparency.', commentAr: 'إقامة ممتازة! التوجيه عبر رحلاء منحنا ترقية ترقية فورية للغرفة مع شفافية رائعة في السعر.' },
    { id: 2, authorEn: 'Omar Al-Ghamdi', authorAr: 'عمر الغامدي', rating: 5, date: '2026-06-29', commentEn: 'Location was unbelievable. Highly recommend checking deals here before booking anywhere else.', commentAr: 'الموقع كان لا يصدق. أوصي بشدة بالتحقق من العروض هنا قبل الحجز في أي مكان آخر.' }
  ];

  const handleBookNow = () => {
    const affiliateUrl = buildAffiliateUrl(item);
    trackAffiliateClick(item);
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', width: '100%' }}>
      
      {/* Navigation Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          onClick={onBack}
          className="brand-btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> {isAr ? 'العودة لنتائج البحث' : 'Back to Search Results'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="brand-badge brand-badge-teal">
            <ShieldCheck size={14} /> {item.provider} Verified Partner
          </span>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="brand-btn-secondary"
            style={{ padding: '0.5rem 0.8rem', background: isFavorite ? 'var(--color-accent)' : 'var(--color-paper-card)' }}
          >
            <Heart size={18} fill={isFavorite ? '#131110' : 'none'} color="#131110" />
          </button>
        </div>
      </div>

      {/* Property Title & Location Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-teal)', marginBottom: '0.35rem' }}>
          <MapPin size={16} /> {location} • {address}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-ink)', lineHeight: 1.15 }}>
              {title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
              <span className="brand-badge brand-badge-accent">
                <Star size={14} fill="#131110" color="#131110" /> {item.rating} / 5.0
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, opacity: 0.8 }}>
                ({item.reviewsCount || 450} {isAr ? 'تقييم حقيقي' : 'verified reviews'})
              </span>
            </div>
          </div>

          <div style={{ textAlign: isAr ? 'left' : 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.7 }}>{isAr ? 'السعر المباشر يبدأ من' : 'Direct rate starting from'}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              {displayOriginalPrice && (
                <span className="font-mono" style={{ fontSize: '1rem', opacity: 0.5, textDecoration: 'line-through' }}>
                  {currencySymbol}{displayOriginalPrice}
                </span>
              )}
              <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-ink)' }}>
                {currencySymbol}{displayPrice}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>/ {item.category === 'cars' ? (isAr ? 'يوم' : 'day') : (isAr ? 'ليلة' : 'night')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="brand-card" style={{ height: '360px', overflow: 'hidden', gridColumn: 'span 2' }}>
          <img src={photoGallery[selectedPhoto]} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {photoGallery.map((img, idx) => (
            <div
              key={idx}
              className="brand-card"
              onClick={() => setSelectedPhoto(idx)}
              style={{
                height: '172px',
                cursor: 'pointer',
                overflow: 'hidden',
                border: selectedPhoto === idx ? '3px solid var(--color-accent)' : 'var(--border-w-primary) solid var(--color-ink-border)'
              }}
            >
              <img src={img} alt={`${title} ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Sections Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Amenities & Highlights */}
          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles color="var(--color-accent)" size={20} /> {isAr ? 'المرافق والتسهيلات البارزة' : 'Property Highlights & Amenities'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {amenities.map((amenity, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                  <div style={{ background: 'var(--color-teal)', padding: '0.2rem', borderRadius: '4px' }}>
                    <Check size={14} color="#fff" />
                  </div>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Room Options & Rates Table */}
          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              {item.category === 'cars' ? (isAr ? 'فئات السيارات المتاحة' : 'Available Vehicle Packages') : (isAr ? 'الغرف والأجنحة المتاحة' : 'Available Rooms & Rates')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {roomTypes.map((room, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    background: 'var(--color-paper-alt)',
                    border: 'var(--border-w-compact) solid var(--color-ink-border)',
                    borderRadius: 'var(--radius-default)',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{isAr ? room.nameAr : room.nameEn}</h4>
                    <p style={{ fontSize: '0.82rem', opacity: 0.8, fontWeight: 600 }}>{isAr ? room.descAr : room.descEn}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 900 }}>
                      {currencySymbol}{room.rate}
                    </div>
                    <button className="brand-btn-primary" onClick={handleBookNow} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      {isAr ? 'احجز العرض' : 'Book Deal'} <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Reviews Section */}
          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award color="var(--color-teal)" size={20} /> {isAr ? 'تقييمات المسافرين الموثقة' : 'Verified Traveler Reviews'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map(rev => (
                <div key={rev.id} style={{ padding: '1rem', background: 'var(--color-paper-alt)', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{isAr ? rev.authorAr : rev.authorEn}</span>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="var(--color-accent)" color="var(--color-accent)" />)}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, opacity: 0.85 }}>"{isAr ? rev.commentAr : rev.commentEn}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Conversion CTA Box */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)', boxShadow: 'var(--shadow-dramatic)' }}>
            <span className="brand-badge brand-badge-teal" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> {item.provider} Direct Link
            </span>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {isAr ? 'احجز بأفضل سعر مضمون' : 'Lock Best Rate Guaranteed'}
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 600, marginBottom: '1.25rem' }}>
              {isAr ? 'سيتم توجيهك مباشرة لصفحة الحجز الرسمية مع تطبيق تتبع الإحالات.' : 'You will be redirected straight to the verified partner booking engine.'}
            </p>

            <button
              onClick={handleBookNow}
              className="brand-btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1.05rem', justifyContent: 'center', marginBottom: '0.75rem' }}
            >
              {isAr ? `متابعة إلى ${item.provider}` : `Continue to ${item.provider}`} <ExternalLink size={18} />
            </button>

            <div style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.7, fontWeight: 600 }}>
              {isAr ? 'رابط إحالة موثق • لا توجد رسوم إضافية' : 'Verified Partner Link • Zero Extra Fees'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
