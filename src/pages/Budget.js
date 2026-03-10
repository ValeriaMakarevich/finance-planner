// pages/Budget.js
import { BudgetSummary } from "../components/BudgetSummary.js";

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
    <div class="budget-form-section">
      <p class="budget-title">Set Budget Limit</p>

      <form class="budget-form">
        <div class="form-row">
          <label>Category</label>
          <select name="category" required>
            <option value="" disabled selected>Выберите категорию</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-row">
          <label>Budget Limit</label>
          <div class="input-currency">
            <span>$</span>
            <input 
              type="number" 
              name="limit" 
              step="0.01" 
              min="0.01" 
              placeholder="0.00" 
              required
            >
          </div>
        </div>

        <button type="submit" class="btn-add-budget">+ Set Budget</button>
      </form>
    </div>

    <div class="budget-history">
      <p>Budget Limits</p>
      <div data-budget-list class="budget-list"></div>
    </div>
  `;

  page.appendChild(container);

 
  let budgets = loadBudgets();

  function loadBudgets() {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  }

  function saveBudgets() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }

  function getTotals() {
    const totalBudget = budgets.reduce(
      (sum, item) => sum + Number(item.limit),
      0,
    );
    const totalSpent = 0; 
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
      list.innerHTML = `<p class="no-data">Пока нет установленных лимитов</p>`;
      return;
    }


    budgets
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "budget-row";
        row.innerHTML = `
          <span class="category">${item.category}</span>
          <span class="limit">$${Number(item.limit).toFixed(2)}</span>
          <button class="btn-remove" data-idx="${idx}">Remove</button>
        `;
        list.appendChild(row);
      });

    // Удаление
    list.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        budgets.splice(idx, 1);
        saveBudgets();
        renderList();
        updateSummary();
      });
    });
  }

  const form = container.querySelector(".budget-form");

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
        category,
        limit,
        createdAt: Date.now(),
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
