import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Landing.css';

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`landing ${isDark ? 'landing--dark' : 'landing--light'}`}>
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav__brand">
          <span className="landing-nav__logo">💸</span>
          <span className="landing-nav__name">WealthWhiz</span>
        </div>
        <div className="landing-nav__links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login" className="btn btn-outline-light btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
          <button className="landing-nav__theme-btn" onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero__content">
          <span className="landing-hero__badge">🎓 Built for Students</span>
          <h1 className="landing-hero__title">
            Take Control of Your <span className="text-gradient">Finances</span>
          </h1>
          <p className="landing-hero__desc">
            Track expenses, manage budgets, split group costs, and gain actionable insights — all in one beautiful platform designed for student life.
          </p>
          <div className="landing-hero__actions">
            <Link to="/register" className="btn btn-primary btn-lg">Start Free →</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">Sign In</Link>
          </div>
          <div className="landing-hero__stats">
            <div className="landing-stat"><span className="landing-stat__num">10K+</span><span className="landing-stat__label">Students</span></div>
            <div className="landing-stat"><span className="landing-stat__num">50K+</span><span className="landing-stat__label">Expenses Tracked</span></div>
            <div className="landing-stat"><span className="landing-stat__num">₹2Cr+</span><span className="landing-stat__label">Money Managed</span></div>
          </div>
        </div>
        <div className="landing-hero__visual">
          <div className="landing-mockup">
            <div className="landing-mockup__card landing-mockup__card--1">
              <span>💰</span><div><strong>₹12,500</strong><small>Balance</small></div>
            </div>
            <div className="landing-mockup__card landing-mockup__card--2">
              <span>📊</span><div><strong>-8%</strong><small>vs last month</small></div>
            </div>
            <div className="landing-mockup__card landing-mockup__card--3">
              <span>🎯</span><div><strong>65%</strong><small>Laptop Goal</small></div>
            </div>
            <div className="landing-mockup__card landing-mockup__card--4">
              <span>👥</span><div><strong>₹600</strong><small>Aarav owes you</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <h2 className="landing-section-title">Everything You Need</h2>
        <p className="landing-section-desc">Powerful features designed specifically for student finances</p>
        <div className="landing-features__grid">
          {[
            { icon: '💰', title: 'Expense Tracking', desc: 'Log every rupee you spend. Categorize, filter, and export with ease.' },
            { icon: '🎯', title: 'Smart Budgets', desc: 'Set per-category limits and get alerts before you overspend.' },
            { icon: '👥', title: 'Group Expenses', desc: 'Split rent, groceries, and bills with roommates effortlessly.' },
            { icon: '📈', title: 'Visual Analytics', desc: 'Interactive charts to understand your spending patterns.' },
            { icon: '🏦', title: 'Savings Goals', desc: 'Set targets for that laptop, trip, or emergency fund.' },
            { icon: '🔒', title: 'Bank-Grade Security', desc: 'Encrypted data, secure auth, and DPDP Act compliant.' },
          ].map((f, i) => (
            <div key={i} className="feature-card animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="feature-card__icon">{f.icon}</span>
              <h5 className="feature-card__title">{f.title}</h5>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-pricing" id="pricing">
        <h2 className="landing-section-title">Simple Pricing</h2>
        <p className="landing-section-desc">Start free, upgrade when you're ready</p>
        <div className="landing-pricing__grid">
          {[
            { name: 'Free', price: '₹0', period: 'forever', features: ['50 expenses/month', 'Basic analytics', '2 groups', 'Light/Dark theme'], cta: 'Get Started', primary: false },
            { name: 'Pro', price: '₹99', period: '/month', features: ['Unlimited expenses', 'Advanced analytics', 'Unlimited groups', 'CSV export', 'Receipt scanning', '2FA security'], cta: 'Upgrade to Pro', primary: true },
            { name: 'Team', price: '₹499', period: '/month', features: ['Everything in Pro', 'Admin dashboard', 'Team management', 'Audit logs', 'Priority support'], cta: 'Contact Us', primary: false },
          ].map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.primary ? 'pricing-card--primary' : ''}`}>
              {plan.primary && <span className="pricing-card__badge">Popular</span>}
              <h4 className="pricing-card__name">{plan.name}</h4>
              <div className="pricing-card__price">{plan.price}<small>{plan.period}</small></div>
              <ul className="pricing-card__features">
                {plan.features.map((f, j) => <li key={j}>✓ {f}</li>)}
              </ul>
              <Link to="/register" className={`btn w-100 ${plan.primary ? 'btn-primary' : 'btn-outline-primary'}`}>{plan.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__brand">
          <span>💸</span> WealthWhiz
        </div>
        <p>© 2026 WealthWhiz. Crafted for students, by students.</p>
      </footer>
    </div>
  );
}
