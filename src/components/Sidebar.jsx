import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/app/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/app/expenses', icon: '💰', label: 'Expenses' },
  { path: '/app/budget', icon: '🎯', label: 'Budget & Goals' },
  { path: '/app/groups', icon: '👥', label: 'Groups' },
  { path: '/app/analytics', icon: '📈', label: 'Analytics' },
  { path: '/app/profile', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, isAdmin } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">💸</span>
          <h1 className="sidebar__title">WealthWhiz</h1>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar__divider" />
              <NavLink
                to="/app/admin"
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
                onClick={onClose}
              >
                <span className="sidebar__icon">🛡️</span>
                <span className="sidebar__label">Admin</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name || 'User'}</span>
              <span className="sidebar__user-role">{user?.role || 'Student'}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
