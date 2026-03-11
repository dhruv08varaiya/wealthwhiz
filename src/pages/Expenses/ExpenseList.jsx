import { useState, useEffect, useMemo } from 'react';
import { fetchExpenses, addExpense, deleteExpense } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useForm } from '../../hooks/useForm';
import { validators } from '../../utils/validators';
import { CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { downloadCSV } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import Toast from '../../components/Toast';
import './Expenses.css';

export default function ExpenseList() {
  const { format } = useCurrency();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [toast, setToast] = useState(null);
  const debouncedSearch = useDebounce(search);

  const { values, errors, touched, handleChange, handleBlur, validate, reset } = useForm(
    { amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '', paymentMethod: 'upi' },
    { amount: validators.amount, category: validators.required, date: validators.date, description: validators.description }
  );

  useEffect(() => {
    fetchExpenses().then((d) => { setExpenses(d); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = [...expenses];
    if (filterCat) result = result.filter((e) => e.category === filterCat);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((e) => e.description.toLowerCase().includes(q));
    }
    return result;
  }, [expenses, filterCat, debouncedSearch]);

  const totalFiltered = useMemo(() => filtered.reduce((s, e) => s + e.amount, 0), [filtered]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const newExp = await addExpense({ ...values, amount: parseFloat(values.amount) });
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

  const handleExport = () => {
    const data = filtered.map((e) => ({
      Date: e.date, Category: e.category, Description: e.description,
      Amount: e.amount, 'Payment Method': e.paymentMethod,
    }));
    downloadCSV(data, 'wealthwhiz-expenses.csv');
    setToast({ message: 'CSV exported!', type: 'success' });
  };

  if (loading) return <LoadingSpinner text="Loading expenses..." />;

  return (
    <div className="expenses-page animate-fade-in">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="expenses-page__header">
        <div>
          <h2 className="expenses-page__title">💰 Expenses</h2>
          <p className="expenses-page__subtitle">{filtered.length} transactions · Total: {format(totalFiltered)}</p>
        </div>
        <div className="expenses-page__actions">
          <button className="btn btn-outline-primary btn-sm" onClick={handleExport}>📥 Export CSV</button>
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
                      <td>{exp.description}</td>
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
