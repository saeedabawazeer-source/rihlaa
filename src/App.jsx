import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import ListingGrid from './components/ListingGrid';
import FilterSidebar from './components/FilterSidebar';
import InteractiveMap from './components/InteractiveMap';
import PropertyDetailPage from './components/PropertyDetailPage';
import AboutPage from './components/AboutPage';
import AffiliateModal from './components/AffiliateModal';
import AffiliateSettingsModal from './components/AffiliateSettingsModal';
import AffiliateDashboard from './components/AffiliateDashboard';
import Footer from './components/Footer';
import { HOTELS_DATA, VACATION_RENTALS_DATA, CAR_RENTALS_DATA } from './services/mockData';
import { getTranslation, getDir } from './services/i18n';
import { updateSEOMeta } from './services/seo';
import { LayoutGrid, Map, ArrowUpDown, Building2, Home, Car } from 'lucide-react';

export default function App() {
  // Navigation State ('catalog' | 'detail' | 'about')
  const [currentPage, setCurrentPage] = useState('catalog');
  const [activeTab, setActiveTab] = useState('hotels');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD $');
  const [lang, setLang] = useState('en');

  // Selected Property for Full Detail Page
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Search & Filter State
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [guests, setGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState(600);
  const [minRating, setMinRating] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState('All Providers');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  // Modals State
  const [selectedDealModal, setSelectedDealModal] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Sync Document Attributes & Dynamic SEO Meta Tags
  useEffect(() => {
    document.documentElement.setAttribute('dir', getDir(lang));
    document.documentElement.setAttribute('lang', lang);
    updateSEOMeta(activeTab, lang);
  }, [activeTab, lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const listings = useMemo(() => {
    let dataset = [];
    if (activeTab === 'hotels') dataset = HOTELS_DATA;
    else if (activeTab === 'rentals') dataset = VACATION_RENTALS_DATA;
    else if (activeTab === 'cars') dataset = CAR_RENTALS_DATA;
    
    return dataset.filter(item => {
      const price = item.price || item.dailyRate || 0;
      const locationMatch = selectedLocation === 'All' || 
        (item.locationEn && item.locationEn.toLowerCase().includes(selectedLocation.toLowerCase()));
      const priceMatch = price <= maxPrice;
      const ratingMatch = minRating === 0 || item.rating >= minRating;
      const providerMatch = selectedProvider === 'All Providers' || item.provider === selectedProvider;
      return locationMatch && priceMatch && ratingMatch && providerMatch;
    }).sort((a, b) => {
      const priceA = a.price || a.dailyRate || 0;
      const priceB = b.price || b.dailyRate || 0;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeTab, selectedLocation, maxPrice, minRating, selectedProvider, sortBy]);

  const handleToggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleResetFilters = () => {
    setMaxPrice(600);
    setMinRating(0);
    setSelectedProvider('All Providers');
    setSelectedAmenities([]);
    setSelectedLocation('All');
    setSortBy('recommended');
  };

  const handleSelectProperty = (item) => {
    setSelectedProperty(item);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Streamlined Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCurrentPage('catalog');
          handleResetFilters();
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currency={currency}
        setCurrency={setCurrency}
        lang={lang}
        setLang={setLang}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onGoHome={() => {
          setCurrentPage('catalog');
          setSelectedProperty(null);
        }}
      />

      {currentPage === 'about' && (
        <AboutPage lang={lang} />
      )}

      {currentPage === 'detail' && selectedProperty && (
        <PropertyDetailPage
          item={selectedProperty}
          onBack={() => setCurrentPage('catalog')}
          currency={currency}
          lang={lang}
        />
      )}

      {currentPage === 'catalog' && (
        <div>
          {/* Hero Console Search */}
          <HeroSearch
            activeTab={activeTab}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            guests={guests}
            setGuests={setGuests}
            onSearchSubmit={() => {}}
            lang={lang}
          />

          {/* Main Catalog View */}
          <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem 3rem 1.5rem', width: '100%', flex: 1 }}>
            
            {/* Toolbar Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: 'var(--border-w-primary) solid var(--color-ink-border)',
              paddingBottom: '1rem'
            }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {activeTab === 'hotels' && <Building2 color="var(--color-teal)" size={22} />}
                  {activeTab === 'rentals' && <Home color="var(--color-teal)" size={22} />}
                  {activeTab === 'cars' && <Car color="var(--color-teal)" size={22} />}
                  
                  {selectedLocation !== 'All' ? `${selectedLocation}` : getTranslation('allDestinations', lang)}
                  <span className="brand-badge brand-badge-accent font-mono" style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}>
                    {listings.length} {getTranslation('found', lang)}
                  </span>
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                
                {/* Sort Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <ArrowUpDown size={14} />
                  <select
                    id="sort-select-dropdown"
                    aria-label={getTranslation('recommended', lang)}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      background: 'var(--color-paper-card)',
                      color: 'var(--color-ink)',
                      border: 'var(--border-w-compact) solid var(--color-ink-border)',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-default)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      boxShadow: '2px 2px 0px var(--color-ink-border)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="recommended">{getTranslation('recommended', lang)}</option>
                    <option value="price-asc">{getTranslation('priceLowHigh', lang)}</option>
                    <option value="price-desc">{getTranslation('priceHighLow', lang)}</option>
                    <option value="rating">{getTranslation('highestRated', lang)}</option>
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    id="view-mode-grid-btn"
                    aria-label={getTranslation('grid', lang)}
                    className="brand-btn-secondary"
                    onClick={() => setViewMode('grid')}
                    style={{
                      background: viewMode === 'grid' ? 'var(--color-accent)' : 'var(--color-paper-alt)',
                      color: viewMode === 'grid' ? '#131110' : 'var(--color-ink)',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.82rem'
                    }}
                  >
                    <LayoutGrid size={15} /> {getTranslation('grid', lang)}
                  </button>

                  <button
                    id="view-mode-map-btn"
                    aria-label={getTranslation('mapView', lang)}
                    className="brand-btn-secondary"
                    onClick={() => setViewMode('map')}
                    style={{
                      background: viewMode === 'map' ? 'var(--color-teal)' : 'var(--color-paper-alt)',
                      color: viewMode === 'map' ? '#FFFFFF' : 'var(--color-ink)',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.82rem'
                    }}
                  >
                    <Map size={15} /> {getTranslation('mapView', lang)}
                  </button>
                </div>
              </div>
            </div>

            {/* Grid vs Map View Layout */}
            <div className="catalog-main-layout">
              
              <FilterSidebar
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                activeTab={activeTab}
                onResetFilters={handleResetFilters}
                lang={lang}
              />

              {viewMode === 'map' ? (
                <InteractiveMap
                  listings={listings}
                  onSelectDeal={handleSelectProperty}
                  currency={currency}
                  lang={lang}
                />
              ) : (
                <div>
                  {listings.length === 0 ? (
                    <div className="brand-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>{getTranslation('noListings', lang)}</h3>
                      <button id="reset-filters-btn" aria-label={getTranslation('resetAllFilters', lang)} className="brand-btn-primary" style={{ marginTop: '0.5rem' }} onClick={handleResetFilters}>
                        {getTranslation('resetAllFilters', lang)}
                      </button>
                    </div>
                  ) : (
                    <ListingGrid 
                      listings={listings}
                      currency={currency}
                      onSelectDeal={handleSelectProperty}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      lang={lang}
                    />
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* Modals */}
      {selectedDealModal && (
        <AffiliateModal
          item={selectedDealModal}
          onClose={() => setSelectedDealModal(null)}
          currency={currency}
          lang={lang}
        />
      )}

      {isSettingsOpen && (
        <AffiliateSettingsModal
          onClose={() => setIsSettingsOpen(false)}
          onSaved={() => {}}
          lang={lang}
        />
      )}

      {isDashboardOpen && (
        <AffiliateDashboard
          onClose={() => setIsDashboardOpen(false)}
          lang={lang}
        />
      )}

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
