import React, { useState } from 'react';
import { BarChart3, DollarSign, MousePointerClick, X, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { getClickAnalytics } from '../services/affiliateManager';
import { getTranslation } from '../services/i18n';

export default function AffiliateDashboard({ onClose, lang }) {
  const [analytics, setAnalytics] = useState(getClickAnalytics());

  const refreshLogs = () => {
    setAnalytics(getClickAnalytics());
  };

  const handleExportCSV = () => {
    const headers = ['ID,Title,Category,Provider,Price,EstCommission,Timestamp\n'];
    const rows = analytics.logs.map(log => 
      `"${log.id}","${log.title}","${log.category}","${log.provider}","${log.price}","${log.estimatedCommission}","${log.timestamp}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `affiliate_analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(19, 17, 16, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="brand-card animate-fade-in" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        background: 'var(--color-paper)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--color-accent)',
            border: 'var(--border-w-primary) solid var(--color-ink-border)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--color-ink)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'var(--color-paper)',
              border: 'var(--border-w-primary) solid var(--color-ink-border)',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart3 size={24} color="var(--color-ink)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Affiliate Revenue & Analytics Hub <br/><span style={{ fontSize: '1.1rem' }}>مركز أرباح وتحليلات الشركاء</span></h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink)', fontWeight: 600 }}>
                Track real-time referral outbound clicks and estimated commission yields.
                <br/>
                تتبع نقرات الإحالة الصادرة في الوقت الفعلي وعوائد العمولات المقدرة.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={refreshLogs} className="brand-btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', gap: '0.4rem' }}>
              <RefreshCw size={14} /> Refresh | تحديث
            </button>
            <button onClick={handleExportCSV} className="brand-btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', gap: '0.4rem' }}>
              <Download size={14} /> Export CSV | تصدير CSV
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="brand-card" style={{ padding: '1.25rem', background: 'var(--color-paper)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-ink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MousePointerClick size={14} color="var(--color-ink)" /> Total Outbound Clicks | إجمالي النقرات
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--color-ink)' }}>
              {analytics.totalClicks}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-ink)', fontWeight: 600, marginTop: '0.2rem' }}>
              +100% Verified Tracking Links
            </div>
          </div>

          <div className="brand-card" style={{ padding: '1.25rem', background: 'var(--color-paper)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-ink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <DollarSign size={14} color="var(--color-ink)" /> Est. Commission | العمولة المقدرة
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--color-ink)' }}>
              ${analytics.totalEstCommission}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-ink)', fontWeight: 600, marginTop: '0.2rem' }}>
              Avg. 5% Payout across Stays & Cars
            </div>
          </div>

          <div className="brand-card" style={{ padding: '1.25rem', background: 'var(--color-paper)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-ink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <TrendingUp size={14} color="var(--color-ink)" /> Active Partner | شركاء نشطون
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.6rem', color: 'var(--color-ink)' }}>
              Travelpayouts & VRBO
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-ink)', fontWeight: 600, marginTop: '0.2rem' }}>
              Booking.com + DiscoverCars
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.8rem' }}>Recent Activity Logs</h3>
        {analytics.logs.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--color-paper)', border: '2px dashed var(--color-ink)', fontWeight: 600 }}>
            No referral clicks logged yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: 'var(--border-w-primary) solid var(--color-ink)', borderRadius: 'var(--radius-default)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-paper-alt)', borderBottom: 'var(--border-w-primary) solid var(--color-ink)', fontWeight: 800 }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Time</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Listing</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Provider</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Price</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Est. Commission</th>
                </tr>
              </thead>
              <tbody>
                {analytics.logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: 'var(--border-w-primary) solid var(--color-ink)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>
                      {log.title}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textTransform: 'capitalize', fontWeight: 600 }}>
                      {log.category}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className="brand-badge brand-badge-teal" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>{log.provider}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>
                      ${log.price}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-teal)' }}>
                      +${log.estimatedCommission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
