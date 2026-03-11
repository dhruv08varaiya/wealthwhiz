import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { validators } from '../../utils/validators';
import './Auth.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    {
      name: validators.required,
      email: validators.email,
      password: validators.password,
      confirmPassword: (val, vals) => validators.confirmPassword(val, vals.password),
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await register(values.name, values.email, values.password);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-scale-in">
        <div className="auth-card__header">
          <span className="auth-card__logo">💸</span>
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">Start managing your finances with WealthWhiz</p>
        </div>

        {error && <div className="alert alert-danger py-2 px-3 rounded-3">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="reg-name" className="form-label">Full Name</label>
            <input
              type="text"
              id="reg-name"
              name="name"
              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Dhruv Varaiya"
            />
            {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="reg-email" className="form-label">Email</label>
            <input
              type="email"
              id="reg-email"
              name="email"
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@university.edu"
            />
            {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="reg-password" className="form-label">Password</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Min 8 chars, uppercase, lowercase, number"
            />
            {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="reg-confirm" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="reg-confirm"
              name="confirmPassword"
              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Re-enter your password"
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="btn btn-outline-secondary w-100 auth-google-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Sign up with Google
        </button>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
