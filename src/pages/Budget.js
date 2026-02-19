export function Budget() {
  const budget = document.createElement("section");
  budget.className = "income";
  budget.innerHTML = `
    <div>Income</div>
    `;
  return budget;
}
