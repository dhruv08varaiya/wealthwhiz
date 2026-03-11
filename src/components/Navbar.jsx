import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav className="top-navbar">
      <div className="top-navbar__left">
        <button className="top-navbar__menu-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          <span className="top-navbar__hamburger">☰</span>
        </button>
        <div className="top-navbar__search">
          <span className="top-navbar__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search expenses... (press /)"
            className="top-navbar__search-input"
            id="global-search"
          />
        </div>
      </div>

      <div className="top-navbar__right">
        <button
          className="top-navbar__icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <button className="top-navbar__icon-btn" aria-label="Notifications" title="Notifications">
          🔔
          <span className="top-navbar__badge">3</span>
        </button>

        <div className="top-navbar__profile" ref={dropdownRef}>
          <button
            className="top-navbar__profile-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="top-navbar__profile-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="top-navbar__profile-name">{user?.name?.split(' ')[0] || 'User'}</span>
            <span style={{ fontSize: '0.6rem', marginLeft: 4 }}>▾</span>
          </button>

          {dropdownOpen && (
            <div className="top-navbar__dropdown">
              <button className="top-navbar__dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/app/profile'); }}>
                ⚙️ Settings
              </button>
              <div className="top-navbar__dropdown-divider" />
              <button className="top-navbar__dropdown-item top-navbar__dropdown-item--danger" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
