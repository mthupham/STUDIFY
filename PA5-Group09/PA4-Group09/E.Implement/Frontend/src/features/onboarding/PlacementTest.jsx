import React, { useState } from 'react';
import logoSrc from '../../assets/logo.svg';

export default function PlacementTest() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const choices = [
    { key: 'A', text: 'in' },
    { key: 'B', text: 'for' },
    { key: 'C', text: 'on' },
    { key: 'D', text: 'to' }
  ];

  const questionMap = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div style={styles.page}>
      <div style={styles.dashboard}>
        <aside style={styles.sidebar}>
          {/* Top group containing centered logo and menu items */}
          <div style={styles.sidebarTopGroup}>
            <div style={styles.branding}>
              <img src={logoSrc} alt="Studify logo" style={styles.logo} />
            </div>

            <nav style={styles.menu}>
              <button type="button" style={styles.menuButtonActive}>Question Map</button>
              <button type="button" style={styles.menuButton}>Settings</button>
              <button type="button" style={styles.menuButton}>Support</button>
            </nav>
          </div>

          <button type="button" style={styles.submitButton}>Submit Test</button>
        </aside>

        <main style={styles.mainContent}>
          <header style={styles.headerBar}>
            <div style={styles.statusWrapper}>
              <div style={styles.inlineLabel}>Progress</div>
              <div style={styles.loadingTrack}>
                <div style={styles.loadingFill} />
              </div>
            </div>
            <div style={styles.profileAvatar}>JD</div>
          </header>

          <div style={styles.contentGrid}>
            <section style={styles.questionCard}>
              <div style={styles.badge}>Question 5 of 10</div>
              <div style={styles.questionType}>Multiple Choice</div>
              <h2 style={styles.questionTitle}>
                Choose the correct preposition: <span style={styles.highlight}>&quot;She is interested ___ learning new languages.&quot;</span>
              </h2>

              <div style={styles.choiceGrid}>
                {choices.map((choice) => {
                  const active = selectedChoice === choice.key;
                  return (
                    <button
                      key={choice.key}
                      type="button"
                      onClick={() => setSelectedChoice(choice.key)}
                      style={{
                        ...styles.choiceCard,
                        borderColor: active ? '#1D4ED8' : '#E5E7EB',
                        boxShadow: active ? '0 20px 50px rgba(59, 130, 246, 0.16)' : '0 10px 26px rgba(15, 23, 42, 0.06)'
                      }}
                    >
                      <div style={styles.choiceLeft}>
                        <div style={{
                          ...styles.choiceBubble,
                          borderColor: active ? '#1D4ED8' : '#CBD5E1',
                          background: active ? '#DBEAFE' : '#fff'
                        }}>
                          {choice.key}
                        </div>
                      </div>
                      <div style={styles.choiceText}>{choice.text}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <aside style={styles.analyticsPanel}>
              <div style={styles.mapCard}>
                <div style={styles.mapTitle}>Question Map</div>
                <div style={styles.mapGrid}>
                  {questionMap.map((item) => {
                    const status = item < 5 ? 'answered' : item === 5 ? 'current' : 'pending';
                    return (
                      <div
                        key={item}
                        style={{
                          ...styles.mapItem,
                          ...(status === 'answered' ? styles.mapAnswered : {}),
                          ...(status === 'current' ? styles.mapCurrent : {}),
                          ...(status === 'pending' ? styles.mapPending : {})
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <div style={styles.legendRow}>
                  <div style={{ ...styles.legendItem, background: '#16A34A' }} />
                  <div style={styles.legendLabel}>Answered</div>
                  <div style={{ ...styles.legendItem, background: '#2563EB' }} />
                  <div style={styles.legendLabel}>Current</div>
                  <div style={{ ...styles.legendItem, background: '#FCA5A5', border: '1px solid #F87171' }} />
                  <div style={styles.legendLabel}>Pending</div>
                </div>
              </div>

              <div style={styles.accuracyCard}>
                <div style={styles.accuracyBadge}>ON TRACK</div>
                <div style={styles.accuracyScore}>80%</div>
                <div style={styles.accuracyLabel}>Live accuracy</div>
                <div style={styles.accuracyTrack}>
                  <div style={styles.accuracyFill} />
                </div>
              </div>
            </aside>
          </div>

          <footer style={styles.footerBar}>
            <button type="button" style={styles.footerButtonSecondary}>&larr; Previous Question</button>
            <div style={styles.footerActionGroup}>
              <button type="button" style={styles.footerButtonPrimary}>Next Question &rarr;</button>
              <button type="button" style={styles.footerButtonSuccess}>Submit Test</button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F8FAFC',
    padding: '32px',
    display: 'flex',
    justifyContent: 'center'
  },
  dashboard: {
    width: '100%',
    maxWidth: 1400,
    display: 'grid',
    gridTemplateColumns: '256px 1fr', // Matched layout width
    gap: 28
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#a3cef1',           // Matched background color
    borderRight: '1px solid #7c899c', // Matched layout border color
    borderRadius: 28,
    padding: '24px',
    boxSizing: 'border-box',
    minHeight: 760
  },
  sidebarTopGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  branding: {
    display: 'flex',
    justifyContent: 'center',        // Horizontal center alignment
    alignItems: 'center',
    marginTop: -12,
    marginBottom: 16,
    minHeight: 220,                  // Match layout logo height bounds
    width: '100%'
  },
  logo: {
    background: 'none',
    padding: 0,
    borderRadius: 0,
    width: '100%',                   // Uniform image fill
    height: 'auto',
    display: 'block'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 12
  },
  menuButton: {
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'transparent',
    borderRadius: 18,
    padding: '14px 16px',
    fontSize: 15,
    fontWeight: 600,
    color: '#FFFFFF',                // Clean contrast text color
    cursor: 'pointer',
    transition: 'background 150ms ease, color 150ms ease'
  },
  menuButtonActive: {
    width: '100%',
    textAlign: 'left',
    background: '#1E293B',           // Layout dashboard selection fill
    color: '#FFFFFF',
    borderRight: '4px solid #60A5FA', // Side accent tab identifier
    borderRadius: 18,
    padding: '14px 16px',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  },
  submitButton: {
    marginTop: 24,
    width: '100%',
    borderRadius: 18,
    border: 'none',
    padding: '16px 18px',
    fontSize: 16,
    fontWeight: 700,
    color: '#FFFFFF',
    background: '#2563EB',
    cursor: 'pointer',
    transition: 'opacity 180ms ease'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  headerBar: {
    height: 110,                     // Unified interface height metrics
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 32px',
    background: '#FFFFFF',
    borderRadius: 24,
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.07)',
    boxSizing: 'border-box'
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 18
  },
  inlineLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.04em'
  },
  loadingTrack: {
    width: 380,
    height: 10,
    background: '#E2E8F0',
    borderRadius: 999
  },
  loadingFill: {
    width: '52%',
    height: '100%',
    background: '#2563EB',
    borderRadius: 999
  },
  profileAvatar: {
    width: 48,                       // Matched interface dimension metrics
    height: 48,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    fontSize: 15,
    fontWeight: 700,
    color: '#FFFFFF',
    background: '#2563EB'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.7fr 1fr',
    gap: 24
  },
  questionCard: {
    background: '#FFFFFF',
    borderRadius: 28,
    padding: '30px 32px',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    borderRadius: 999,
    background: '#DBEAFE',
    color: '#1D4ED8',
    fontWeight: 700,
    marginBottom: 16,
    fontSize: 14
  },
  questionType: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#64748B',
    letterSpacing: '0.1em',
    marginBottom: 18
  },
  questionTitle: {
    fontSize: 28,
    lineHeight: 1.3,
    color: '#0F172A',
    margin: 0,
    marginBottom: 28
  },
  highlight: {
    color: '#2563EB',
    fontStyle: 'italic'
  },
  choiceGrid: {
    display: 'grid',
    gap: 16
  },
  choiceCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    padding: '18px 20px',
    borderRadius: 20,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    cursor: 'pointer',
    transition: 'border-color 200ms linear, transform 200ms linear, box-shadow 200ms linear'
  },
  choiceLeft: {
    display: 'grid',
    placeItems: 'center'
  },
  choiceBubble: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '2px solid #CBD5E1',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 700,
    color: '#1D4ED8'
  },
  choiceText: {
    fontSize: 17,
    color: '#0F172A'
  },
  analyticsPanel: {
    display: 'grid',
    gap: 20
  },
  mapCard: {
    background: '#FFFFFF',
    borderRadius: 28,
    padding: '28px 24px',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: 18
  },
  mapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: 12,
    marginBottom: 18
  },
  mapItem: {
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: 18,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 700,
    color: '#0F172A',
    border: '2px solid #FCA5A5',
    background: '#FEF2F2'
  },
  mapAnswered: {
    background: '#DCFCE7',
    borderColor: '#16A34A',
    color: '#166534'
  },
  mapCurrent: {
    background: '#1D4ED8',
    borderColor: '#1D4ED8',
    color: '#fff'
  },
  mapPending: {
    background: '#FEF2F2',
    borderColor: '#FCA5A5',
    color: '#B91C1C'
  },
  legendRow: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto auto',
    gap: 10,
    alignItems: 'center'
  },
  legendItem: {
    width: 16,
    height: 16,
    borderRadius: 999
  },
  legendLabel: {
    color: '#475569',
    fontSize: 13,
    letterSpacing: '0.01em'
  },
  accuracyCard: {
    background: '#FFFFFF',
    borderRadius: 28,
    padding: '28px 24px',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)'
  },
  accuracyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: 999,
    background: '#DCFCE7',
    color: '#166534',
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 18
  },
  accuracyScore: {
    fontSize: 48,
    fontWeight: 800,
    color: '#166534',
    marginBottom: 8
  },
  accuracyLabel: {
    color: '#64748B',
    marginBottom: 16,
    fontSize: 14
  },
  accuracyTrack: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    background: '#E2E8F0'
  },
  accuracyFill: {
    width: '80%',
    height: '100%',
    borderRadius: 999,
    background: '#16A34A'
  },
  footerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    padding: '20px 0',
    alignItems: 'center'
  },
  footerButtonSecondary: {
    border: '1px solid #E2E8F0',
    background: '#F8FAFC',
    color: '#475569',
    padding: '14px 20px',
    borderRadius: 18,
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'opacity 180ms ease'
  },
  footerActionGroup: {
    display: 'flex',
    gap: 12
  },
  footerButtonPrimary: {
    border: 'none',
    background: '#2563EB',
    color: '#FFFFFF',
    padding: '14px 22px',
    borderRadius: 18,
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'opacity 180ms ease'
  },
  footerButtonSuccess: {
    border: 'none',
    background: '#0F766E',
    color: '#FFFFFF',
    padding: '14px 22px',
    borderRadius: 18,
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'opacity 180ms ease'
  }
};