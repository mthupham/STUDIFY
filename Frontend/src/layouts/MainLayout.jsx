import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Roadmap', path: '/roadmap' },
  { name: 'Lessons', path: '/lessons' },
  { name: 'Flashcard', path: '/flashcard' },
  { name: 'Study Groups', path: '/study-groups' },
  { name: 'AI Speaking', path: '/ai-speaking' },
  { name: 'Setting', path: '/settings' },
];

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.brandArea}>
          <NavLink to="/" style={styles.brandLink}>
            <span style={styles.brandText}>Studify</span>
          </NavLink>
        </div>

        <nav style={styles.navList}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : styles.navItemInactive),
              })}
            >
              <span style={styles.navLabel}>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          style={styles.signOutButton}
          onClick={() => navigate('/')}
        >
          Sign out
        </button>
      </aside>

      <div style={styles.mainArea}>
        <header style={styles.header}>
          <div style={styles.searchPill}>
            <input
              type="search"
              placeholder="Search lessons..."
              style={styles.searchInput}
            />
          </div>

          <div style={styles.headerRight}>
            <button type="button" style={styles.iconButton} aria-label="Notifications">
              <span style={styles.bellIcon}>🔔</span>
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
    background: '#F8FAFC',
  },
  sidebar: {
    width: 280,
    minHeight: '100vh',
    background: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  brandArea: {
    marginBottom: 24,
    padding: '0 8px',
  },
  brandLink: {
    textDecoration: 'none',
  },
  brandText: {
    color: '#0058BE',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '32px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  navItem: {
    display: 'block',
    textDecoration: 'none',
    borderRadius: 12,
    padding: '12px 16px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  navItemInactive: {
    color: '#424754',
    background: 'transparent',
  },
  navItemActive: {
    color: '#0058BE',
    background: '#F0F3FF',
  },
  navLabel: {
    fontSize: 16,
    lineHeight: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 500,
  },
  signOutButton: {
    marginTop: 'auto',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: 12,
    background: '#0058BE',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  header: {
    height: 70,
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxSizing: 'border-box',
  },
  searchPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#F8FAFC',
    border: '1px solid #E5E7EB',
    borderRadius: 999,
    padding: '0 16px',
    minWidth: 300,
    height: 40,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: 14,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  bellIcon: {
    fontSize: 18,
    color: '#374151',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    padding: 32,
    background: '#F8FAFC',
    boxSizing: 'border-box',
  },
};
