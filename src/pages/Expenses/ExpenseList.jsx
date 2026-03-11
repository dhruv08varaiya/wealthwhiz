import { useState, useEffect, useMemo } from 'react';
import { fetchExpenses, addExpense, deleteExpense } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useForm } from '../../hooks/useForm';
import { validators } from '../../utils/validators';
import { CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { downloadCSV } from '../../utils/helpers';
import { SkeletonTable } from '../../components/SkeletonLoader/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import Toast from '../../components/Toast';
import ExportModal from '../../components/ExportModal/ExportModal';
import './Expenses.css';


export default function ExpenseList() {
  const { format } = useCurrency();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [toast, setToast] = useState(null);
  const debouncedSearch = useDebounce(search);

  const { values, errors, touched, handleChange, handleBlur, validate, reset } = useForm(
    {
      amount: '', category: '', date: new Date().toISOString().split('T')[0],
      description: '', paymentMethod: 'upi', isRecurring: false, frequency: 'monthly',
    },
    { amount: validators.amount, category: validators.required, date: validators.date, description: validators.description }
  );

  useEffect(() => {
    fetchExpenses().then((d) => { setExpenses(d); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = [...expenses];
    if (filterCat) result = result.filter((e) => e.category === filterCat);
    if (filterFrom) result = result.filter((e) => e.date >= filterFrom);
    if (filterTo) result = result.filter((e) => e.date <= filterTo);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((e) => e.description.toLowerCase().includes(q));
    }
    return result;
  }, [expenses, filterCat, filterFrom, filterTo, debouncedSearch]);

  const totalFiltered = useMemo(() => filtered.reduce((s, e) => s + e.amount, 0), [filtered]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const newExp = await addExpense({
        ...values, amount: parseFloat(values.amount),
        isRecurring: values.isRecurring === true || values.isRecurring === 'true',
      });
      setExpenses((prev) => [newExp, ...prev]);
      setShowModal(false);
      reset();
      setToast({ message: 'Expense added successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setToast({ message: 'Expense deleted', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const exportData = filtered.map((e) => ({
    Date: e.date, Category: e.category, Description: e.description,
    Amount: e.amount, 'Payment Method': e.paymentMethod,
    Recurring: e.isRecurring ? `Yes (${e.frequency})` : 'No',
  }));

  if (loading) return (
    <div className="expenses-page animate-fade-in">
      <div className="expenses-page__header">
        <div>
          <h2 className="expenses-page__title">💰 Expenses</h2>
          <p className="expenses-page__subtitle">Loading transactions...</p>
        </div>
      </div>
      <SkeletonTable rows={6} />
    </div>
  );

  return (
    <div className="expenses-page animate-fade-in">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {showExportModal && (
        <ExportModal
          data={exportData}
          filename="wealthwhiz-expenses"
          onClose={() => setShowExportModal(false)}
          onExported={(type) => setToast({ message: `Exported as ${type.toUpperCase()}!`, type: 'success' })}
        />
      )}

      <div className="expenses-page__header">
        <div>
          <h2 className="expenses-page__title">💰 Expenses</h2>
          <p className="expenses-page__subtitle">{filtered.length} transactions · Total: {format(totalFiltered)}</p>
        </div>
        <div className="expenses-page__actions">
          <button className="btn btn-outline-primary btn-sm" onClick={() => setShowExportModal(true)}>📥 Export</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Expense</button>
        </div>
      </div>

      {/* Filters */}
      <div className="expenses-page__filters">
        <div className="expenses-page__search">
          <span>🔍</span>
          <input type="text" placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-select form-select-sm" style={{ width: 'auto' }} value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
        </select>
        <div className="expenses-page__date-range">
          <input type="date" className="form-control form-control-sm" title="From date" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} />
          <span style={{ color: 'var(--ww-text-muted)', fontSize: '0.8rem' }}>to</span>
          <input type="date" className="form-control form-control-sm" title="To date" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} />
          {(filterFrom || filterTo) && (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setFilterFrom(''); setFilterTo(''); }}>✕</button>
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No expenses found" description="Try adjusting your filters or add a new expense." actionLabel="+ Add Expense" onAction={() => setShowModal(true)} />
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th className="text-end">Amount</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((exp) => {
                  const cat = CATEGORIES.find((c) => c.value === exp.category) || {};
                  return (
                    <tr key={exp.id}>
                      <td>
                        <span className="d-flex align-items-center gap-2">
                          <span className="expense-cat-icon" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </span>
                      </td>
                      <td>
                        <span className="d-flex align-items-center gap-2">
                          {exp.description}
                          {exp.isRecurring && (
                            <span className="badge" style={{ background: 'var(--ww-info)', color: '#fff', fontSize: '0.65rem' }} title={`Recurring: ${exp.frequency}`}>🔁 {exp.frequency}</span>
                          )}
                        </span>
                      </td>
                      <td style={{ color: 'var(--ww-text-muted)' }}>{formatDate(exp.date)}</td>
                      <td><span className="badge bg-light text-dark">{exp.paymentMethod?.toUpperCase()}</span></td>
                      <td className="text-end fw-semibold" style={{ color: 'var(--ww-danger)' }}>-{format(exp.amount)}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(exp.id)} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Expense</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Amount (₹)</label>
                    <input type="number" name="amount" className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`} value={values.amount} onChange={handleChange} onBlur={handleBlur} placeholder="0.00" />
                    {touched.amount && errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select name="category" className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`} value={values.category} onChange={handleChange} onBlur={handleBlur}>
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
                    </select>
                    {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" name="date" className="form-control" value={values.date} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" name="description" className="form-control" value={values.description} onChange={handleChange} placeholder="What was this for?" maxLength={200} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select name="paymentMethod" className="form-select" value={values.paymentMethod} onChange={handleChange}>
                      {PAYMENT_METHODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="isRecurring" id="isRecurring"
                        checked={!!values.isRecurring}
                        onChange={(e) => handleChange({ target: { name: 'isRecurring', value: e.target.checked } })} />
                      <label className="form-check-label" htmlFor="isRecurring">🔁 Mark as recurring expense</label>
                    </div>
                  </div>
                  {values.isRecurring && (
                    <div className="mb-3">
                      <label className="form-label">Frequency</label>
                      <select name="frequency" className="form-select" value={values.frequency} onChange={handleChange}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Expense</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

