import React, { useState } from 'react';
import { useAuthStore } from '../../auth/store/useAuthStore';
import ProgressBar from '../../../components/ProgressBar';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.title}>
          Welcome back, <span style={styles.italic}>{user?.name || 'Student'}</span> 👋
        </h1>
        <p style={styles.text}>
          Email: {user?.email || 'No account loaded yet'}
        </p>
      </div>

      <div style={styles.row}>
        <ProgressBar progress={65} />
      </div>

      <div style={styles.checklist}>
        {['Task One','Task Two','Task Three','Task Four'].map((label) => (
          <div key={label} style={styles.item}>
            <span style={styles.itemLabel}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    padding: 24,
    minHeight: '100vh',
    background: '#f8fafc'
  },
  banner: {
    background: '#2563EB', 
    padding: '50px 40px',
    borderRadius: '20px',
    color: '#FFFFFF',
    fontFamily: 'system-ui, sans-serif'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '50px',
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: '3px'
  },
  text: {
    margin: 0,
    fontSize: '36px',
    lineHeight: '1.4',
    opacity: 0.9 
  },
  row: { marginTop: 10, marginBottom: 18 },
  checklist: { display: 'grid', gap: 10, marginTop: 8 },
  item: { display: 'flex', alignItems: 'center', gap: 12, fontSize: 16 },
  itemLabel: { color: '#0F172A' }
};