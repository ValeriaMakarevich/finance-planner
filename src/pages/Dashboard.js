export function Dashboard() {
  const dashboard = document.createElement("dashboard");
  dashboard.className = "dashboard";

  dashboard.innerHTML = `
    <div class="dashboard">

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
    <div>
    <h3>Expenses by Category</h3>
    <span>No expense data yet</span>
    </div>

    <div>
    <h3>Budget vs Actual Spending</h3>
    <span>No budget data yet</span>
    </div>

     <div>
    <h3>Recent Transactions</h3>
    <span>No transactions yet</span>
    </div>
    </div>
    </div>
   
  `;

  return dashboard;
}
