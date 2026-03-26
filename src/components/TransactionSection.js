export function TransactionSection({ sectionClass, text, buttonClass }) {
  const isIncome = text.toLowerCase() === "income";
  const title = text.charAt(0).toUpperCase() + text.slice(1);

  const STORAGE_KEY = isIncome
    ? "budget-planner-income-transactions"
    : "budget-planner-expense-transactions";

  let transactions = [];

  const incomeExpenses = document.createElement("section");
  incomeExpenses.className = "income-expenses";

  incomeExpenses.innerHTML = `
    <div class="income-expenses__container">
      <div class="income-expenses__balance ${sectionClass}">
        <p class="income-expenses__balance-text">Total ${title}</p>
        <span data-total>$0.00</span>
      </div>

      <div class="income-expenses__add">
        <p class="income-expenses__title">Add ${title}</p>
        <form class="income-expenses__form">
          <div class="income-expenses__input-container">
            <label class="income-expenses__label">Amount</label>
            <input class="income-expenses__input" 
                   type="number" 
                   name="amount" 
                   step="0.01" 
                   min="0.01" 
                   placeholder="$0.00" 
                   required>
          </div>

          <div class="income-expenses__input-container">
            <label class="income-expenses__label">Category</label>
            <select class="income-expenses__input" name="category" required>
              <option value="" disabled selected>Выберите категорию</option>
              ${
                isIncome
                  ? `
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment</option>
                    <option value="Business">Business</option>
                    <option value="Gift">Gift</option>
                    <option value="Other">Other</option>
                  `
                  : `
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  `
              }
            </select>
          </div>

          <div class="income-expenses__input-container">
            <label class="income-expenses__label">Description</label>
            <input class="income-expenses__input" 
                   type="text" 
                   name="description" 
                   placeholder="Description">
          </div>

          <div class="income-expenses__input-container">
            <label class="income-expenses__label">Date</label>
            <input class="income-expenses__input" 
                   type="date" 
                   name="date" 
                   value="${new Date().toISOString().slice(0, 10)}">
          </div>

          <button class="income-expenses__button ${buttonClass}">
            + Add ${title}
          </button>
        </form>
      </div>

      <div class="income-expenses__history">
        <p>${title} history</p>
        <div data-trans-list></div>
      </div>
    </div>
  `;

  const form = incomeExpenses.querySelector(".income-expenses__form");
  const totalDisplay = incomeExpenses.querySelector("[data-total]");
  const listContainer = incomeExpenses.querySelector("[data-trans-list]");

  function loadTransactions() {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      transactions = json ? JSON.parse(json) : [];
    } catch (err) {
      console.warn("Ошибка при загрузке транзакций:", err);
      transactions = [];
    }
    updateDashboard();
    renderTransactions();
  }

  function saveTransactions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    document.dispatchEvent(new Event("budget-updated"));
  }

  function updateDashboard() {
    const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    totalDisplay.textContent = "$" + total.toFixed(2);
  }

  function renderTransactions() {
    if (transactions.length === 0) {
      listContainer.innerHTML = `<p class="income-expenses__no-transactions">No recorded yet</p>`;
      return;
    }

    listContainer.innerHTML = transactions
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((t) => {
        const sign = isIncome ? "+" : "-";
        const rowClass = isIncome
          ? "income-expenses__transaction-row--income"
          : "income-expenses__transaction-row--expenses";
        const formattedDate = t.date
          ? new Date(t.date).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "—";

        return `
          <div class="income-expenses__transaction-row ${rowClass}" data-id="${t.createdAt}">
            <div class="income-expenses__transaction-info">
              <span class="income-expenses__transaction-category">${t.category}</span>
              <span class="income-expenses__transaction-meta">${t.category} • ${formattedDate}</span>
            </div>
            <div class="income-expenses__transaction-right">
              <span class="income-expenses__amount">${sign}$${Number(t.amount).toFixed(2)}</span>
              <button class="income-expenses__btn-delete" title="Удалить">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        `;
      })
      .join("");

  
    listContainer.querySelectorAll(".income-expenses__btn-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest(".income-expenses__transaction-row");
        const id = Number(row.dataset.id);

        if (confirm("Удалить эту транзакцию?")) {
          transactions = transactions.filter((t) => t.createdAt !== id);
          saveTransactions();
          updateDashboard();
          renderTransactions();
        }
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));

    if (isNaN(amount) || amount <= 0) {
      alert("Введите сумму больше 0");
      return;
    }

    const newEntry = {
      amount,
      category: formData.get("category"),
      description: (formData.get("description") || "").trim(),
      date: formData.get("date") || "",
      createdAt: Date.now(),
    };

    transactions.push(newEntry);

    saveTransactions();

    updateDashboard();
    renderTransactions();

    form.reset();
    form.querySelector('[name="date"]').value = new Date()
      .toISOString()
      .slice(0, 10);
  });

  loadTransactions();

  return incomeExpenses;
}
