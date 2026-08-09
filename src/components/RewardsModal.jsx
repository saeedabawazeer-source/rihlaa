import React, { useState } from 'react';
import { Award, Zap, CheckCircle2, Lock, Gift, X, Sparkles, Copy, Check } from 'lucide-react';
import { getGamificationState, DAILY_QUESTS, UNLOCKABLE_PERKS } from '../services/gamification';
import { getTranslation } from '../services/i18n';

export default function RewardsModal({ onClose, lang }) {
  const [state, setState] = useState(getGamificationState());
  const [copiedCode, setCopiedCode] = useState(null);

  const xpCurrentLevel = state.xp % 200;
  const xpProgressPercent = Math.min(100, Math.round((xpCurrentLevel / 200) * 100));

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div style={{
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
      <div className="brand-card" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        background: 'var(--color-paper-card)',
        border: 'var(--border-w-primary) solid var(--color-ink-border)',
        boxShadow: 'var(--shadow-dramatic)',
        position: 'relative',
        borderRadius: 'var(--radius-default)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="rewards-modal-close-btn"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: lang === 'ar' ? 'auto' : '16px',
            left: lang === 'ar' ? '16px' : 'auto',
            background: 'var(--color-paper-alt)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            color: 'var(--color-ink)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'var(--color-accent)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Award size={26} color="#131110" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {lang === 'ar' ? 'مركز مكافآت رحلاء' : 'Rahlaa Rewards Hub'}
              </h2>
              <span className="brand-badge brand-badge-accent font-mono">
                Level {state.level}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink)', opacity: 0.7, fontWeight: 600 }}>
              {lang === 'ar' ? 'اقضِ على التكاليف واكسب قسائم خصم حصرية مع كل بحث وإحالة' : 'Earn XP & unlock exclusive referral discount vouchers with every search.'}
            </p>
          </div>
        </div>

        {/* Level XP Progress Meter */}
        <div className="brand-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--color-paper-alt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            <span>⚡ {lang === 'ar' ? `المستوى ${state.level} - تقدم الخبرة` : `Level ${state.level} XP Progress`}</span>
            <span className="font-mono">{xpCurrentLevel} / 200 XP</span>
          </div>
          <div style={{
            height: '14px',
            background: 'var(--color-paper-card)',
            border: 'var(--border-w-compact) solid var(--color-ink-border)',
            borderRadius: 'var(--radius-pill)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: `${xpProgressPercent}%`,
              background: 'var(--color-accent)',
              borderRadius: 'var(--radius-pill)',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.4rem', opacity: 0.7 }}>
            <span>🔥 {state.streak} {lang === 'ar' ? 'أيام متتالية' : 'Day Streak'}</span>
            <span>+{200 - xpCurrentLevel} XP {lang === 'ar' ? 'للمستوى التالي' : 'to Level Up'}</span>
          </div>
        </div>

        {/* Quests Section */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap size={18} color="var(--color-accent)" /> {lang === 'ar' ? 'المهام اليومية' : 'Daily Travel Quests'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {DAILY_QUESTS.map(quest => {
            const isDone = state.completedQuests.includes(quest.id);
            const title = lang === 'ar' ? quest.titleAr : quest.titleEn;
            const desc = lang === 'ar' ? quest.descAr : quest.descEn;

            return (
              <div key={quest.id} className="brand-card" style={{
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isDone ? 'var(--color-paper-alt)' : 'var(--color-paper-card)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isDone ? (
                    <CheckCircle2 size={22} color="var(--color-emerald)" />
                  ) : (
                    <Sparkles size={22} color="var(--color-teal)" />
                  )}
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>{title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-ink)', opacity: 0.7 }}>{desc}</div>
                  </div>
                </div>

                <span className={`brand-badge ${isDone ? 'brand-badge-teal' : 'brand-badge-accent'}`}>
                  +{quest.xpReward} XP
                </span>
              </div>
            );
          })}
        </div>

        {/* Unlockable Discount Vouchers Section */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Gift size={18} color="var(--color-teal)" /> {lang === 'ar' ? 'قسائم الخصم المفتوحة' : 'Unlocked Discount Vouchers'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {UNLOCKABLE_PERKS.map(perk => {
            const isUnlocked = state.unlockedPerks.includes(perk.id) || state.level >= perk.requiredLevel;
            const title = lang === 'ar' ? perk.titleAr : perk.titleEn;
            const desc = lang === 'ar' ? perk.descAr : perk.descEn;

            return (
              <div key={perk.id} className="brand-card" style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isUnlocked ? 'var(--color-paper-card)' : 'var(--color-paper-alt)',
                opacity: isUnlocked ? 1 : 0.65
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    background: isUnlocked ? perk.badgeColor : 'var(--color-paper-alt)',
                    color: '#131110',
                    border: 'var(--border-w-compact) solid var(--color-ink-border)',
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {isUnlocked ? <Gift size={20} /> : <Lock size={20} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-ink)', opacity: 0.7 }}>{desc}</div>
                  </div>
                </div>

                {isUnlocked ? (
                  <button
                    className="brand-btn-secondary font-mono"
                    onClick={() => handleCopyCode(perk.code)}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                  >
                    {copiedCode === perk.code ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode === perk.code ? 'Copied!' : perk.code}
                  </button>
                ) : (
                  <span className="brand-badge" style={{ fontSize: '0.75rem' }}>
                    Requires Lvl {perk.requiredLevel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
