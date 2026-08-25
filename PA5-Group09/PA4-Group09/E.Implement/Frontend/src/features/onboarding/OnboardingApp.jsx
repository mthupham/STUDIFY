// src/features/onboarding/OnboardingApp.jsx
import React, { useState } from 'react';
import OnboardingFlow from './OnboardingFlow'; // Your Pace & Selection screens
import PlacementTest from './PlacementTest';   // Your 10-Question quiz screen

export default function OnboardingApp() {
  // Local screen switcher state: 'commitment' | 'proficiency' | 'quiz'
  const [currentScreen, setCurrentScreen] = useState('commitment');

  return (
    <div style={styles.appWrapper}>
      
      {/* 🛠️ DEV TOGGLE BAR (Click to jump straight to any screen) */}
      <nav style={styles.testNav}>
        <span style={styles.navTitle}>Onboarding Dev Views:</span>
        <button 
          onClick={() => setCurrentScreen('commitment')} 
          style={{...styles.navButton, backgroundColor: currentScreen === 'commitment' ? '#2563EB' : '#64748B'}}
        >
          1. Set Your Pace
        </button>
        <button 
          onClick={() => setCurrentScreen('proficiency')} 
          style={{...styles.navButton, backgroundColor: currentScreen === 'proficiency' ? '#2563EB' : '#64748B'}}
        >
          2. Choose Proficiency
        </button>
        <button 
          onClick={() => setCurrentScreen('quiz')} 
          style={{...styles.navButton, backgroundColor: currentScreen === 'quiz' ? '#2563EB' : '#64748B'}}
        >
          3. Placement Test UI
        </button>
      </nav>

      {/* --- DISPLAY ONBOARDING DOMAINS ONLY --- */}
      <main style={styles.mainContent}>
        {currentScreen === 'commitment' && (
          <OnboardingFlow initialStep="commitment" onNext={() => setCurrentScreen('proficiency')} />
        )}
        
        {currentScreen === 'proficiency' && (
          <OnboardingFlow initialStep="proficiency" onNext={() => setCurrentScreen('quiz')} />
        )}
        
        {currentScreen === 'quiz' && (
          <PlacementTest onComplete={() => alert('Onboarding Finished! (Will redirect to learning roadmap later)')} />
        )}
      </main>

    </div>
  );
}

const styles = {
  appWrapper: { display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', backgroundColor: '#F8FAFC', overflow: 'hidden' },
  testNav: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: '#1E293B', color: '#FFFFFF', zIndex: 9999 },
  navTitle: { fontSize: '13px', fontWeight: 'bold', color: '#94A3B8' },
  navButton: { padding: '6px 14px', border: 'none', borderRadius: '6px', color: '#FFFFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  mainContent: { flex: 1, overflowY: 'auto', position: 'relative' }
};