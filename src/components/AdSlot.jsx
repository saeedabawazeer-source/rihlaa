import React from 'react';

export default function AdSlot({ slotId = 'ad-banner-1', format = 'horizontal' }) {
  const heights = {
    horizontal: '100px',
    rectangle: '250px',
    vertical: '600px'
  };

  return (
    <div
      id={slotId}
      className="font-mono"
      style={{
        width: '100%',
        height: heights[format] || '100px',
        background: 'var(--color-paper-alt)',
        border: 'var(--border-w-compact) dashed var(--color-ink-border)',
        borderRadius: 'var(--radius-default)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.5rem 0',
        color: 'var(--color-ink)',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'var(--color-ink)',
        color: 'var(--color-paper)',
        padding: '2px 8px',
        fontSize: '0.65rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        borderBottomLeftRadius: 'var(--radius-default)'
      }}>
        Advertisement
      </div>
      <span style={{ fontSize: '0.68rem', opacity: 0.5, marginTop: '0.5rem' }}>AdSense / GAMR Compliant Placement Zone</span>
    </div>
  );
}
