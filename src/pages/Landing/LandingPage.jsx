import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Landing.css';

export default function LandingPage() {
  const features = [
    { title: 'Smart Budget Planner', desc: 'Set monthly limits per category. Get real-time warnings before you blow your budget.', size: 'standard' },
    { title: 'Bill Splitter', desc: 'Split rent, groceries, or outings with roommates. Settle debts in one tap.', size: 'standard' },
    { title: 'Savings Goals', desc: "Set a target for your laptop, trip, or emergency fund — and watch it grow.", size: 'standard' },
    { title: 'Spending Analytics', desc: 'Visual charts that reveal where every rupee goes each week and month.', size: 'standard' },
    { title: 'AI Finance Coach', desc: 'Personalized daily nudges and tips based on your actual spending patterns.', size: 'standard' },
    { title: 'UPI Sync', desc: 'Auto-import transactions from any UPI app. Zero manual entry required.', size: 'standard' },
  ];

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

      // Curriculum progress tracking
      const curriculum = document.querySelector('.n-curriculum');
      if (curriculum) {
        const rect = curriculum.getBoundingClientRect();
        const winHeight = window.innerHeight;
        // Calculate progress based on how much of the curriculum has passed the viewport middle
        const start = rect.top - winHeight / 2;
        const total = rect.height;
        let progress = (Math.abs(start) / total) * 100;
        
        if (rect.top > winHeight / 2) progress = 0;
        if (rect.bottom < winHeight / 2) progress = 100;
        
        curriculum.style.setProperty('--curriculum-progress', `${progress}%`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ----- Bento Grid Mouse Glow -----
  useEffect(() => {
    const cards = document.querySelectorAll('.n-feat-card');
    const onMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', onMouseMove);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMouseMove);
      });
    };
  }, []);

  // ----- Vertical Curriculum Reveal -----
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('n-feat-row--visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('.n-feat-row').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [features]);

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
        <div className="n-curriculum">
          <div className="n-curriculum__line">
            <div className="n-curriculum__progress" />
          </div>
          
          {features.map((f, i) => (
            <div key={i} className="n-feat-row">
              <div className="n-feat-node" />
              <div className="n-feat-content">
                <h3 className="n-feat-content__title">{f.title}</h3>
                <p className="n-feat-content__desc">{f.desc}</p>
              </div>
            </div>
          ))}
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
        </div>
      </footer>
    </div>
  );
}
