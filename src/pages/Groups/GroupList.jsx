import { useState, useEffect } from 'react';
import { fetchGroups } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import './Groups.css';

export default function GroupList() {
  const { format } = useCurrency();
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchGroups().then((g) => { setGroups(g); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner text="Loading groups..." />;

  const getBalanceColor = (bal) => bal > 0 ? 'var(--ww-success)' : bal < 0 ? 'var(--ww-danger)' : 'var(--ww-text-muted)';
  const getBalanceLabel = (bal) => bal > 0 ? `gets back ${format(bal)}` : bal < 0 ? `owes ${format(Math.abs(bal))}` : 'settled';

  return (
    <div className="groups-page animate-fade-in">
      <div className="groups-page__header">
        <div>
          <h2 className="groups-page__title">👥 Group Expenses</h2>
          <p className="groups-page__subtitle">Split costs with friends and roommates</p>
        </div>
        <button className="btn btn-primary">+ New Group</button>
      </div>

      {groups.length === 0 ? (
        <EmptyState icon="👥" title="No groups yet" description="Create a group to start splitting expenses." actionLabel="Create Group" />
      ) : !selectedGroup ? (
        <div className="groups-grid">
          {groups.map((g) => {
            const totalExpenses = g.expenses.reduce((s, e) => s + e.amount, 0);
            return (
              <div key={g.id} className="group-card" onClick={() => setSelectedGroup(g)}>
                <div className="group-card__header">
                  <h5 className="group-card__name">{g.name}</h5>
                  <span className="badge bg-primary">{g.members.length} members</span>
                </div>
                <div className="group-card__total">Total: {format(totalExpenses)}</div>
                <div className="group-card__members">
                  {g.members.map((m) => (
                    <div key={m.id} className="group-card__member">
                      <div className="group-card__avatar">{m.name.charAt(0)}</div>
                      <span className="group-card__member-name">{m.name}</span>
                      <span className="group-card__balance" style={{ color: getBalanceColor(g.balances[m.id] || 0) }}>
                        {getBalanceLabel(g.balances[m.id] || 0)}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-sm btn-outline-primary w-100 mt-3">View Details →</button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button className="btn btn-sm btn-outline-secondary mb-3" onClick={() => setSelectedGroup(null)}>← Back to Groups</button>
          <div className="card p-4">
            <h4>{selectedGroup.name}</h4>
            <h6 className="mt-3 mb-2">Expenses</h6>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr><th>Description</th><th>Paid By</th><th>Date</th><th className="text-end">Amount</th></tr>
                </thead>
                <tbody>
                  {selectedGroup.expenses.map((e) => {
                    const payer = selectedGroup.members.find((m) => m.id === e.paidBy);
                    return (
                      <tr key={e.id}>
                        <td>{e.description}</td>
                        <td>{payer?.name || 'Unknown'}</td>
                        <td style={{ color: 'var(--ww-text-muted)' }}>{e.date}</td>
                        <td className="text-end fw-semibold">{format(e.amount)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <h6 className="mt-4 mb-2">Balances</h6>
            {selectedGroup.members.map((m) => (
              <div key={m.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="fw-medium">{m.name}</span>
                <span className="fw-semibold" style={{ color: getBalanceColor(selectedGroup.balances[m.id] || 0) }}>
                  {(selectedGroup.balances[m.id] || 0) > 0 ? '+' : ''}{format(selectedGroup.balances[m.id] || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
