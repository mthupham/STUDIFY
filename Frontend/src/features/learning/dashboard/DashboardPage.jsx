import React, { useState } from 'react';
import ProgressBar from '../../../components/ProgressBar';

export default function Dashboard() {
  const [tasks, setTasks] = useState([false, false, false, false]);

  const toggle = (i) => {
    const next = [...tasks];
    next[i] = !next[i];
    setTasks(next);
  };

  const completed = tasks.filter(Boolean).length;
  const progress = (completed / tasks.length) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.title}>
          Welcome back, <span style={styles.italic}>Daniel!</span> 👋
        </h1>
        <p style={styles.text}>
          You're making incredible progress. Your consistency is paying off — keep up the momentum today!
        </p>
      </div>

      <div style={styles.row}>
        <ProgressBar progress={progress} />
      </div>

      <div style={styles.checklist}>
        {['Task One','Task Two','Task Three','Task Four'].map((label, i) => (
          <label key={label} style={styles.item}>
            <input type="checkbox" checked={tasks[i]} onChange={() => toggle(i)} />
            <span style={styles.itemLabel}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    padding: 24
  },
  banner: {
    background: '#2563EB', 
    padding: '50px 40px',
    borderRadius: '20px',
    color: '#FFFFFF',
    fontFamily: 'sans-serif'
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
  item: { display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, cursor: 'pointer' },
  itemLabel: { color: '#0F172A' }
};