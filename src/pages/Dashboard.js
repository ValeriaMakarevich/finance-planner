import { Summary } from "../components/Summary.js";

export function Dashboard() {
  const dashboard = document.createElement("section");
  dashboard.className = "dashboard";
  const summary = Summary({
    income: 2500,
    expenses: 1200,
    budget: 3000,
  });
  dashboard.append(summary)
  dashboard.innerHTML += `

    <div class="budget-data">
    <div class="budget-data__item ">
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
