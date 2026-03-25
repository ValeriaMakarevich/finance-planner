const INCOME_KEY = "budget-planner-income-transactions";
const EXPENSE_KEY = "budget-planner-expense-transactions";
const BUDGET_KEY = "budget-planner-budgets";



export function getTotalIncome() {
  try {
    const json = localStorage.getItem(INCOME_KEY);
    if (!json) return 0;
    const arr = JSON.parse(json);
    return arr.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  } catch (err) {
    console.warn("Failed to parse income", err);
    return 0;
  }
}

export function getTotalExpenses() {
  try {
    const json = localStorage.getItem(EXPENSE_KEY);
    if (!json) return 0;
    const arr = JSON.parse(json);
    return arr.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  } catch (err) {
    console.warn("Failed to parse expenses", err);
    return 0;
  }
}

export function getTotalBudgetLimit() {
  try {
    const json = localStorage.getItem(BUDGET_KEY);
    if (!json) return 0;
    const arr = JSON.parse(json);
    return arr.reduce((sum, item) => sum + Number(item.limit || 0), 0);
  } catch (err) {
    console.warn("Failed to parse budgets", err);
    return 0;
  }
}


export function getExpenseAmountByCategory(category) {
  try {
    const json = localStorage.getItem(EXPENSE_KEY);
    if (!json) return 0;

    const expenses = JSON.parse(json);

    return expenses
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  } catch (err) {
    console.warn("Ошибка при подсчёте расходов по категории:", err);
    return 0;
  }
}

export function getExpensesByCategory() {
  try {
    const json = localStorage.getItem(EXPENSE_KEY);
    if (!json) return {};

    const expenses = JSON.parse(json);
    const grouped = {};

    expenses.forEach((item) => {
      const category = item.category || "Other";
      grouped[category] = (grouped[category] || 0) + Number(item.amount || 0);
    });

    return grouped;
  } catch (err) {
    console.warn("Ошибка в getExpensesByCategory:", err);
    return {};
  }
}

export function getAllExpenses() {
  try {
    const json = localStorage.getItem(EXPENSE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.warn("Ошибка при загрузке всех расходов:", err);
    return [];
  }
}


export function getTotalSpent() {
  return getTotalExpenses();
}

export function notifyBudgetChanged() {
  document.dispatchEvent(new Event("budget-updated"));
}
