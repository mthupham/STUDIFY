import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div style={styles.wrapper} aria-hidden>
      <div style={styles.track}>
        <div style={{ ...styles.fill, width: `${Math.min(100, Math.max(0, progress))}%` }} />
      </div>
      <div style={styles.label}>{Math.round(progress)}%</div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  track: {
    height: 30,
    width: 400,
    background: '#E6EEF9',
    borderRadius: 999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    background: '#2563EB',
    borderRadius: '50px',
    transition: 'width 250ms ease'
  },
  label: {
    fontSize: 12,
    color: '#374151',
    fontWeight: 700
  }
};
