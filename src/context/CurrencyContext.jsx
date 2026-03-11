import { createContext, useContext, useState } from 'react';
import { CURRENCIES } from '../utils/constants';
import { formatCurrency as fmtCurrency } from '../utils/formatters';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('ww_currency') || 'INR';
  });

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('ww_currency', code);
  };

  const format = (amount) => fmtCurrency(amount, currency);

  const currencyInfo = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <CurrencyContext.Provider value={{ currency, currencyInfo, changeCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be inside CurrencyProvider');
  return ctx;
}
