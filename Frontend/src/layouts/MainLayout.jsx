import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { name: 'Roadmap', path: '/roadmap', icon: 'roadmap' },
  { name: 'Lesson', path: '/lessons', icon: 'lesson' },
  { name: 'Flashcards', path: '/flashcards', icon: 'flashcards' },
  { name: 'Study Groups', path: '/study-groups', icon: 'groups' },
  { name: 'AI Speaking', path: '/ai-speaking', icon: 'mic' },
  { name: 'Settings', path: '/settings', icon: 'settings' }
];

function NavIcon({ type, color = '#424754' }) {
  const common = {
    width: 18,
    height: 18,
    stroke: color,
    strokeWidth: 2,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };

  switch (type) {
    case 'roadmap':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <path d="M4 19V5" {...common} />
          <path d="M20 19V5" {...common} />
          <path d="M4 7H20" {...common} />
          <path d="M4 12H20" {...common} />
          <path d="M4 17H20" {...common} />
        </svg>
      );
    case 'lesson':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <path d="M4 7L12 3L20 7L12 11L4 7Z" {...common} />
          <path d="M4 12L12 16L20 12" {...common} />
          <path d="M4 17L12 21L20 17" {...common} />
        </svg>
      );
    case 'flashcards':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <rect x="3" y="6" width="14" height="12" rx="2" {...common} />
          <rect x="7" y="4" width="14" height="12" rx="2" {...common} />
        </svg>
      );
    case 'groups':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <circle cx="8" cy="9" r="3" {...common} />
          <circle cx="17" cy="10" r="2.5" {...common} />
          <path d="M3.5 19C4.6 16.5 6.6 15 8.9 15C11.2 15 13.2 16.5 14.2 19" {...common} />
          <path d="M14 19C14.7 17.2 16 16 17.6 16" {...common} />
        </svg>
      );
    case 'mic':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <rect x="9" y="4" width="6" height="10" rx="3" {...common} />
          <path d="M6 11C6 14.3 8.7 17 12 17C15.3 17 18 14.3 18 11" {...common} />
          <path d="M12 17V21" {...common} />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <circle cx="12" cy="12" r="3" {...common} />
          <path d="M19 12C19 11.2 18.9 10.5 18.6 9.8L20.4 8.4L18.6 5.4L16.5 6.1C15.9 5.6 15.2 5.2 14.4 5L14 3H10L9.6 5C8.8 5.2 8.1 5.6 7.5 6.1L5.4 5.4L3.6 8.4L5.4 9.8C5.1 10.5 5 11.2 5 12C5 12.8 5.1 13.5 5.4 14.2L3.6 15.6L5.4 18.6L7.5 17.9C8.1 18.4 8.8 18.8 9.6 19L10 21H14L14.4 19C15.2 18.8 15.9 18.4 16.5 17.9L18.6 18.6L20.4 15.6L18.6 14.2C18.9 13.5 19 12.8 19 12Z" {...common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" style={styles.navIconSvg} aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" {...common} />
          <rect x="14" y="4" width="6" height="6" {...common} />
          <rect x="4" y="14" width="6" height="6" {...common} />
          <rect x="14" y="14" width="6" height="6" {...common} />
        </svg>
      );
  }
}

function BellIcon({ color = '#131B2E' }) {
  return (
    <svg viewBox="0 0 24 24" style={styles.bellIcon} aria-hidden="true">
      <path d="M6 9C6 5.8 8.3 3 12 3C15.7 3 18 5.8 18 9V14L20 16H4L6 14V9Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19C10.5 20 11.2 20.5 12 20.5C12.8 20.5 13.5 20 14 19" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 992);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={styles.appBackground}>
      <div style={styles.shell}>
        <aside style={{ ...styles.sidebar, ...(isMobile ? styles.sidebarMobile : {}) }}>
          <div style={styles.logoArea}>
            <h1 style={styles.brandText}>Studify</h1>
          </div>

          <nav style={{ ...styles.navList, ...(isMobile ? styles.navListMobile : {}) }}>
            {navItems.map((item) => {
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  style={({ isActive }) => ({
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                    ...(isMobile ? styles.navItemMobile : {}),
                    textDecoration: 'none'
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span style={styles.navIconWrap}>
                        <NavIcon type={item.icon} color={isActive ? '#0058BE' : '#424754'} />
                      </span>
                      <span style={{ ...styles.navLabel, ...(isActive ? styles.navLabelActive : {}) }}>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {!isMobile ? (
            <button type="button" style={styles.signOutButton}>Sign out</button>
          ) : null}
        </aside>

        <div style={styles.mainArea}>
          <header style={styles.header}>
            <div style={{ ...styles.searchPill, ...(isMobile ? styles.searchPillMobile : {}) }}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                type="search"
                placeholder="Search lessons..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.headerRight}>
              <button type="button" style={styles.notificationButton} aria-label="Notifications">
                <BellIcon />
                <span style={styles.notificationDot} />
              </button>
              <div style={styles.avatar}>LP</div>
            </div>
          </header>

          <main style={styles.mainContent}>{children}</main>
        </div>
      </div>
    </div>
  );
}

const styles = {
  appBackground: {
    background: '#FAF8FF',
    minHeight: '100vh'
  },
  shell: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    background: 'linear-gradient(90deg, #FAF8FF 0%, #FAF8FF 100%)'
  },
  sidebar: {
    width: 255,
    height: '100vh',
    background: '#F9F9FF',
    borderRight: '1px solid #C2C6D6',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px 16px',
    boxSizing: 'border-box'
  },
  sidebarMobile: {
    width: 220,
    padding: '16px 12px'
  },
  logoArea: {
    marginBottom: 16,
    padding: '0 8px'
  },
  brandText: {
    margin: 0,
    fontSize: 32,
    fontWeight: 700,
    color: '#0058BE',
    letterSpacing: '0.02em'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginTop: 6,
    overflowY: 'auto'
  },
  navListMobile: {
    paddingBottom: 12
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 10,
    color: '#424754',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    transition: 'background 140ms ease, color 140ms ease, border 140ms ease'
  },
  navItemMobile: {
    padding: '10px 12px'
  },
  navItemActive: {
    background: '#F0F3FF',
    color: '#0058BE',
    borderRight: '4px solid #0058BE'
  },
  navIconWrap: {
    width: 22,
    height: 22,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navIconSvg: {
    width: 18,
    height: 18,
    display: 'block'
  },
  navLabel: {
    display: 'block',
    whiteSpace: 'nowrap'
  },
  navLabelActive: {
    fontWeight: 700
  },
  signOutButton: {
    marginTop: 'auto',
    border: 'none',
    background: '#0058BE',
    color: '#FFFFFF',
    borderRadius: 12,
    minHeight: 48,
    fontSize: 20,
    cursor: 'pointer'
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  header: {
    minHeight: 80,
    background: '#F9F9FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
  },
  searchPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#E7EEFE',
    borderRadius: 999,
    padding: '8px 16px',
    minWidth: 300,
    width: 384,
    maxWidth: '60vw',
    minHeight: 40
  },
  searchPillMobile: {
    minWidth: 0,
    width: '100%',
    maxWidth: '100%'
  },
  searchIcon: {
    fontSize: 20,
    color: '#6B7280',
    lineHeight: 1
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: 16,
    color: '#111827',
    height: 28
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0
  },
  notificationButton: {
    position: 'relative',
    width: 20,
    height: 20,
    border: 'none',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  bellIcon: {
    width: 16,
    height: 20
  },
  notificationDot: {
    position: 'absolute',
    top: -3,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#BA1A1A',
    border: '2px solid #F9F9FF'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#C9D8F7',
    border: '2px solid #2170E4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#154089',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    padding: 24,
    background: '#FAF8FF',
    boxSizing: 'border-box'
  }
};
