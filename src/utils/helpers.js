// WealthWhiz — Helpers
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getCategoryInfo(categoryValue) {
  const { CATEGORIES } = require('./constants');
  return CATEGORIES.find((c) => c.value === categoryValue) || CATEGORIES[CATEGORIES.length - 1];
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function calculateSplitAmounts(total, members, splitType, customValues = {}) {
  if (splitType === 'equal') {
    const perPerson = total / members.length;
    return members.reduce((acc, m) => ({ ...acc, [m.id]: parseFloat(perPerson.toFixed(2)) }), {});
  }
  if (splitType === 'percentage') {
    return members.reduce((acc, m) => {
      const pct = customValues[m.id] || 0;
      return { ...acc, [m.id]: parseFloat(((total * pct) / 100).toFixed(2)) };
    }, {});
  }
  // custom
  return customValues;
}

export function simplifyDebts(balances) {
  const debts = [];
  const debtors = Object.entries(balances)
    .filter(([, v]) => v < 0)
    .sort((a, b) => a[1] - b[1]);
  const creditors = Object.entries(balances)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(-debtors[i][1], creditors[j][1]);
    debts.push({ from: debtors[i][0], to: creditors[j][0], amount: parseFloat(amount.toFixed(2)) });
    debtors[i][1] += amount;
    creditors[j][1] -= amount;
    if (debtors[i][1] === 0) i++;
    if (creditors[j][1] === 0) j++;
  }
  return debts;
}

export function downloadCSV(data, filename = 'export.csv') {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) => headers.map((h) => `"${row[h] || ''}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
