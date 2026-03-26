import { BudgetSummary } from "../components/BudgetSummary.js";
import { getTotalSpent, getExpenseAmountByCategory } from "../utils/storage.js";

const STORAGE_KEY = "budget-planner-budgets";

export function Budget() {
  const page = document.createElement("section");
  page.className = "budget-page";

  const summary = BudgetSummary({
    budget: 0,
    spent: 0,
  });
  page.appendChild(summary);

  const totalBudgetEl = summary.querySelector(
    ".summary__item--total-budget span:last-child",
  );
  const totalSpentEl = summary.querySelector(
    ".summary__item--total-spent span:last-child",
  );
  const remainingEl = summary.querySelector(
    ".summary__item--remaining span:last-child",
  );

  const container = document.createElement("div");
  container.className = "budget-container";

  container.innerHTML = `
    <div class="budget__form-section">
      <form class="budget__form">
      <p class="budget__title">Set Budget Limit</p>
        <div class="budget__form-wrapper">
        <div class="budget__select-wrapper">
          <label>Category</label>
          <select class="budget__select" name="category" required>
            <option value="" disabled selected>Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="budget__input-wrapper">
          <label>Budget Limit</label>
            <input 
              class="budget__input"
              type="number" 
              name="limit" 
              step="0.01" 
              min="0.01" 
              placeholder="$0.00" 
              required
            >
          </div>
        </div>
        
        <div class="budget__button-wrapper">
        <button type="submit" class="budget__button">+ Set Budget</button>
        </div>
        </form>
    </div>

    <div class="budget__history">
      <p>Budget Overview</p>
      <div data-budget-list class="budget__list"></div>
    </div>
  `;

  page.appendChild(container);

  let budgets = loadBudgets();

  function loadBudgets() {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.warn("Ошибка загрузки бюджетов:", err);
      return [];
    }
  }

  function saveBudgets() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    document.dispatchEvent(new Event("budget-updated"));
  }

  function getTotals() {
    const totalBudget = budgets.reduce(
      (sum, item) => sum + Number(item.limit),
      0,
    );
    const totalSpent = getTotalSpent();
    const remaining = totalBudget - totalSpent;

    return { totalBudget, totalSpent, remaining };
  }

  function updateSummary() {
    const { totalBudget, totalSpent, remaining } = getTotals();

    if (totalBudgetEl) totalBudgetEl.textContent = totalBudget.toFixed(2);
    if (totalSpentEl) totalSpentEl.textContent = totalSpent.toFixed(2);
    if (remainingEl) remainingEl.textContent = remaining.toFixed(2);
  }

  function renderList() {
    const list = container.querySelector("[data-budget-list]");
    list.innerHTML = "";

    if (budgets.length === 0) {
      list.innerHTML = `<p class="budget__no-data">No budgets set yet</p>`;
      return;
    }

    const sortedBudgets = budgets
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);

    sortedBudgets.forEach((item) => {
      const spent = getExpenseAmountByCategory(item.category);

      const limit = Number(item.limit);
      const remaining = limit - spent;
      const percent = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

      const row = document.createElement("div");
      row.className = "budget__history-element";

      row.innerHTML = `
  <span class="budget__history-category">${item.category}</span>
  <button class="budget__btn-remove" data-time="${item.createdAt}">🗑</button>
  <span class="budget__spent">$${spent.toFixed(2)} spent</span>
  <span class="budget__history-limit">$${limit.toFixed(2)} limit</span>
  <div class="budget__progress-bar">
    <div class="budget__progress-fill" style="width: ${percent}%"></div>
  </div>
  <span class="budget__remaining">Remaining: $${remaining.toFixed(2)}</span>
  <span class="budget__percent ${percent >= 100 ? "over-budget" : ""}">${percent.toFixed(0)}% used</span>
`;
      list.appendChild(row);
    });

    list.querySelectorAll(".budget__btn-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const createdAt = Number(btn.dataset.time);

        budgets = budgets.filter((b) => b.createdAt !== createdAt);
        saveBudgets();
        renderList();
        updateSummary();
      });
    });
  }

  const form = container.querySelector(".budget__form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const limit = Number(formData.get("limit"));

    if (isNaN(limit) || limit <= 0) {
      alert("Введите сумму больше 0");
      return;
    }

    const category = formData.get("category");
    const existingIndex = budgets.findIndex((b) => b.category === category);

    if (existingIndex !== -1) {
      if (!confirm(`Лимит для "${category}" уже установлен. Заменить?`)) {
        return;
      }

      budgets[existingIndex] = {
        ...budgets[existingIndex],
        limit,
      };
    } else {
      budgets.push({
        category,
        limit,
        createdAt: Date.now(),
      });
    }

    saveBudgets();
    form.reset();
    renderList();
    updateSummary();
  });

  updateSummary();
  renderList();

  return page;
}
