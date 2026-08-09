import React, { useState } from 'react';
import { Compass, ShieldCheck, Zap, Award, Globe, ArrowRight, Star, ChevronDown, ChevronUp, MapPin, Sparkles, Building2, Home, Car } from 'lucide-react';
import HeroSearch from './HeroSearch';
import MascotFrame from './MascotFrame';
import { POPULAR_DESTINATIONS } from '../services/mockData';
import { getTranslation } from '../services/i18n';

export default function LandingPage({
  activeTab,
  setActiveTab,
  selectedLocation,
  setSelectedLocation,
  guests,
  setGuests,
  onNavigate,
  lang
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const testimonials = [
    {
      id: 1,
      nameEn: 'Alexander Vance',
      nameAr: 'ألكسندر فانس',
      roleEn: 'Digital Nomad',
      roleAr: 'رحالة رقمي',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      commentEn: 'Rahlaa allowed me to compare a villa in Bali on VRBO with a boutique hotel on Booking.com in seconds, saving me $140 on my 10-day trip!',
      commentAr: 'سمح لي رحلاء بمقارنة فيلا في بالي على فيربو مع فندق بوتيك على بوكينج في ثوانٍ، مما وفر لي ١٤٠$ في رحلتي!'
    },
    {
      id: 2,
      nameEn: 'Dr. Tariq Al-Mansoor',
      nameAr: 'د. طارق المنصور',
      roleEn: 'Frequent Traveler',
      roleAr: 'مسافر دائم',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      commentEn: 'The gamified XP rewards system unlocked a $35 voucher instantly. Combined with DiscoverCars comparison, rental car pickup in Paris was flawless.',
      commentAr: 'فتح لي نظام المكافآت قسيمة خصم ٣٥$ فوراً. إلى جانب مقارنة ديسكوفر كارز، كانت تجربة استلام السيارة في باريس ممتازة.'
    }
  ];

  const faqs = [
    {
      id: 1,
      qEn: 'How does Rahlaa guarantee lower travel rates?',
      qAr: 'كيف يضمن رحلاء أسعار سفر أقل؟',
      aEn: 'Rahlaa aggregates live booking rates simultaneously across Booking.com, VRBO, DiscoverCars, and Agoda. We apply exclusive partner referral vouchers automatically to ensure you get the absolute lowest rate.',
      aAr: 'يجمع رحلاء أسعار الحجز المباشرة فورياً عبر بوكينج، فيربو، ديسكوفر كارز، وأجودا. نقوم بتطبيق قسائم الشركاء الحصرية تلقائياً لضمان حصولك على أقل سعر.'
    },
    {
      id: 2,
      qEn: 'What is the Rahlaa Gamified Rewards system?',
      qAr: 'ما هو نظام مكافآت رحلاء؟',
      aEn: 'Every destination search (+10 XP), deal save (+25 XP), and booking click (+100 XP) earns you travel XP. Leveling up unlocks $15, $35, and $50 discount vouchers applied to your future bookings.',
      aAr: 'كل عملية بحث (+١٠ نقاط)، حفظ عرض (+٢٥ نقطة)، ونقرة حجز (+١٠٠ نقطة) تكسبك نقاط خبرة. عند الارتقاء للمستوى الأعلى تفتح قسائم خصم بقيمة ١٥$، ٣٥$، و ٥٠$.'
    },
    {
      id: 3,
      qEn: 'Is Rahlaa free to use?',
      qAr: 'هل استخدام رحلاء مجاني؟',
      aEn: 'Yes! Rahlaa is 100% free for travelers. We earn a small partner referral commission directly from booking networks at zero extra cost to you.',
      aAr: 'نعم! استخدام رحلاء مجاني ١٠٠٪ للمسافرين. نحصل على عمولة إحالة بسيطة من شبكات الحجز مباشرة بدون أي تكلفة إضافية عليك.'
    }
  ];

  return (
    <main>
      {/* Hero Mascot Welcome */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <MascotFrame state="hero" size={90} />
      </div>

      {/* Hero Console Search */}
      <HeroSearch
        activeTab={activeTab}
        selectedLocation={selectedLocation}
        setSelectedLocation={(loc) => {
          setSelectedLocation(loc);
          onNavigate(activeTab);
        }}
        guests={guests}
        setGuests={setGuests}
        onSearchSubmit={() => onNavigate(activeTab)}
        lang={lang}
      />

      {/* Why Choose Rahlaa (4 Feature Columns) */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="brand-badge brand-badge-teal" style={{ marginBottom: '0.5rem', padding: '0.35rem 0.85rem' }}>
            {lang === 'ar' ? 'مميزات رحلاء' : 'Why Rahlaa'}
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
            {lang === 'ar' ? 'محرك السفر الشامل والتسويق بالعمولة' : 'The Universal Travel & Referral Engine'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <div style={{ background: 'var(--color-accent)', width: '48px', height: '48px', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <ShieldCheck size={26} color="#131110" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              {lang === 'ar' ? 'ضمان أفضل سعر' : 'Guaranteed Live Rates'}
            </h3>
            <p style={{ fontSize: '0.88rem', opacity: 0.85, fontWeight: 500 }}>
              {lang === 'ar' ? 'مقارنة فورية ومباشرة بدون رسوم خفية مع تطبيق تتبع الإحالات' : 'Direct real-time rate comparisons across global travel networks with verified referral parameters.'}
            </p>
          </div>

          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <div style={{ background: 'var(--color-teal)', width: '48px', height: '48px', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <Zap size={26} color="#FFFFFF" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              {lang === 'ar' ? 'مقارنة شاملة متزامنة' : 'Multi-Network Comparison'}
            </h3>
            <p style={{ fontSize: '0.88rem', opacity: 0.85, fontWeight: 500 }}>
              {lang === 'ar' ? 'قارن الفنادق، الشقق، والفيلات والسيارات في واحدة موحدة' : 'Compare Booking.com, VRBO, DiscoverCars, and Agoda side-by-side in one unified grid.'}
            </p>
          </div>

          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <div style={{ background: 'var(--color-emerald)', width: '48px', height: '48px', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <Award size={26} color="#131110" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              {lang === 'ar' ? 'مكافآت السفر بالنقاط' : 'Gamified Travel XP'}
            </h3>
            <p style={{ fontSize: '0.88rem', opacity: 0.85, fontWeight: 500 }}>
              {lang === 'ar' ? 'اكسب نقاطاً وافتح قسائم خصم من ١٥$ إلى ٥٠$ مع كل بحث وحجز' : 'Earn travel XP for every search and unlock exclusive $15 - $50 discount vouchers.'}
            </p>
          </div>

          <div className="brand-card" style={{ padding: '1.75rem', background: 'var(--color-paper-card)' }}>
            <div style={{ background: 'var(--color-purple)', width: '48px', height: '48px', borderRadius: 'var(--radius-default)', border: 'var(--border-w-compact) solid var(--color-ink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
              <Globe size={26} color="#131110" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              {lang === 'ar' ? 'دعم كامل للغة العربية' : 'Full Bilingual Support'}
            </h3>
            <p style={{ fontSize: '0.88rem', opacity: 0.85, fontWeight: 500 }}>
              {lang === 'ar' ? 'واجهة عربية وإنجليزية متكافئة ومصممة بتقنية النيو-بروتاليزم' : 'Native English and Arabic interface with complete RTL/LTR parity and custom Cairo typography.'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="brand-badge brand-badge-accent" style={{ marginBottom: '0.4rem' }}>
              {lang === 'ar' ? 'الوجهات العالمية' : 'Global Destinations'}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              {lang === 'ar' ? 'استكشف أفضل الوجهات السياحية' : 'Explore Top Destinations'}
            </h2>
          </div>

          <button className="brand-btn-secondary" onClick={() => onNavigate('hotels')}>
            {lang === 'ar' ? 'عرض جميع الوجهات' : 'View All Stays'} <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {POPULAR_DESTINATIONS.map(dest => (
            <div
              key={dest.id}
              className="brand-card"
              onClick={() => {
                setSelectedLocation(dest.nameEn);
                onNavigate('hotels');
              }}
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              <div style={{ height: '180px', position: 'relative' }}>
                <img
                  src={dest.image}
                  alt={dest.nameEn}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className="brand-badge brand-badge-accent font-mono">{dest.code}</span>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-teal)' }}>
                  <MapPin size={14} /> {dest.countryEn}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>
                  {lang === 'ar' ? dest.nameAr : dest.nameEn}
                </h3>
                <div style={{ fontSize: '0.82rem', opacity: 0.8, fontWeight: 600 }}>
                  {lang === 'ar' ? dest.descAr : dest.descEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews & Social Proof */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="brand-badge brand-badge-teal" style={{ marginBottom: '0.5rem' }}>
            {lang === 'ar' ? 'آراء المسافرين' : 'Traveler Testimonials'}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {lang === 'ar' ? 'ماذا يقول مسافرو رحلاء؟' : 'Trusted by Global Voyagers'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map(t => (
            <div key={t.id} className="brand-card" style={{ padding: '1.5rem', background: 'var(--color-paper-card)' }}>
              <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-accent)" />)}
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '1.2rem', lineHeight: 1.5 }}>
                "{lang === 'ar' ? t.commentAr : t.commentEn}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={t.avatar} alt={t.nameEn} style={{ width: '42px', height: '42px', borderRadius: '50%', border: 'var(--border-w-compact) solid var(--color-ink-border)' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{lang === 'ar' ? t.nameAr : t.nameEn}</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.7, fontWeight: 700 }}>{lang === 'ar' ? t.roleAr : t.roleEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="brand-badge brand-badge-accent" style={{ marginBottom: '0.5rem' }}>
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {lang === 'ar' ? 'كل ما تحتاج معرفته عن رحلاء' : 'Everything You Need to Know'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map(faq => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="brand-card" style={{ background: 'var(--color-paper-card)', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'var(--color-ink)'
                  }}
                >
                  <span>{lang === 'ar' ? faq.qAr : faq.qEn}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', fontSize: '0.92rem', opacity: 0.85, fontWeight: 500, lineHeight: 1.6, borderTop: 'var(--border-w-compact) solid var(--color-ink-border)' }}>
                    {lang === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        <div style={{
          background: 'var(--color-accent)',
          border: 'var(--border-w-primary) solid var(--color-ink-border)',
          borderRadius: 'var(--radius-default)',
          boxShadow: 'var(--shadow-dramatic)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          color: '#131110'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.8rem' }}>
            {lang === 'ar' ? 'ابدأ رحلتك اليوم مع رحلاء' : 'Ready to Wander Further?'}
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, maxWidth: '640px', margin: '0 auto 2rem auto' }}>
            {lang === 'ar' ? 'قارن الأسعار فورياً وافتح قسائم الخصم الحصرية لرحلتك القادمة' : 'Compare live rates instantly and unlock exclusive discount vouchers for your next trip.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="brand-btn-primary" onClick={() => onNavigate('hotels')} style={{ background: '#131110', color: '#FFFFFF', padding: '0.9rem 1.75rem', fontSize: '1rem' }}>
              <Building2 size={18} /> {lang === 'ar' ? 'استكشف الفنادق' : 'Explore Hotels'}
            </button>
            <button className="brand-btn-secondary" onClick={() => onNavigate('cars')} style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}>
              <Car size={18} /> {lang === 'ar' ? 'تأجير السيارات' : 'Compare Car Hire'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
