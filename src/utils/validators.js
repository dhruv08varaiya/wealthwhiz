// WealthWhiz — Validators
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  amount: (value) => {
    if (!value) return 'Amount is required';
    const num = parseFloat(value);
    if (isNaN(num)) return 'Amount must be a number';
    if (num <= 0) return 'Amount must be positive';
    if (num > 9999999) return 'Amount cannot exceed 7 digits';
    return null;
  },

  email: (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email address';
    return null;
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Must contain a lowercase letter';
    if (!/[0-9]/.test(value)) return 'Must contain a number';
    return null;
  },

  confirmPassword: (value, password) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return null;
  },

  date: (value) => {
    if (!value) return 'Date is required';
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid date';
    if (date > new Date()) return 'Date cannot be in the future';
    return null;
  },

  description: (value) => {
    if (value && value.length > 200) return 'Description cannot exceed 200 characters';
    return null;
  },

  fileSize: (file, maxMB = 5) => {
    if (!file) return null;
    if (file.size > maxMB * 1024 * 1024) return `File size cannot exceed ${maxMB}MB`;
    return null;
  },

  fileType: (file, allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']) => {
    if (!file) return null;
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, and PDF files are allowed';
    }
    return null;
  },
};

export function validateForm(values, rules) {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    const error = rules[field](values[field], values);
    if (error) errors[field] = error;
  });
  return errors;
}
