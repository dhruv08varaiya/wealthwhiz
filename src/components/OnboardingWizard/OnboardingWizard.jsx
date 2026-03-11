import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { CURRENCIES } from '../../utils/constants';
import './OnboardingWizard.css';

const STEPS = [
  { id: 0, title: 'Welcome to WealthWhiz! 👋', icon: '💸' },
  { id: 1, title: 'Set your currency', icon: '💱' },
  { id: 2, title: 'Set your monthly budget', icon: '🎯' },
];

export default function OnboardingWizard({ onComplete }) {
  const { changeCurrency, currency } = useCurrency();
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const handleSkip = () => {
    localStorage.setItem('ww_onboarding_done', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      // Final step — save everything
      changeCurrency(selectedCurrency);
      if (income) localStorage.setItem('ww_monthly_income', income);
      if (budget) localStorage.setItem('ww_monthly_budget', budget);
      localStorage.setItem('ww_onboarding_done', 'true');
      onComplete();
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-wizard">
        {/* Skip button */}
        <button className="onboarding-skip" onClick={handleSkip}>Skip</button>

        {/* Step indicators */}
        <div className="onboarding-steps">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`onboarding-step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} />
          ))}
        </div>

        {/* Step icon */}
        <div className="onboarding-icon">{STEPS[step].icon}</div>
        <h2 className="onboarding-title">{STEPS[step].title}</h2>

        {/* Step content */}
        <div className="onboarding-body">
          {step === 0 && (
            <p className="onboarding-desc">
              WealthWhiz helps you track expenses, manage budgets, split costs with friends, and stay on top of your finances — all in one place.<br /><br />
              Let's personalize it for you in just 2 quick steps!
            </p>
          )}

          {step === 1 && (
            <div className="onboarding-field">
              <label>Preferred Currency</label>
              <select
                className="form-select"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>
                ))}
              </select>
              <p className="onboarding-hint">Default is Indian Rupee (₹). You can always change this later in Settings.</p>
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-field">
              <label>Monthly Income (optional)</label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="e.g. 15000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <label>Monthly Spending Goal (optional)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 10000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <p className="onboarding-hint">These help WealthWhiz give you better budget insights. You can leave them blank.</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="onboarding-footer">
          {step > 0 && (
            <button className="btn btn-outline-secondary" onClick={handleBack}>← Back</button>
          )}
          <button className="btn btn-primary onboarding-next" onClick={handleNext}>
            {step === STEPS.length - 1 ? '🚀 Get Started' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
