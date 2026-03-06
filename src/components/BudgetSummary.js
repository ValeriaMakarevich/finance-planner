import { CreateStatCard } from "./CreateStateCard.js";


export function BudgetSummary({ budget = 0, spent = 0 }) {
  const remaining = Number(budget) - Number(spent);

  const section = document.createElement("section");
  section.className = "dashboard__summary summary--budget";

  section.append(
    CreateStatCard({
      title: "Total Budget",
      value: budget,
      classModifier: "summary__item--total-budget",
      icon: "📊",
    }),
    CreateStatCard({
      title: "Total Spent",
      value: spent,
      classModifier: "summary__item--total-spent",
      icon: "→",
    }),
    CreateStatCard({
      title: "Remaining",
      value: remaining,
      classModifier: "summary__item--remaining",
    }),
  );

  return section;
}
