export function Dashboard() {
  const dashboard = document.createElement("main");
  dashboard.className = "dashboard";

  dashboard.innerHTML = `
   

    <section class="dashboard__summary">
    <div class="summary__item summary__item--income">
    <span>Total income</span>
    <span>$0.00</span>
    </div>

    <div class="summary__item summary__item--expenses">
    <span>Total expenses</span>
    <span>$0.00</span>
    </div>

    <div class="summary__item summary__item--balance">
    <span>Balance</span>
    <span>$0.00</span>
    </div>

    <div class="summary__item summary__item--budget">
    <span>Total budget</span>
    <span>$0.00</span>
    </div>
    </section>

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
