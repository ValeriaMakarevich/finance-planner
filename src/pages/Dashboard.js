// pages/Dashboard.js
import { DashboardSummary } from "../components/DashboardSummary.js";
import {
  getTotalIncome,
  getTotalExpenses,
  getTotalBudgetLimit,
} from "../utils/storage.js";

export function Dashboard() {
  const dashboard = document.createElement("section");
  dashboard.className = "dashboard";

  let summaryComponent = null;

  function updateDashboard() {
    const income = getTotalIncome();
    const expenses = getTotalExpenses();
    const budget = getTotalBudgetLimit();

    if (summaryComponent) {
      summaryComponent.remove();
    }

    summaryComponent = DashboardSummary({ income, expenses, budget });
    dashboard.prepend(summaryComponent);

    const expensesByCat = dashboard.querySelector(
      ".budget-data__item:nth-child(2) .budget-data__text",
    );
    const recentTrans = dashboard.querySelector(
      ".budget-data__item--transactions .budget-data__text",
    );

    if (expensesByCat)
      expensesByCat.textContent =
        expenses > 0 ? "Данные обновлены" : "No expense data yet";
    if (recentTrans) recentTrans.textContent = "Данные обновлены"; // можно сделать настоящий список позже
  }

  updateDashboard();

  document.addEventListener("budget-updated", updateDashboard);


  dashboard.addEventListener(
    "remove",
    () => {
      document.removeEventListener("budget-updated", updateDashboard);
    },
    { once: true },
  );
 
  dashboard.innerHTML += `
    <div class="budget-data">
      <div class="budget-data__item">
        <span class="budget-data__title">Expenses by Category</span>
        <span class="budget-data__text">No expense data yet</span>
      </div>

      <div class="budget-data__item">
        <span class="budget-data__title">Budget vs Actual Spending</span>
        <span class="budget-data__text">No budget data yet</span>
      </div>

      <div class="budget-data__item budget-data__item--transactions">
        <span class="budget-data__title">Recent Transactions</span>
        <span class="budget-data__text">No transactions yet</span>
      </div>
    </div>
  `;

  return dashboard;
}
