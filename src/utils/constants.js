// WealthWhiz — Constants
export const CATEGORIES = [
  { value: 'food', label: 'Food & Dining', icon: '🍔', color: '#E76F51' },
  { value: 'transport', label: 'Transport', icon: '🚌', color: '#4CC9F0' },
  { value: 'education', label: 'Education', icon: '📚', color: '#F4A261' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️', color: '#9B5DE5' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#F15BB5' },
  { value: 'bills', label: 'Bills & Utilities', icon: '💡', color: '#00BBF9' },
  { value: 'health', label: 'Health', icon: '🏥', color: '#74C69D' },
  { value: 'rent', label: 'Rent', icon: '🏠', color: '#2D6A4F' },
  { value: 'groceries', label: 'Groceries', icon: '🛒', color: '#52B788' },
  { value: 'other', label: 'Other', icon: '📌', color: '#8896A6' },
];

export const PAYMENT_METHODS = [
  { value: 'upi', label: 'UPI' },
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Debit/Credit Card' },
  { value: 'netbanking', label: 'Net Banking' },
  { value: 'wallet', label: 'Wallet' },
];

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const SPLIT_TYPES = [
  { value: 'equal', label: 'Split Equally' },
  { value: 'custom', label: 'Custom Amounts' },
  { value: 'percentage', label: 'By Percentage' },
];

export const ROLES = {
  STUDENT: 'student',
  GROUP_ADMIN: 'group_admin',
  PLATFORM_ADMIN: 'platform_admin',
};

export const BUDGET_PERIODS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

export const API_BASE = '/api';
