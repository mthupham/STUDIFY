import React from 'react';
import logoUrl from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Roadmap', path: '/roadmap' },
  { name: 'Lessons', path: '/lessons' },
  { name: 'Flashcards', path: '/flashcards' },
  { name: 'Study Groups', path: '/study-groups' },
  { name: 'AI Speaking', path: '/ai-speaking' },
  { name: 'Settings', path: '/settings' },
];

export default function MainLayout({ children }) {
  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <img src={logoUrl} alt="Studify logo" style={styles.logoImage} />
        </div>

        <nav style={styles.navList}>
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                  textDecoration: 'none'
                })}
              >
                <span style={styles.navLabel}>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div style={styles.mainArea}>
        <header style={styles.header}>
          <div style={styles.searchPill}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="search"
              placeholder="Search lessons..."
              style={styles.searchInput}
            />
          </div>
          <div style={styles.headerRight}>
            <button type="button" style={styles.iconButton} aria-label="Notifications">
              <span style={styles.bellIcon}>🔔</span>
              <span style={styles.notificationDot} />
            </button>
            <div style={styles.avatar}>LP</div>
          </div>
        </header>

        <main style={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    background: '#F8FAFC'
  },
  sidebar: {
    width: 256,
    height: '100vh',
    background: '#a3cef1',
    borderRight: '1px solid #7c899c',
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    boxSizing: 'border-box'
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
    marginBottom: 16,
    minHeight: 220
  },
  logoImage: {
    width: 256,
    height: 256,
    display: 'block',
    position: 'relative',
    top: -6
  },
  brandText: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF',
    letterSpacing: '0.02em'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 12
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    borderRadius: 18,
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 600,
    transition: 'background 150ms ease, color 150ms ease'
  },
  navItemActive: {
    background: '#1E293B',
    color: '#FFFFFF',
    borderRight: '4px solid #60A5FA'
  },
  navLabel: {
    display: 'block'
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden'
  },
  header: {
    height: 110,
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  searchPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: '#F8FAFC',
    border: '1px solid #E5E7EB',
    borderRadius: 999,
    padding: '0 24px',
    minWidth: 300,
    height: 56
  },
  searchIcon: {
    fontSize: 22,
    color: '#6B7280'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: 18,
    color: '#111827',
    height: '100%'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 18
  },
  iconButton: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 16,
    border: '1px solid #E5E7EB',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  bellIcon: {
    fontSize: 20,
    color: '#374151'
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#EF4444',
    border: '2px solid #FFFFFF'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    padding: 32,
    background: '#F8FAFC',
    boxSizing: 'border-box'
  }
};
