
import { DashboardSummary } from "../components/DashboardSummary.js";
import {
  getTotalIncome,
  getTotalExpenses,
  getTotalBudgetLimit,
  getExpensesByCategory,
} from "../utils/storage.js";

export function Dashboard() {
  const dashboard = document.createElement("section");
  dashboard.className = "dashboard";

  let summaryComponent = null;

  function createSummary() {
    const income = getTotalIncome();
    const expenses = getTotalExpenses();
    const budget = getTotalBudgetLimit();

    if (summaryComponent) summaryComponent.remove();

    summaryComponent = DashboardSummary({ income, expenses, budget });
    dashboard.prepend(summaryComponent);
  }

  

  function renderExpensesByCategory() {
    const container = dashboard.querySelector("#expenses-by-category");
    if (!container) return;

    const byCategory = getExpensesByCategory(); 

    if (Object.keys(byCategory).length === 0) {
      container.innerHTML = `<p class="budget-data__no-data">No expense data yet</p>`;
      return;
    }

    let html = `<ul class="budget-data__category-list">`;
    Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, amount]) => {
        html += `
          <li class="budget-data__category-item">
            <span>${category}</span>
            <span class="budget-data__amount">-$${Number(amount).toFixed(2)}</span>
          </li>`;
      });
    html += `</ul>`;

    container.innerHTML = html;
  }

  function renderBudgetVsActual() {
    const container = dashboard.querySelector("#budget-vs-actual");
    if (!container) return;

   
    const budgets = JSON.parse(
      localStorage.getItem("budget-planner-budgets") || "[]",
    );
    const expenses = JSON.parse(
      localStorage.getItem("budget-planner-expense-transactions") || "[]",
    );

    if (budgets.length === 0) {
      container.innerHTML = `<p class="budget-data__no-data">No budget data yet</p>`;
      return;
    }

    let html = `<div class="budget-data__budget-comparison">`;

    budgets.forEach((budgetItem) => {
      const spent = expenses
        .filter((exp) => exp.category === budgetItem.category)
        .reduce((sum, exp) => sum + Number(exp.amount), 0);

      const limit = Number(budgetItem.limit);
      const percent = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
      const remaining = limit - spent;

      html += `
        <div class="budget-data__comparison-row">
          <div class="budget-data__category-name">${budgetItem.category}</div>
          <div class="budget-data__progress-container">
            <div class="budget-data__progress-bar">
              <div class="budget-data__progress-fill ${percent >= 100 ? "over-budget" : ""}" 
                   style="width: ${percent}%"></div>
            </div>
          </div>
          <div class="budget-data__numbers">
            <span class="budget-data__spent">$${spent.toFixed(2)}</span>
            <span class="budget-data__limit">/ $${limit.toFixed(2)}</span>
            <span class="budget-data__remaining ${remaining < 0 ? "negative" : ""}">
              Остаток: $${remaining.toFixed(2)}
            </span>
          </div>
        </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  function renderRecentTransactions() {
    const container = dashboard.querySelector("#recent-transactions");
    if (!container) return;

    const expenses = JSON.parse(
      localStorage.getItem("budget-planner-expense-transactions") || "[]",
    );

    if (expenses.length === 0) {
      container.innerHTML = `<p class="budget-data__no-data">No transactions yet</p>`;
      return;
    }

    const recent = expenses
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    let html = `<div class="budget-data__recent-transactions-list">`;

    recent.forEach((t) => {
      const date = new Date(t.date || t.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      html += `
        <div class="budget-data__recent-transaction">
          <div class="budget-data__recent-info">
            <span class="budget-data__recent-category">${t.category}</span>
            ${t.description ? `<span class="budget-data__recent-desc">${t.description}</span>` : ""}
          </div>
          <div class="budget-data__recent-right">
            <span class="budget-data__recent-amount">-$${Number(t.amount).toFixed(2)}</span>
            <span class="budget-data__recent-date">${date}</span>
          </div>
        </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  function renderAll() {
    createSummary();
    renderExpensesByCategory();
    renderBudgetVsActual();
    renderRecentTransactions();
  }


  dashboard.innerHTML += `
    <div class="budget-data">
      <div class="budget-data__item">
        <span class="budget-data__title">Expenses by Category</span>
        <div id="expenses-by-category" class="budget-data__content"></div>
      </div>

      <div class="budget-data__item">
        <span class="budget-data__title">Budget vs Actual Spending</span>
        <div id="budget-vs-actual" class="budget-data__content"></div>
      </div>

      <div class="budget-data__item budget-data__item--transactions">
        <span class="budget-data__title">Recent Transactions</span>
        <div id="recent-transactions" class="budget-data__content"></div>
      </div>
    </div>
  `;

 
  renderAll();

  document.addEventListener("budget-updated", renderAll);


  dashboard.addEventListener(
    "remove",
    () => document.removeEventListener("budget-updated", renderAll),
    { once: true },
  );

  return dashboard;
}
