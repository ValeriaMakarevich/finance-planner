const INCOME_KEY   = "budget-planner-income-transactions";
const EXPENSE_KEY  = "budget-planner-expense-transactions";
const BUDGET_KEY   = "budget-planner-budgets";  

export function getTotalIncome() {
  try {
    const json = localStorage.getItem(INCOME_KEY);
    if (!json) return 0;
    const arr = JSON.parse(json);
    return arr.reduce((sum, item) => sum + Number(item.amount), 0);
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
    return arr.reduce((sum, item) => sum + Number(item.amount), 0);
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
    return arr.reduce((sum, item) => sum + Number(item.limit), 0);
  } catch (err) {
    console.warn("Failed to parse budgets", err);
    return 0;
  }
}

export function getTotalSpent() {
  try {
    const json = localStorage.getItem("budget-planner-expense-transactions");
    if (!json) return 0;
    const expenses = JSON.parse(json);
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  } catch (err) {
    console.warn("Ошибка при подсчёте расходов:", err);
    return 0;
  }
}

export function notifyBudgetChanged() {
  document.dispatchEvent(new Event("budget-updated"));
}

export function getExpensesByCategory(category) {
  try {
    const json = localStorage.getItem(EXPENSE_KEY);
    if (!json) return 0;
    const expenses = JSON.parse(json);
    
  
    return expenses
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + Number(item.amount), 0);
  } catch (err) {
    console.warn("Ошибка при подсчёте расходов по категории:", err);
    return 0;
  }
}