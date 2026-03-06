import { BudgetSummary } from "../components/BudgetSummary.js";

export function Budget() {
  const budget = document.createElement("section");
  budget.className = "budget";
   const summaryBudget = BudgetSummary({
      budget: 2500,
      spent: 1200,
    });

    budget.append(summaryBudget)
  budget.innerHTML += `
    <div>Income</div>
    `;
  return budget;
}
