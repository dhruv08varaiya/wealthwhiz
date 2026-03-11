// WealthWhiz — Formatters
export function formatCurrency(amount, currency = 'INR') {
  const options = { style: 'currency', currency, maximumFractionDigits: 0 };
  try {
    return new Intl.NumberFormat('en-IN', options).format(amount);
  } catch {
    return `₹${amount}`;
  }
}

export function formatDate(dateStr, format = 'short') {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  if (format === 'short') {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (format === 'long') {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (format === 'relative') {
    return getRelativeTime(date);
  }
  return date.toLocaleDateString('en-IN');
}

function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) return formatDate(date.toISOString(), 'short');
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function formatNumber(num) {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatPercentage(value, decimals = 1) {
  return `${parseFloat(value).toFixed(decimals)}%`;
}

export function getMonthName(monthIndex) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
}

export function getInputDateFormat(date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}
