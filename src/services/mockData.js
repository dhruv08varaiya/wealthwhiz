// WealthWhiz — Mock Data for Frontend Demo
// Replace with real API calls when backend is ready

export const mockExpenses = [
  { id: 'e1', amount: 250, category: 'food', description: 'Lunch at canteen', date: '2026-03-10', paymentMethod: 'upi', receipt: null },
  { id: 'e2', amount: 150, category: 'transport', description: 'Auto to college', date: '2026-03-10', paymentMethod: 'cash', receipt: null },
  { id: 'e3', amount: 1200, category: 'education', description: 'Programming book', date: '2026-03-09', paymentMethod: 'card', receipt: null },
  { id: 'e4', amount: 500, category: 'entertainment', description: 'Movie night', date: '2026-03-08', paymentMethod: 'upi', receipt: null },
  { id: 'e5', amount: 3500, category: 'groceries', description: 'Weekly groceries', date: '2026-03-07', paymentMethod: 'upi', receipt: null },
  { id: 'e6', amount: 200, category: 'food', description: 'Coffee with friends', date: '2026-03-07', paymentMethod: 'wallet', receipt: null },
  { id: 'e7', amount: 800, category: 'bills', description: 'Phone recharge', date: '2026-03-06', paymentMethod: 'upi', receipt: null },
  { id: 'e8', amount: 450, category: 'health', description: 'Medicines', date: '2026-03-05', paymentMethod: 'cash', receipt: null },
  { id: 'e9', amount: 2000, category: 'shopping', description: 'New headphones', date: '2026-03-04', paymentMethod: 'card', receipt: null },
  { id: 'e10', amount: 100, category: 'transport', description: 'Bus pass', date: '2026-03-03', paymentMethod: 'cash', receipt: null },
  { id: 'e11', amount: 350, category: 'food', description: 'Dinner delivery', date: '2026-03-02', paymentMethod: 'upi', receipt: null },
  { id: 'e12', amount: 6000, category: 'rent', description: 'Hostel mess fee', date: '2026-03-01', paymentMethod: 'netbanking', receipt: null },
];

export const mockIncomes = [
  { id: 'i1', amount: 8000, source: 'Part-time Tutoring', date: '2026-03-01' },
  { id: 'i2', amount: 15000, source: 'Scholarship', date: '2026-03-01' },
  { id: 'i3', amount: 5000, source: 'Freelance Project', date: '2026-02-20' },
];

export const mockBudgets = [
  { id: 'b1', category: 'food', allocated: 5000, spent: 3200, period: 'monthly' },
  { id: 'b2', category: 'transport', allocated: 2000, spent: 1800, period: 'monthly' },
  { id: 'b3', category: 'entertainment', allocated: 1500, spent: 1400, period: 'monthly' },
  { id: 'b4', category: 'shopping', allocated: 3000, spent: 2000, period: 'monthly' },
  { id: 'b5', category: 'education', allocated: 2000, spent: 1200, period: 'monthly' },
  { id: 'b6', category: 'bills', allocated: 1500, spent: 800, period: 'monthly' },
];

export const mockGoals = [
  { id: 'g1', name: 'New Laptop', targetAmount: 60000, savedAmount: 25000, deadline: '2026-08-01', icon: '💻' },
  { id: 'g2', name: 'Goa Trip', targetAmount: 15000, savedAmount: 8000, deadline: '2026-05-15', icon: '🏖️' },
  { id: 'g3', name: 'Emergency Fund', targetAmount: 20000, savedAmount: 12000, deadline: '2026-12-31', icon: '🛡️' },
];

export const mockGroups = [
  {
    id: 'grp1', name: 'Apartment Bills', members: [
      { id: 'u1', name: 'Dhruv', avatar: null },
      { id: 'u2', name: 'Aarav', avatar: null },
      { id: 'u3', name: 'Priya', avatar: null },
      { id: 'u4', name: 'Neha', avatar: null },
    ],
    expenses: [
      { id: 'ge1', description: 'Electricity bill', amount: 2400, paidBy: 'u1', date: '2026-03-05', splitType: 'equal' },
      { id: 'ge2', description: 'WiFi', amount: 1200, paidBy: 'u2', date: '2026-03-01', splitType: 'equal' },
      { id: 'ge3', description: 'Groceries', amount: 3200, paidBy: 'u3', date: '2026-03-08', splitType: 'equal' },
    ],
    balances: { u1: 1400, u2: -100, u3: 600, u4: -1900 },
  },
  {
    id: 'grp2', name: 'Weekend Trip', members: [
      { id: 'u1', name: 'Dhruv', avatar: null },
      { id: 'u5', name: 'Rohan', avatar: null },
      { id: 'u6', name: 'Meera', avatar: null },
    ],
    expenses: [
      { id: 'ge4', description: 'Hotel booking', amount: 6000, paidBy: 'u1', date: '2026-02-28', splitType: 'equal' },
      { id: 'ge5', description: 'Fuel', amount: 1500, paidBy: 'u5', date: '2026-03-01', splitType: 'equal' },
    ],
    balances: { u1: 1500, u5: -500, u6: -1000 },
  },
];

export const mockAnalytics = {
  monthlyTrend: [
    { month: 'Oct', income: 20000, expenses: 14000 },
    { month: 'Nov', income: 22000, expenses: 16500 },
    { month: 'Dec', income: 25000, expenses: 21000 },
    { month: 'Jan', income: 23000, expenses: 15000 },
    { month: 'Feb', income: 28000, expenses: 18500 },
    { month: 'Mar', income: 28000, expenses: 15500 },
  ],
  categoryBreakdown: [
    { category: 'food', amount: 3200, percentage: 20.6 },
    { category: 'rent', amount: 6000, percentage: 38.7 },
    { category: 'transport', amount: 1800, percentage: 11.6 },
    { category: 'entertainment', amount: 1400, percentage: 9.0 },
    { category: 'education', amount: 1200, percentage: 7.7 },
    { category: 'shopping', amount: 2000, percentage: 12.9 },
  ],
};

export const mockDashboard = {
  totalIncome: 28000,
  totalExpenses: 15500,
  balance: 12500,
  savings: 5000,
  recentExpenses: mockExpenses.slice(0, 5),
};
