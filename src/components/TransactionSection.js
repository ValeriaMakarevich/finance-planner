
    export function TransactionSection({ sectionClass, text, buttonClass }) {
      const incomeExpenses = document.createElement("section");
      incomeExpenses.className = "income-expenses";
      incomeExpenses.innerHTML = `
    <div class="income-expenses_container">
    <div class="income-expenses_balance ${sectionClass}">
    <p class="balance_text">Total ${text}</p>
     $0.00
     </div>
    <div class="income-expenses_add">
    <p class="income-expenses_title">Add income</p>
    <form class="income-expenses_form">
    <div class="income-expenses_input-container">
    <label class="income-expenses_label">Amount</label>
    <input class="income-expenses_input" type="number" placeholder="$0.00">
    </div>
     <div class="income-expenses_input-container">
    <label class="income-expenses_label">Category</label>
    <select class="income-expenses_input" name="category" id="category">
    <option value="">Выберите категорию</option>
    <option value="apple">Freelance</option>
    <option value="banana">Salary</option>
    <option value="orange">Investment</option>
    <option value="kiwi">Business</option>
    <option value="grape">Gift</option>
    <option value="grape">Other</option>
</select>
    </div>
    <div class="income-expenses_input-container">
    <label class="income-expenses_label">Description</label>
    <input class="income-expenses_input" type="text" placeholder="Description">
    </div>
    <div class="income-expenses_input-container">
    <label class="income-expenses_label">Date</label>
    <input class="income-expenses_input" type="date">
    </div>
    <button class="income-expenses_button ${buttonClass}">+ Add ${text}</button>
    </form>
    </div>
    <div class="income-expenses_history">
    <p>${text} History</p>
    </div>
    </div>
    `;
      return incomeExpenses;
    }
