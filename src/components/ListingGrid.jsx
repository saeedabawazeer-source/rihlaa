import React from 'react';
import ListingCard from './ListingCard';
import AdSlot from './AdSlot';

export default function ListingGrid({ listings, currency, onSelectDeal, favorites, onToggleFavorite, lang }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
      gap: '1.5rem'
    }}>
      {listings.map((item, index) => {
        // Insert AdSlot after every 4th item
        const showAd = index > 0 && index % 4 === 0;
        return (
          <React.Fragment key={item.id}>
            {showAd && (
              <div style={{ gridColumn: '1 / -1' }}>
                <AdSlot slotId={`grid-ad-${index}`} format="horizontal" />
              </div>
            )}
            <ListingCard
              item={item}
              currency={currency}
              onSelectDeal={onSelectDeal}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              lang={lang}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
