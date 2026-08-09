import React from 'react';

const AboutPage = ({ lang = 'en' }) => {
  const isAr = lang === 'ar';
  const border = `var(--border-w-primary) solid var(--color-ink)`;
  const shadow = `var(--shadow-md)`;

  const cardStyle = {
    backgroundColor: 'var(--color-paper-card)',
    border: border,
    boxShadow: shadow,
    borderRadius: 'var(--radius-default)',
    padding: '2rem',
    color: 'var(--color-ink)',
    marginBottom: '2rem'
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-paper)',
      color: 'var(--color-ink)',
      minHeight: '100vh',
      fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-display)'
    }}>
      
      {/* Hero Header */}
      <header className="section-teal" style={{ backgroundColor: 'var(--color-teal)', color: '#FFFFFF', padding: '4rem 2rem', borderBottom: border, textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', textShadow: `4px 4px 0px var(--color-ink)` }}>
          {isAr ? 'عن منصة رحلاء' : 'About Rahlaa'}
        </h1>
        <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>
          {isAr ? 'الترحال والاستكشاف | محرك السفر الشامل' : 'Wander Further | Universal Travel Engine'}
        </p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        {/* Mission Section */}
        <section className="brand-card" style={cardStyle}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', fontWeight: 800 }}>
            {isAr ? 'مهمتنا ورؤيتنا' : 'Our Mission'}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1rem', fontWeight: 600 }}>
            {isAr 
              ? 'في رحلاء، نؤمن بالجوهر النقي لـ الترحال. مهمتنا هي تبسيط تجربة السفر والاستكشاف من خلال ربطك مباشرة بأفضل عروض الفنادق، الشقق، وتأجير السيارات عبر العالم في واجهة موحدة واحدة.' 
              : 'At Rahlaa, we believe in the pure spirit of Wander (الترحال). Our mission is to simplify travel by connecting you directly to the best global hotel, vacation rental, and car hire deals in one unified interface.'}
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', fontWeight: 600 }}>
            {isAr
              ? 'سواء كنت تخطط لعطلة نهاية أسبوع قصيرة أو رحلة طويلة عبر القارات، يضمن لك رحلاء حرية التنقل بأفضل أسعار الإحالة المباشرة.'
              : 'Whether booking a weekend getaway or an extended international expedition, Rahlaa ensures you have the freedom to roam with direct referral transparency.'}
          </p>
        </section>

        {/* Affiliate Transparency Section */}
        <section className="brand-card" style={{ ...cardStyle, backgroundColor: 'var(--color-accent)' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', fontWeight: 800 }}>
            {isAr ? 'الشفافية والتسويق بالعمولة' : 'Transparency & Affiliates'}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1rem', fontWeight: 700 }}>
            {isAr
              ? 'لتقديم أفضل الأسعار مجاناً للمسافرين، يعمل رحلاء كمحرك تجميع ومزود إحالة موثوق. عند الحجز عبر روابطنا، قد نحصل على عمولة بسيطة من شبكة الشركاء بدون أي تكلفة إضافية عليك.'
              : 'To bring you top rates for free, Rahlaa operates as an affiliate aggregator. When booking through our referral links, we may earn a small partner commission at zero extra cost to you.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['Travelpayouts', 'Booking.com', 'VRBO', 'DiscoverCars', 'Agoda'].map((partner, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-paper-card)', border: border, borderRadius: 'var(--radius-default)', fontWeight: 800, boxShadow: `2px 2px 0px var(--color-ink)` }}>
                {partner}
              </span>
            ))}
          </div>
        </section>

        {/* Partner Network & APIs */}
        <section className="brand-card" style={cardStyle}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', fontWeight: 800 }}>
            {isAr ? 'التقنية والشبكات المباشرة' : 'Technology & API Integrations'}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1rem', fontWeight: 600 }}>
            {isAr
              ? 'تعتمد منصتنا على تقنيات تتبع ومقارنة مباشرة مع شبكات الشركاء لضمان دقة الأسعار وتوافر الغرف والسيارات في الوقت الفعلي.'
              : 'Our platform is powered by direct partner referral networks to ensure real-time price accuracy, room availability, and vehicle selection.'}
          </p>
          <ul style={{ fontSize: '1.05rem', lineHeight: '1.7', paddingLeft: isAr ? '0' : '1.5rem', paddingRight: isAr ? '1.5rem' : '0', marginTop: '1rem', fontWeight: 600 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>{isAr ? 'مقارنة فورية:' : 'Live Rate Comparison:'}</strong> {isAr ? 'مربوطة بقواعد بيانات الفنادق وتأجير السيارات العالمية.' : 'Directly synced with global stay and car rental feeds.'}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>{isAr ? 'تتبع آمن:' : 'Secure Tracking:'}</strong> {isAr ? 'تضمين معلمات الإحالة تلقائياً بدون تعقيدات.' : 'Automatic referral parameter injection for transparent rate guarantees.'}
            </li>
            <li>
              <strong>{isAr ? 'توجيه مباشر:' : 'Direct Referral:'}</strong> {isAr ? 'توجيه آمن مباشرة لصفحة المزود الرسمي.' : 'Safe handoff directly to official partner checkout pages.'}
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
};

export default AboutPage;
