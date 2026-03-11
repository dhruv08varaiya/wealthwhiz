import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CURRENCIES } from '../utils/constants';
import { formatCurrency as fmtCurrency } from '../utils/formatters';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('ww_currency') || 'INR';
  });
  const [rates, setRates] = useState({ INR: 1 }); // base: INR
  const [ratesLoading, setRatesLoading] = useState(false);

  // Fetch live rates from Frankfurter API (free, no API key)
  const fetchRates = useCallback(async () => {
    try {
      setRatesLoading(true);
      const res = await fetch('https://api.frankfurter.app/latest?from=INR');
      if (res.ok) {
        const data = await res.json();
        setRates({ INR: 1, ...data.rates });
      }
    } catch {
      // Silently fall back to static rates if offline
    } finally {
      setRatesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('ww_currency', code);
  };

  const format = (amountInINR) => {
    const rate = rates[currency] ?? 1;
    const converted = amountInINR * rate;
    return fmtCurrency(converted, currency);
  };

  const currencyInfo = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <CurrencyContext.Provider value={{ currency, currencyInfo, changeCurrency, format, rates, ratesLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be inside CurrencyProvider');
  return ctx;
}
