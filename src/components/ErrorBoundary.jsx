import React from 'react';
import { Compass, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Rahlaa App Boundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--color-paper, #F6EFE3)',
          color: 'var(--color-ink, #131110)',
          fontFamily: 'sans-serif'
        }}>
          <div className="brand-card" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: '#FFFFFF',
            border: '3px solid #000000',
            borderRadius: '8px',
            boxShadow: '6px 6px 0px #131110'
          }}>
            <div style={{
              background: '#FF7A00',
              border: '3px solid #000000',
              width: '56px',
              height: '56px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <Compass size={32} color="#131110" />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Something Went Unexpectedly Wrong
            </h2>

            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Rahlaa encountered a minor rendering issue. Don't worry, your travel preferences and XP rewards are safe!
            </p>

            <button
              onClick={this.handleReload}
              className="brand-btn-primary"
              style={{
                background: '#0B7A75',
                color: '#FFFFFF',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                border: '3px solid #000000',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '3px 3px 0px #000000'
              }}
            >
              <RefreshCw size={18} /> Reload Rahlaa Platform
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
