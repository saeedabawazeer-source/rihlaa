import React from 'react';
import { Building2, Home, Car, Moon, Sun, Settings, BarChart3, Globe } from 'lucide-react';
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
        border: 'var(--border-w-compact) solid var(--color-ink-border)'
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
      </div>

      {/* Utility Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        
        {/* Language Switcher */}
        <button
          id="nav-lang-switch-btn"
          className="brand-btn-secondary"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', background: 'var(--color-paper-alt)' }}
        >
          <Globe size={16} /> {lang === 'en' ? 'العربية' : 'English'}
        </button>

        {/* Currency Selector */}
        <select
          id="nav-currency-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="font-mono"
          style={{
            background: 'var(--color-paper-card)',
            color: 'var(--color-ink)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            padding: '0.45rem 0.75rem',
            borderRadius: 'var(--radius-default)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '3px 3px 0px var(--color-ink-border)',
            outline: 'none'
          }}
        >
          {currencies.map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>

        {/* Analytics Hub */}
        <button
          id="nav-dashboard-btn"
          className="brand-btn-secondary"
          onClick={onOpenDashboard}
          title={getTranslation('analytics', lang)}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
        >
          <BarChart3 size={16} color="var(--color-teal)" />
        </button>

        {/* Settings */}
        <button
          id="nav-settings-btn"
          className="brand-btn-secondary"
          onClick={onOpenSettings}
          title={getTranslation('settings', lang)}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
        >
          <Settings size={16} />
        </button>

        {/* Dark/Light Toggle */}
        <button
          id="nav-darkmode-toggle-btn"
          className="brand-btn-secondary"
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: '0.45rem 0.85rem' }}
        >
          {darkMode ? <Sun size={16} color="var(--color-accent)" /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}
