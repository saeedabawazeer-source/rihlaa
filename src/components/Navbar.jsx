import React from 'react';
import { Building2, Home, Car, Sparkles, Plane, Moon, Sun, Settings, BarChart3, Globe } from 'lucide-react';
import RahlaaLogo from './RahlaaLogo';
import { getTranslation } from '../services/i18n';

export default function Navbar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  currency,
  setCurrency,
  lang,
  setLang,
  onOpenSettings,
  onOpenDashboard,
  onGoHome
}) {
  const currencies = ['USD $', 'EUR €', 'GBP £'];

  return (
    <nav className="brand-card" style={{
      position: 'sticky',
      top: '10px',
      zIndex: 100,
      margin: '0.75rem 1.5rem',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      background: 'var(--color-paper-card)'
    }}>
      {/* Brand Logo Lockup */}
      <div
        id="navbar-logo-link"
        role="button"
        aria-label="Home"
        tabIndex={0}
        onClick={onGoHome}
        style={{ cursor: 'pointer' }}
      >
        <RahlaaLogo lang={lang} size="medium" />
      </div>

      {/* Main Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'var(--color-paper-alt)',
        padding: '0.35rem',
        borderRadius: 'var(--radius-default)',
        border: 'var(--border-w-compact) solid var(--color-ink-border)',
        flexWrap: 'wrap'
      }}>
        <button
          id="nav-tab-hotels"
          onClick={() => setActiveTab('hotels')}
          style={{
            background: activeTab === 'hotels' ? 'var(--color-teal)' : 'transparent',
            color: activeTab === 'hotels' ? '#FFFFFF' : 'var(--color-ink)',
            border: activeTab === 'hotels' ? '2px solid var(--color-ink-border)' : 'none',
            boxShadow: activeTab === 'hotels' ? '3px 3px 0px var(--color-ink-border)' : 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-default)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Building2 size={16} /> {getTranslation('hotels', lang)}
        </button>

        <button
          id="nav-tab-rentals"
          onClick={() => setActiveTab('rentals')}
          style={{
            background: activeTab === 'rentals' ? 'var(--color-accent)' : 'transparent',
            color: activeTab === 'rentals' ? '#131110' : 'var(--color-ink)',
            border: activeTab === 'rentals' ? '2px solid var(--color-ink-border)' : 'none',
            boxShadow: activeTab === 'rentals' ? '3px 3px 0px var(--color-ink-border)' : 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-default)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Home size={16} /> {getTranslation('vacationRentals', lang)}
        </button>

        <button
          id="nav-tab-cars"
          onClick={() => setActiveTab('cars')}
          style={{
            background: activeTab === 'cars' ? 'var(--color-emerald)' : 'transparent',
            color: '#131110',
            border: activeTab === 'cars' ? '2px solid var(--color-ink-border)' : 'none',
            boxShadow: activeTab === 'cars' ? '3px 3px 0px var(--color-ink-border)' : 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-default)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Car size={16} /> {getTranslation('carRentals', lang)}
        </button>

        <button
          id="nav-tab-experiences"
          onClick={() => setActiveTab('experiences')}
          style={{
            background: activeTab === 'experiences' ? 'var(--color-accent)' : 'transparent',
            color: '#131110',
            border: activeTab === 'experiences' ? '2px solid var(--color-ink-border)' : 'none',
            boxShadow: activeTab === 'experiences' ? '3px 3px 0px var(--color-ink-border)' : 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-default)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Sparkles size={16} /> {lang === 'ar' ? 'أنشطة كلوك' : 'Experiences (Klook)'}
        </button>

        <button
          id="nav-tab-flights"
          onClick={() => setActiveTab('flights')}
          style={{
            background: activeTab === 'flights' ? 'var(--color-teal)' : 'transparent',
            color: activeTab === 'flights' ? '#FFFFFF' : 'var(--color-ink)',
            border: activeTab === 'flights' ? '2px solid var(--color-ink-border)' : 'none',
            boxShadow: activeTab === 'flights' ? '3px 3px 0px var(--color-ink-border)' : 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-default)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Plane size={16} /> {lang === 'ar' ? 'طيران أفياسيلز' : 'Flights (Aviasales)'}
        </button>
      </div>

      {/* Control Actions (Language, Currency, Analytics, Dark Mode) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        
        {/* Language Switcher */}
        <button
          id="language-toggle-btn"
          aria-label="Toggle language"
          className="brand-btn-secondary"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', fontWeight: 800 }}
        >
          <Globe size={15} /> {lang === 'en' ? 'العربية' : 'EN'}
        </button>

        {/* Currency Switcher */}
        <select
          id="currency-select-dropdown"
          aria-label="Select Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            background: 'var(--color-paper-alt)',
            color: 'var(--color-ink)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            padding: '0.45rem 0.6rem',
            borderRadius: 'var(--radius-default)',
            fontSize: '0.85rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {currencies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Analytics Dashboard Button */}
        <button
          id="analytics-dashboard-btn"
          aria-label="Analytics Dashboard"
          className="brand-btn-secondary"
          onClick={onOpenDashboard}
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
        >
          <BarChart3 size={16} />
        </button>

        {/* Settings Modal Button */}
        <button
          id="affiliate-settings-btn"
          aria-label="Affiliate Settings"
          className="brand-btn-secondary"
          onClick={onOpenSettings}
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
        >
          <Settings size={16} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          id="theme-toggle-btn"
          aria-label="Toggle Dark Mode"
          className="brand-btn-secondary"
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
        >
          {darkMode ? <Sun size={16} color="var(--color-accent)" /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}
