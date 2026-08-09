import React, { useEffect, useRef, useState } from 'react';
import { Navigation, ExternalLink, Star, MapPin } from 'lucide-react';
import { getTranslation } from '../services/i18n';

export default function InteractiveMap({ listings, onSelectDeal, currency, lang }) {
  const mapRef = useRef(null);
  const leafletInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedPin, setSelectedPin] = useState(listings[0] || null);

  const isAr = lang === 'ar';
  const currencySymbol = currency === 'EUR €' ? '€' : currency === 'GBP £' ? '£' : '$';
  const currencyMultiplier = currency === 'EUR €' ? 0.92 : currency === 'GBP £' ? 0.78 : 1.0;

  // Initialize & Update Leaflet OpenStreetMap Engine
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined' || !window.L) return;

    const L = window.L;

    // Default center (Paris or first item)
    const defaultCenter = listings[0] && listings[0].lat ? [listings[0].lat, listings[0].lng] : [48.8566, 2.3522];

    if (!leafletInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: defaultCenter,
        zoom: 4,
        zoomControl: false
      });

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Add Zoom Control top right
      L.control.zoom({ position: isAr ? 'topleft' : 'topright' }).addTo(map);

      leafletInstanceRef.current = map;
    }

    const map = leafletInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add Live Map Markers
    listings.forEach(item => {
      if (!item.lat || !item.lng) return;

      const displayPrice = Math.round((item.price || item.dailyRate || 100) * currencyMultiplier);
      const isSelected = selectedPin?.id === item.id;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div style="
            background: ${isSelected ? '#FF7A00' : '#FFFFFF'};
            color: #131110;
            border: 2px solid #131110;
            border-radius: 8px;
            padding: 3px 8px;
            font-size: 12px;
            font-weight: 800;
            font-family: monospace;
            box-shadow: 2px 2px 0px #131110;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
          ">
            <span>${currencySymbol}${displayPrice}</span>
          </div>
        `,
        iconSize: [60, 30],
        iconAnchor: [30, 15]
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedPin(item);
        map.panTo([item.lat, item.lng]);
      });

      markersRef.current.push(marker);
    });

  }, [listings, currency, selectedPin, lang]);

  return (
    <div style={{
      background: 'var(--color-paper-card)',
      border: 'var(--border-w-primary) solid var(--color-ink-border)',
      boxShadow: 'var(--shadow-lg)',
      borderRadius: 'var(--radius-default)',
      height: '620px',
      position: 'sticky',
      top: '90px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Map Header */}
      <div style={{
        padding: '0.85rem 1.25rem',
        borderBottom: 'var(--border-w-primary) solid var(--color-ink-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--color-teal)',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 800 }}>
          <Navigation size={18} color="#FFFFFF" />
          {getTranslation('mapView', lang)} OpenStreetMap ({listings.length} {getTranslation('found', lang)})
        </div>
        <span className="brand-badge brand-badge-accent" style={{ fontSize: '0.75rem' }}>
          Live Map Pins
        </span>
      </div>

      {/* Real Leaflet Map Container */}
      <div style={{ position: 'relative', flex: 1 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

        {/* Selected Property Preview Popup Card */}
        {selectedPin && (
          <div className="brand-card" style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            padding: '1rem',
            background: 'var(--color-paper-card)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <img
              src={selectedPin.image}
              alt={isAr ? (selectedPin.titleAr || selectedPin.titleEn) : selectedPin.titleEn}
              style={{
                width: '95px',
                height: '75px',
                borderRadius: 'var(--radius-default)',
                border: 'var(--border-w-compact) solid var(--color-ink-border)',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-teal)', textTransform: 'uppercase' }}>
                {selectedPin.provider} • {isAr ? (selectedPin.locationAr || selectedPin.locationEn) : selectedPin.locationEn}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0.2rem 0' }}>
                {isAr ? (selectedPin.titleAr || selectedPin.titleEn) : selectedPin.titleEn}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="brand-badge brand-badge-accent">
                  <Star size={12} fill="var(--color-ink)" color="var(--color-ink)" /> {selectedPin.rating}
                </span>
                <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                  {currencySymbol}{Math.round((selectedPin.price || selectedPin.dailyRate || 100) * currencyMultiplier)}
                </span>
              </div>
            </div>

            <button
              className="brand-btn-primary"
              onClick={() => onSelectDeal(selectedPin)}
              style={{ padding: '0.6rem 1rem', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
            >
              {getTranslation('checkDeal', lang)} <ExternalLink size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
