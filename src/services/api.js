// WealthWhiz — API Service (uses mock data for now)
import * as mock from './mockData';
import { generateId } from '../utils/helpers';

// Simulate network delay
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function fetchDashboard() {
  await delay();
  return { ...mock.mockDashboard };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Expenses
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let expenses = [...mock.mockExpenses];

export async function fetchExpenses(filters = {}) {
  await delay();
  let result = [...expenses];
  if (filters.category) result = result.filter((e) => e.category === filters.category);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((e) => e.description.toLowerCase().includes(q));
  }
  if (filters.startDate) result = result.filter((e) => e.date >= filters.startDate);
  if (filters.endDate) result = result.filter((e) => e.date <= filters.endDate);
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  return result;
}

export async function addExpense(expense) {
  await delay();
  const newExpense = { ...expense, id: generateId() };
  expenses.unshift(newExpense);
  return newExpense;
}

export async function updateExpense(id, data) {
  await delay();
  const idx = expenses.findIndex((e) => e.id === id);
  if (idx === -1) throw new Error('Expense not found');
  expenses[idx] = { ...expenses[idx], ...data };
  return expenses[idx];
}

export async function deleteExpense(id) {
  await delay();
  expenses = expenses.filter((e) => e.id !== id);
  return { success: true };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Budgets
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let budgets = [...mock.mockBudgets];

export async function fetchBudgets() {
  await delay();
  return [...budgets];
}

export async function addBudget(budget) {
  await delay();
  const newBudget = { ...budget, id: generateId(), spent: 0 };
  budgets.push(newBudget);
  return newBudget;
}

export async function updateBudget(id, data) {
  await delay();
  const idx = budgets.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error('Budget not found');
  budgets[idx] = { ...budgets[idx], ...data };
  return budgets[idx];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Goals
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let goals = [...mock.mockGoals];

export async function fetchGoals() {
  await delay();
  return [...goals];
}

export async function addGoal(goal) {
  await delay();
  const newGoal = { ...goal, id: generateId(), savedAmount: 0 };
  goals.push(newGoal);
  return newGoal;
}

export async function updateGoal(id, data) {
  await delay();
  const idx = goals.findIndex((g) => g.id === id);
  if (idx === -1) throw new Error('Goal not found');
  goals[idx] = { ...goals[idx], ...data };
  return goals[idx];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Groups
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let groups = [...mock.mockGroups];

export async function fetchGroups() {
  await delay();
  return [...groups];
}

export async function fetchGroupById(id) {
  await delay();
  const group = groups.find((g) => g.id === id);
  if (!group) throw new Error('Group not found');
  return { ...group };
}

export async function addGroupExpense(groupId, expense) {
  await delay();
  const group = groups.find((g) => g.id === groupId);
  if (!group) throw new Error('Group not found');
  group.expenses.push({ ...expense, id: generateId() });
  return group;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Analytics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function fetchAnalytics() {
  await delay();
  return { ...mock.mockAnalytics };
}
