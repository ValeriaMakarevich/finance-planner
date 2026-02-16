export function Summary(){
const summary = document.createElement("section")
summary.className = "dashboard__summary"

summary.innerHTML = `
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
`
return summary
}