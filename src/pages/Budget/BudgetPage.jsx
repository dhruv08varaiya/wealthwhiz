import { useState, useEffect, useMemo } from 'react';
import { fetchBudgets, fetchGoals } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { CATEGORIES } from '../../utils/constants';
import { formatPercentage } from '../../utils/formatters';
import { SkeletonCard } from '../../components/SkeletonLoader/SkeletonLoader';
import Toast from '../../components/Toast';
import './Budget.css';

export default function BudgetPage() {
  const { format } = useCurrency();
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    Promise.all([fetchBudgets(), fetchGoals()]).then(([b, g]) => {
      setBudgets(b); setGoals(g); setLoading(false);
    });
  }, []);

  const alerts = useMemo(() => {
    return budgets
      .map((b) => {
        const pct = Math.round((b.spent / b.allocated) * 100);
        const cat = CATEGORIES.find((c) => c.value === b.category) || {};
        return { ...b, pct, cat };
      })
      .filter((b) => b.pct >= 80)
      .sort((a, b) => b.pct - a.pct);
  }, [budgets]);

  if (loading) return (
    <div className="budget-page animate-fade-in">
      <div className="budget-page__header">
        <div>
          <h2 className="budget-page__title">🎯 Budget & Goals</h2>
          <p className="budget-page__subtitle">Loading budgets...</p>
        </div>
      </div>
      <SkeletonCard count={4} />
    </div>
  );

  const getProgressColor = (pct) => {
    if (pct >= 100) return 'var(--ww-danger)';
    if (pct >= 80) return 'var(--ww-warning)';
    return 'var(--ww-success)';
  };

  return (
    <div className="budget-page animate-fade-in">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="budget-page__header">
        <div>
          <h2 className="budget-page__title">🎯 Budget & Goals</h2>
          <p className="budget-page__subtitle">Track your spending limits and savings targets</p>
        </div>
      </div>

      {/* Budget Alerts */}
      {alerts.length > 0 && (
        <div className="budget-alerts">
          <div className="budget-alert-header">
            <span>⚠️</span>
            <strong>Budget Alerts</strong>
          </div>
          <div className="budget-alert-list">
            {alerts.map((a) => (
              <div key={a.id} className={`budget-alert-item ${a.pct >= 100 ? 'budget-alert-item--danger' : 'budget-alert-item--warning'}`}>
                <span>{a.cat.icon} {a.cat.label}</span>
                <span className="budget-alert-pct">{a.pct}% used</span>
                <span className="budget-alert-badge">{a.pct >= 100 ? '🔴 Over Budget!' : '🟡 Near Limit'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget Cards */}
      <h5 className="section-title">Monthly Budgets</h5>
      <div className="budget-grid">
        {budgets.map((b) => {
          const cat = CATEGORIES.find((c) => c.value === b.category) || {};
          const pct = Math.round((b.spent / b.allocated) * 100);
          return (
            <div key={b.id} className="budget-card">
              <div className="budget-card__header">
                <span className="budget-card__icon" style={{ background: `${cat.color}15` }}>{cat.icon}</span>
                <span className="budget-card__cat">{cat.label}</span>
                {pct >= 80 && <span className="badge" style={{ background: pct >= 100 ? 'var(--ww-danger)' : 'var(--ww-warning)', color: '#fff' }}>{pct >= 100 ? 'Over!' : 'Warning'}</span>}
              </div>
              <div className="budget-card__amounts">
                <span className="budget-card__spent">{format(b.spent)}</span>
                <span className="budget-card__total">/ {format(b.allocated)}</span>
              </div>
              <div className="progress" style={{ height: 8 }}>
                <div className="progress-bar" style={{ width: `${Math.min(pct, 100)}%`, background: getProgressColor(pct) }} />
              </div>
              <div className="budget-card__pct">{formatPercentage(pct, 0)} used</div>
            </div>
          );
        })}
      </div>

      {/* Goals */}
      <h5 className="section-title" style={{ marginTop: 32 }}>Savings Goals</h5>
      <div className="goals-grid">
        {goals.map((g) => {
          const pct = Math.round((g.savedAmount / g.targetAmount) * 100);
          return (
            <div key={g.id} className="goal-card">
              <div className="goal-card__icon">{g.icon}</div>
              <h6 className="goal-card__name">{g.name}</h6>
              <div className="goal-card__amounts">
                <span className="goal-card__saved">{format(g.savedAmount)}</span>
                <span className="goal-card__target">of {format(g.targetAmount)}</span>
              </div>
              <div className="progress" style={{ height: 8, marginBottom: 8 }}>
                <div className="progress-bar" style={{ width: `${pct}%` }} />
              </div>
              <div className="goal-card__footer">
                <span>{formatPercentage(pct, 0)} saved</span>
                <span className="goal-card__deadline">Due: {g.deadline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

