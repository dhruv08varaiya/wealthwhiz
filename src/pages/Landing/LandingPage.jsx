import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Landing.css';

export default function LandingPage() {
  const navRef = useRef(null);
  const mockupRef = useRef(null);
  const wordRefs = useRef([]);

  // ----- Navbar scroll class -----
  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('n-nav--scrolled', window.scrollY > 50);
      }
      // Parallax: push custom property down the tree
      const y = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${y}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ----- Word-reveal IntersectionObserver -----
  useEffect(() => {
    if (!wordRefs.current.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('word--visible');
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -60px 0px' }
    );
    wordRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const testimonialText =
    'WealthWhiz changed how I handle money as a student. I stopped overspending on food in the first month — saved ₹3,200 without even trying hard.';

  const testimonialWords = testimonialText.split(' ');

  const features = [
    { icon: '📊', title: 'Smart Budget Planner', desc: 'Set monthly limits per category. Get real-time warnings before you blow your budget.' },
    { icon: '🤝', title: 'Bill Splitter', desc: 'Split rent, groceries, or outings with roommates. Settle debts in one tap.' },
    { icon: '🎯', title: 'Savings Goals', desc: "Set a target for your laptop, trip, or emergency fund — and watch it grow." },
    { icon: '📈', title: 'Spending Analytics', desc: 'Visual charts that reveal where every rupee goes each week and month.' },
    { icon: '🤖', title: 'AI Finance Coach', desc: 'Personalized daily nudges and tips based on your actual spending patterns.' },
    { icon: '💳', title: 'UPI Sync', desc: 'Auto-import transactions from any UPI app. Zero manual entry required.' },
  ];

  const stats = [
    { value: '12K+', label: 'Students' },
    { value: '₹2Cr+', label: 'Tracked' },
    { value: '98%', label: 'Satisfaction' },
    { value: '4.9★', label: 'Rating' },
  ];

  return (
    <div className="n-landing">
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="n-nav" ref={navRef}>
        <div className="n-nav__brand">
          <span className="n-nav__logo-icon">💸</span>
          <span className="n-nav__logo-text">WealthWhiz</span>
        </div>
        <div className="n-nav__links">
          <a href="#features" className="n-nav__link">Features</a>
          <a href="#testimonial" className="n-nav__link">Testimonial</a>
        </div>
        <div className="n-nav__actions">
          <Link to="/login" className="n-btn n-btn--outline">Sign In</Link>
          <Link to="/register" className="n-btn n-btn--filled">Get Started</Link>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="n-hero">
        {/* Glow blobs */}
        <div className="n-hero__blob n-hero__blob--1" />
        <div className="n-hero__blob n-hero__blob--2" />

        <div className="n-hero__inner">
          {/* Pill badge */}
          <div className="n-hero__pill n-stagger-1">
            <span className="n-hero__pill-dot" />
            ✦ Built for Student Life
          </div>

          {/* Title */}
          <h1 className="n-hero__title n-stagger-2">
            Take Control of Your<br />
            <em className="n-hero__serif">Student Life.</em>
          </h1>

          {/* Subtitle */}
          <p className="n-hero__sub n-stagger-3">
            Track expenses, split bills, hit savings goals, and get AI-powered
            nudges — all in one beautiful platform designed around how students actually spend.
          </p>

          {/* CTA */}
          <div className="n-hero__cta n-stagger-4">
            <Link to="/register" className="n-btn n-btn--filled n-btn--lg">
              Start Free — No Card Needed →
            </Link>
            <Link to="/login" className="n-btn n-btn--ghost n-btn--lg">
              Sign In
            </Link>
          </div>

          {/* Trust row */}
          <div className="n-hero__trust n-stagger-5">
            <div className="n-avatars">
              {['AK', 'PR', 'SM', 'VR', 'TN'].map((initials, i) => (
                <div key={i} className="n-avatar" style={{ zIndex: 5 - i }}>
                  {initials}
                </div>
              ))}
            </div>
            <div className="n-hero__trust-text">
              <span className="n-stars">★★★★★</span>
              <span>Loved by <strong>12,000+</strong> students across India</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DASHBOARD MOCKUP ═══════════════ */}
      <section className="n-mockup-section">
        <div className="n-mockup-label">Live Dashboard Preview</div>
        <div className="n-browser" ref={mockupRef}>
          {/* Browser chrome */}
          <div className="n-browser__bar">
            <div className="n-browser__dots">
              <span className="n-dot n-dot--red" />
              <span className="n-dot n-dot--yellow" />
              <span className="n-dot n-dot--green" />
            </div>
            <div className="n-browser__url">app.wealthwhiz.in/dashboard</div>
          </div>

          {/* App UI inside browser */}
          <div className="n-browser__body">
            {/* Sidebar */}
            <aside className="n-sidebar">
              <div className="n-sidebar__logo">💸 WW</div>
              {['Dashboard', 'Expenses', 'Budget', 'Groups', 'Analytics'].map((item, i) => (
                <div key={i} className={`n-sidebar__item ${i === 0 ? 'n-sidebar__item--active' : ''}`}>
                  <span>{['🏠', '💰', '🎯', '👥', '📈'][i]}</span>
                  {item}
                </div>
              ))}
            </aside>

            {/* Main content */}
            <main className="n-dash-main">
              {/* Metric cards */}
              <div className="n-metrics">
                {[
                  { label: 'Monthly Budget', value: '₹8,000', delta: '', color: '#4ADE80' },
                  { label: 'Spent So Far', value: '₹4,320', delta: '↑ 12%', color: '#F87171' },
                  { label: 'Savings', value: '₹2,140', delta: '↑ 8%', color: '#60A5FA' },
                  { label: 'Group Splits', value: '₹600', delta: 'owed to you', color: '#FBBF24' },
                ].map((m, i) => (
                  <div key={i} className="n-metric">
                    <span className="n-metric__label">{m.label}</span>
                    <span className="n-metric__value" style={{ color: m.color }}>{m.value}</span>
                    {m.delta && <span className="n-metric__delta">{m.delta}</span>}
                  </div>
                ))}
              </div>

              {/* SVG Line chart */}
              <div className="n-chart">
                <div className="n-chart__label">Spending — Last 7 Days</div>
                <svg viewBox="0 0 560 120" preserveAspectRatio="none" className="n-chart__svg">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M0,90 L80,70 L160,85 L240,40 L320,60 L400,20 L480,50 L560,30 L560,120 L0,120 Z"
                    fill="url(#chartGrad)"
                  />
                  {/* Line */}
                  <path
                    d="M0,90 L80,70 L160,85 L240,40 L320,60 L400,20 L480,50 L560,30"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Day labels */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                    <text key={i} x={i * 80 + 8} y="118" fontSize="9" fill="rgba(255,255,255,0.35)">{d}</text>
                  ))}
                </svg>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ROW ═══════════════ */}
      <section className="n-stats">
        {stats.map((s, i) => (
          <div key={i} className="n-stat">
            <span className="n-stat__value">{s.value}</span>
            <span className="n-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="n-features" id="features">
        <div className="n-section-tag">Features</div>
        <h2 className="n-section-title">
          Every tool a student <br />
          <em className="n-accent-serif">actually needs.</em>
        </h2>
        <p className="n-section-sub">
          Built around the real pain-points: shared rent, food runs, exam splurges, and saving for something bigger.
        </p>
        <div className="n-features__grid">
          {features.map((f, i) => (
            <div key={i} className="n-feat-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="n-feat-card__icon">{f.icon}</span>
              <h3 className="n-feat-card__title">{f.title}</h3>
              <p className="n-feat-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ TESTIMONIAL ═══════════════ */}
      <section className="n-testimonial" id="testimonial">
        <div className="n-section-tag">Testimonial</div>
        <blockquote className="n-quote">
          {testimonialWords.map((word, i) => (
            <span
              key={i}
              className="n-word"
              ref={(el) => (wordRefs.current[i] = el)}
            >
              {word}{' '}
            </span>
          ))}
        </blockquote>
        <div className="n-testimonial__author">
          <div className="n-testimonial__avatar">PA</div>
          <div>
            <strong>Priya Agarwal</strong>
            <span>B.Tech CSE, Year 2 · BITS Pilani</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="n-cta">
        <div className="n-cta__blob" />
        <div className="n-section-tag">Get Started</div>
        <h2 className="n-cta__title">
          Your finances, finally <br />
          <em className="n-accent-serif">under control.</em>
        </h2>
        <p className="n-cta__sub">Join 12,000+ students who manage their money smarter with WealthWhiz.</p>
        <div className="n-cta__actions">
          <Link to="/register" className="n-btn n-btn--filled n-btn--lg">
            Create Free Account →
          </Link>
          <Link to="/login" className="n-btn n-btn--ghost n-btn--lg">
            Sign In
          </Link>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="n-footer">
        <div className="n-footer__brand">
          <span>💸</span> WealthWhiz
        </div>
        <p>© 2026 WealthWhiz. Crafted for students, by students.</p>
        <div className="n-footer__links">
          <a href="#features">Features</a>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
      </footer>
    </div>
  );
}
