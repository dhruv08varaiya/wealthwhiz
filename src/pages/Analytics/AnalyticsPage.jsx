import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler
} from 'chart.js';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function AnalyticsPage() {
  const { format } = useCurrency();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('6months');

  useEffect(() => {
    fetchAnalytics().then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner text="Loading analytics..." />;

  const trendChart = {
    labels: data.monthlyTrend.map((m) => m.month),
    datasets: [
      { label: 'Income', data: data.monthlyTrend.map((m) => m.income), borderColor: '#2D6A4F', backgroundColor: 'rgba(45,106,79,0.1)', fill: true, tension: 0.4 },
      { label: 'Expenses', data: data.monthlyTrend.map((m) => m.expenses), borderColor: '#E76F51', backgroundColor: 'rgba(231,111,81,0.1)', fill: true, tension: 0.4 },
    ],
  };

  const barChart = {
    labels: data.monthlyTrend.map((m) => m.month),
    datasets: [
      { label: 'Income', data: data.monthlyTrend.map((m) => m.income), backgroundColor: '#40916C', borderRadius: 6 },
      { label: 'Expenses', data: data.monthlyTrend.map((m) => m.expenses), backgroundColor: '#E76F51', borderRadius: 6 },
    ],
  };

  const categoryColors = ['#E76F51', '#2D6A4F', '#4CC9F0', '#F15BB5', '#F4A261', '#9B5DE5'];
  const catChart = {
    labels: data.categoryBreakdown.map((c) => c.category.charAt(0).toUpperCase() + c.category.slice(1)),
    datasets: [{ data: data.categoryBreakdown.map((c) => c.amount), backgroundColor: categoryColors, borderWidth: 0, hoverOffset: 8 }],
  };

  const commonOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: (v) => `₹${v / 1000}K` } }, x: { grid: { display: false } } },
  };

  const totalIncome = data.monthlyTrend.reduce((s, m) => s + m.income, 0);
  const totalExpenses = data.monthlyTrend.reduce((s, m) => s + m.expenses, 0);

  return (
    <div className="analytics-page animate-fade-in">
      <div className="analytics-page__header">
        <div>
          <h2 className="analytics-page__title">📈 Analytics</h2>
          <p className="analytics-page__subtitle">Understand your financial patterns</p>
        </div>
        <select className="form-select form-select-sm" style={{ width: 'auto' }} value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">This Year</option>
        </select>
      </div>

      {/* Stats Summary */}
      <div className="analytics-stats">
        <div className="analytics-stat">
          <span className="analytics-stat__label">Total Income</span>
          <span className="analytics-stat__value" style={{ color: 'var(--ww-primary)' }}>{format(totalIncome)}</span>
        </div>
        <div className="analytics-stat">
          <span className="analytics-stat__label">Total Expenses</span>
          <span className="analytics-stat__value" style={{ color: 'var(--ww-danger)' }}>{format(totalExpenses)}</span>
        </div>
        <div className="analytics-stat">
          <span className="analytics-stat__label">Net Savings</span>
          <span className="analytics-stat__value" style={{ color: 'var(--ww-info)' }}>{format(totalIncome - totalExpenses)}</span>
        </div>
        <div className="analytics-stat">
          <span className="analytics-stat__label">Avg Monthly Spend</span>
          <span className="analytics-stat__value">{format(Math.round(totalExpenses / data.monthlyTrend.length))}</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="analytics-charts">
        <div className="chart-card">
          <h5 className="chart-card__title">📉 Monthly Trend</h5>
          <div style={{ height: 300 }}><Line data={trendChart} options={commonOptions} /></div>
        </div>
        <div className="chart-card">
          <h5 className="chart-card__title">📊 Income vs Expenses</h5>
          <div style={{ height: 300 }}><Bar data={barChart} options={commonOptions} /></div>
        </div>
        <div className="chart-card">
          <h5 className="chart-card__title">🍩 Spending by Category</h5>
          <div style={{ height: 300 }}>
            <Doughnut data={catChart} options={{ responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12 } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}
