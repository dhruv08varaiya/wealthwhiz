import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CURRENCIES } from '../../utils/constants';
import Toast from '../../components/Toast';
import { useState } from 'react';
import './Profile.css';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { currency, changeCurrency } = useCurrency();
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  return (
    <div className="profile-page animate-fade-in">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h2 className="profile-page__title">⚙️ Settings</h2>

      {/* Profile Info */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Profile Information</h5>
        <form onSubmit={handleSave}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" defaultValue={user?.name} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" defaultValue={user?.email} disabled />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
        </form>
      </div>

      {/* Preferences */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Preferences</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Theme</label>
            <div className="d-flex gap-3">
              <button className={`btn ${!isDark ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => isDark && toggleTheme()}>☀️ Light</button>
              <button className={`btn ${isDark ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => !isDark && toggleTheme()}>🌙 Dark</button>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Currency</label>
            <select className="form-select" value={currency} onChange={(e) => changeCurrency(e.target.value)}>
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Change Password</h5>
        <form>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" placeholder="Enter current password" />
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" placeholder="Enter new password" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-control" placeholder="Confirm new password" />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3">Update Password</button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="card p-4" style={{ borderColor: 'var(--ww-danger)' }}>
        <h5 className="mb-2" style={{ color: 'var(--ww-danger)' }}>Danger Zone</h5>
        <p className="text-muted mb-3">Once you delete your account, there is no going back.</p>
        <button className="btn btn-outline-danger">Delete Account</button>
      </div>
    </div>
  );
}
