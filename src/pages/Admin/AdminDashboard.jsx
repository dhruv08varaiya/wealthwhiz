import { useState } from 'react';
import './Admin.css';

const mockUsers = [
  { id: 'u1', name: 'Dhruv Varaiya', email: 'dhruv.varaiya@gmail.com', role: 'platform_admin', status: 'active', joined: '2026-01-15' },
  { id: 'u2', name: 'Aarav Patel', email: 'aarav@university.edu', role: 'student', status: 'active', joined: '2026-02-01' },
  { id: 'u3', name: 'Priya Shah', email: 'priya@university.edu', role: 'student', status: 'active', joined: '2026-02-10' },
  { id: 'u4', name: 'Neha Mehta', email: 'neha@university.edu', role: 'group_admin', status: 'active', joined: '2026-02-15' },
  { id: 'u5', name: 'Rohan Kumar', email: 'rohan@university.edu', role: 'student', status: 'suspended', joined: '2026-03-01' },
];

const mockLogs = [
  { id: 1, action: 'User Login', user: 'Dhruv Varaiya', time: '2026-03-11 18:30', ip: '192.168.1.1' },
  { id: 2, action: 'Expense Added', user: 'Aarav Patel', time: '2026-03-11 17:45', ip: '192.168.1.2' },
  { id: 3, action: 'Group Created', user: 'Priya Shah', time: '2026-03-11 16:20', ip: '192.168.1.3' },
  { id: 4, action: 'Password Changed', user: 'Neha Mehta', time: '2026-03-11 15:10', ip: '192.168.1.4' },
  { id: 5, action: 'Budget Updated', user: 'Dhruv Varaiya', time: '2026-03-11 14:00', ip: '192.168.1.1' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '1,248', icon: '👥', change: '+12 this week' },
    { label: 'Active Today', value: '342', icon: '🟢', change: '27% of total' },
    { label: 'Expenses Logged', value: '8,456', icon: '💰', change: '+580 this week' },
    { label: 'System Health', value: '99.9%', icon: '💚', change: 'All services up' },
  ];

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page__header">
        <h2 className="admin-page__title">🛡️ Admin Panel</h2>
        <p className="admin-page__subtitle">Platform management & monitoring</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {['overview', 'users', 'logs'].map((t) => (
          <button key={t} className={`admin-tab ${tab === t ? 'admin-tab--active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' && '📊 Overview'}
            {t === 'users' && '👥 Users'}
            {t === 'logs' && '📋 Audit Logs'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div>
          <div className="admin-stats">
            {stats.map((s, i) => (
              <div key={i} className="admin-stat-card">
                <span className="admin-stat-card__icon">{s.icon}</span>
                <div>
                  <div className="admin-stat-card__value">{s.value}</div>
                  <div className="admin-stat-card__label">{s.label}</div>
                  <div className="admin-stat-card__change">{s.change}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-4 mt-4">
            <h5 className="mb-3">System Status</h5>
            <div className="d-flex flex-column gap-3">
              {[
                { name: 'API Server', status: 'Operational', color: '#74C69D' },
                { name: 'Database (PostgreSQL)', status: 'Operational', color: '#74C69D' },
                { name: 'Cache (Redis)', status: 'Operational', color: '#74C69D' },
                { name: 'File Storage (S3)', status: 'Operational', color: '#74C69D' },
                { name: 'Email Service', status: 'Degraded', color: '#F4A261' },
              ].map((s, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span className="fw-medium">{s.name}</span>
                  <span className="badge" style={{ background: s.color, color: '#fff' }}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-medium">{u.name}</td>
                    <td style={{ color: 'var(--ww-text-muted)' }}>{u.email}</td>
                    <td><span className="badge bg-primary">{u.role}</span></td>
                    <td>
                      <span className="badge" style={{
                        background: u.status === 'active' ? 'var(--ww-success)' : 'var(--ww-danger)',
                        color: '#fff'
                      }}>{u.status}</span>
                    </td>
                    <td style={{ color: 'var(--ww-text-muted)' }}>{u.joined}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-secondary me-1" title="Edit">✏️</button>
                      <button className="btn btn-sm btn-outline-danger" title="Suspend">🚫</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {tab === 'logs' && (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>User</th>
                  <th>Time</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="fw-medium">{log.action}</td>
                    <td>{log.user}</td>
                    <td style={{ color: 'var(--ww-text-muted)' }}>{log.time}</td>
                    <td><code>{log.ip}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
