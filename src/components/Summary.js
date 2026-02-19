export function Summary({income = 0, expenses = 0, budget = 0}){
const balance = income - expenses
const summary = document.createElement("section")
summary.className = "dashboard__summary"

summary.innerHTML = `
  <div class="summary__item summary__item--income">
    <span>Total income</span>
    <span>$${income.toFixed(2)}</span>
  </div>

  <div class="summary__item summary__item--expenses">
    <span>Total expenses</span>
    <span>$${expenses.toFixed(2)}</span>
  </div>

  <div class="summary__item summary__item--balance">
    <span>Balance</span>
    <span>$${balance.toFixed(2)}</span>
  </div>

  <div class="summary__item summary__item--budget">
    <span>Total budget</span>
    <span>$${budget.toFixed(2)}</span>
  </div>
`;
return summary
}