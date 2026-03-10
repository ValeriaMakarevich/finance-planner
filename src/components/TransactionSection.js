export function TransactionSection({ sectionClass, text, buttonClass }) {

  const isIncome = text.toLowerCase() === "income";
  const title = text.charAt(0).toUpperCase() + text.slice(1); 

  let transactions = [];
  let total = 0;

  const incomeExpenses = document.createElement("section");
  incomeExpenses.className = "income-expenses";

  incomeExpenses.innerHTML = `
    <div class="income-expenses_container">
      <div class="income-expenses_balance ${sectionClass}">
        <p class="balance_text">Total ${title}</p>
        <span data-total>$0.00</span>
      </div>

      <div class="income-expenses_add">
        <p class="income-expenses_title">Add ${title}</p>
        <form class="income-expenses_form">
          <div class="income-expenses_input-container">
            <label class="income-expenses_label">Amount</label>
            <input class="income-expenses_input" 
                   type="number" 
                   name="amount" 
                   step="0.01" 
                   min="0.01" 
                   placeholder="$0.00" 
                   required>
          </div>

          <div class="income-expenses_input-container">
            <label class="income-expenses_label">Category</label>
            <select class="income-expenses_input" name="category" required>
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

          <div class="income-expenses_input-container">
            <label class="income-expenses_label">Description</label>
            <input class="income-expenses_input" 
                   type="text" 
                   name="description" 
                   placeholder="Description">
          </div>

          <div class="income-expenses_input-container">
            <label class="income-expenses_label">Date</label>
            <input class="income-expenses_input" 
                   type="date" 
                   name="date" 
                   value="${new Date().toISOString().slice(0, 10)}">
          </div>

          <button class="income-expenses_button ${buttonClass}">
            + Add ${title}
          </button>
        </form>
      </div>

      <div class="income-expenses_history">
        <p>${title} History</p>
        <div data-trans-list></div>
      </div>
    </div>
  `;

  const form = incomeExpenses.querySelector(".income-expenses_form");
  const totalDisplay = incomeExpenses.querySelector("[data-total]");
  const listContainer = incomeExpenses.querySelector("[data-trans-list]");

  function updateDushboard() {
    total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const sign = isIncome ? "+" : "-";
    totalDisplay.textContent = sign + total.toFixed(2);
  }

  function renderTransactions() {
    if (transactions.length === 0) {
      listContainer.innerHTML = `<p class="no-transactions">Пока нет записей</p>`;
      return;
    }

    listContainer.innerHTML = transactions
      .slice() 
      .sort((a, b) => b.createdAt - a.createdAt) 
      .map(
        (t) => `
        <div class="transaction-row ${isIncome ? "income-row" : "expense-row"}">
          <span class="amount">${isIncome ? "+" : "-"}${Number(t.amount).toFixed(2)}</span>
          <span class="category">${t.category}</span>
          <span class="description">${t.description || "—"}</span>
          <span class="date">${t.date || "—"}</span>
        </div>
      `,
      )
      .join("");
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

    updateDushboard();
    renderTransactions();

    form.reset();

    form.querySelector('[name="date"]').value = new Date()
      .toISOString()
      .slice(0, 10);
  });

  updateDushboard();
  renderTransactions();

  return incomeExpenses;
}
