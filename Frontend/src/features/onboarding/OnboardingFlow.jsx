import React from 'react';

export default function OnboardingFlow({ initialStep, onNext }) {
  const paceOptions = [
    {
      title: '2 hours/week',
      subtitle: 'Casual learner • 15 mins a day',
      color: '#60A5FA'
    },
    {
      title: '4 hours/week',
      subtitle: 'Steady progress • 35 mins a day',
      color: '#3B82F6'
    },
    {
      title: '6 hours/week',
      subtitle: 'Serious study • 50 mins a day',
      color: '#2563EB'
    },
    {
      title: '8+ hours/week',
      subtitle: 'Immersive path • 1+ hour a day',
      color: '#1D4ED8'
    }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.panel}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: initialStep === 'commitment' ? '50%' : '100%'
            }}
          />
        </div>

        {initialStep === 'commitment' && (
          <div style={styles.stepContainer}>
            <div style={styles.header}>
              <h2 style={styles.title}>Set your pace</h2>
              <p style={styles.subtitle}>
                Choose the study rhythm that fits your daily routine and keeps you engaged.
              </p>
            </div>

            <div style={styles.grid}>
              {paceOptions.map((option) => (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => onNext && onNext(option)}
                  style={styles.card}
                >
                  <div style={{ ...styles.iconCircle, background: option.color }} />
                  <div style={styles.cardText}>
                    <div style={styles.cardTitle}>{option.title}</div>
                    <div style={styles.cardSubtitle}>{option.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {initialStep === 'proficiency' && (
          <div style={styles.stepContainer}>
            <div style={styles.header}>
              <h2 style={styles.title}>Do you know your current English level?</h2>
              <p style={styles.subtitle}>
                Pick the best option so we can place you in the right learning path.
              </p>
            </div>

            <div style={styles.optionBox}>
              <button
                type="button"
                onClick={() => onNext && onNext()}
                style={{ ...styles.selectionButton, marginBottom: 16 }}
              >
                <div>
                  <div style={styles.selectionTitle}>Yes, I know my level</div>
                  <div style={styles.selectionSubtitle}>
                    I want to manually select my starting point A1-C2.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNext && onNext()}
                style={styles.selectionButton}
              >
                <div>
                  <div style={styles.selectionTitle}>No, I want to take a placement test</div>
                  <div style={styles.selectionSubtitle}>
                    Recommended. Takes ~15 minutes to find your perfect fit.
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8FAFC',
    padding: '40px 20px'
  },
  panel: {
    width: '100%',
    maxWidth: 960,
    background: '#FFFFFF',
    borderRadius: 28,
    padding: '32px 36px',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
  },
  progressTrack: {
    height: 6,
    background: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 32
  },
  progressFill: {
    height: '100%',
    background: '#3B82F6',
    borderRadius: 999,
    transition: 'width 280ms ease'
  },
  stepContainer: {
    display: 'grid',
    gap: 28
  },
  header: {
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.15,
    color: '#0F172A'
  },
  subtitle: {
    marginTop: 14,
    color: '#475569',
    fontSize: 16,
    lineHeight: 1.7,
    maxWidth: 680,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 18
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    padding: '22px 20px',
    borderRadius: 22,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)'
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    flexShrink: 0
  },
  cardText: {
    display: 'grid',
    gap: 6,
    textAlign: 'left'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0F172A'
  },
  cardSubtitle: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 1.6
  },
  optionBox: {
    display: 'grid',
    gap: 16
  },
  selectionButton: {
    width: '100%',
    padding: '20px 22px',
    borderRadius: 22,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)'
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0F172A'
  },
  selectionSubtitle: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 14,
    lineHeight: 1.75
  }
};