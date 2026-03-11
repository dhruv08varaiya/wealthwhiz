import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { fetchDashboard } from '../../services/api';
import { CATEGORIES } from '../../utils/constants';
import { getGreeting } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, Legend, Filler
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

export default function Dashboard() {
  const { user } = useAuth();
  const { format } = useCurrency();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard().then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const summaryCards = [
    { label: 'Total Income', value: data.totalIncome, icon: '💰', color: '#2D6A4F', change: '+12%' },
    { label: 'Total Expenses', value: data.totalExpenses, icon: '💸', color: '#E76F51', change: '-8%' },
    { label: 'Balance', value: data.balance, icon: '🏦', color: '#4CC9F0', change: '+₹3,500' },
    { label: 'Savings', value: data.savings, icon: '🎯', color: '#F4A261', change: '+5%' },
  ];

  const trendData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Income',
        data: [20000, 22000, 25000, 23000, 28000, 28000],
        borderColor: '#2D6A4F',
        backgroundColor: 'rgba(45,106,79,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Expenses',
        data: [14000, 16500, 21000, 15000, 18500, 15500],
        borderColor: '#E76F51',
        backgroundColor: 'rgba(231,111,81,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 20 } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: (v) => `₹${v / 1000}K` },
      },
      x: { grid: { display: false } },
    },
  };

  const categoryData = {
    labels: ['Food', 'Rent', 'Transport', 'Entertainment', 'Education', 'Shopping'],
    datasets: [{
      data: [3200, 6000, 1800, 1400, 1200, 2000],
      backgroundColor: ['#E76F51', '#2D6A4F', '#4CC9F0', '#F15BB5', '#F4A261', '#9B5DE5'],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } },
    },
  };

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__greeting">{getGreeting()}, {user?.name?.split(' ')[0]} 👋</h2>
          <p className="dashboard__subtitle">Here's your financial overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard__cards">
        {summaryCards.map((card, i) => (
          <div key={i} className="summary-card animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="summary-card__header">
              <span className="summary-card__icon" style={{ background: `${card.color}15` }}>{card.icon}</span>
              <span className="summary-card__change" style={{ color: card.color }}>{card.change}</span>
            </div>
            <div className="summary-card__value">{format(card.value)}</div>
            <div className="summary-card__label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard__charts">
        <div className="chart-card">
          <div className="chart-card__header">
            <h5 className="chart-card__title">📈 Spending Trend</h5>
            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-card__body" style={{ height: 300 }}>
            <Line data={trendData} options={trendOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__header">
            <h5 className="chart-card__title">🍩 Category Breakdown</h5>
            <span className="badge bg-primary">This Month</span>
          </div>
          <div className="chart-card__body" style={{ height: 300 }}>
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="chart-card">
        <div className="chart-card__header">
          <h5 className="chart-card__title">🕐 Recent Transactions</h5>
          <a href="/app/expenses" className="btn btn-sm btn-outline-primary">View All</a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.recentExpenses.map((exp) => {
                const cat = CATEGORIES.find((c) => c.value === exp.category) || {};
                return (
                  <tr key={exp.id}>
                    <td>
                      <span className="d-flex align-items-center gap-2">
                        <span style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: `${cat.color}15`, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem'
                        }}>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </td>
                    <td>{exp.description}</td>
                    <td style={{ color: 'var(--ww-text-muted)' }}>{exp.date}</td>
                    <td className="text-end fw-semibold" style={{ color: 'var(--ww-danger)' }}>
                      -{format(exp.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
