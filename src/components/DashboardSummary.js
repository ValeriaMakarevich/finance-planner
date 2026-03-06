import { CreateStatCard } from "./CreateStateCard.js";



export function DashboardSummary({ income = 0, expenses = 0, budget = 0 }) {
  const balance = Number(income) - Number(expenses);

  const section = document.createElement("section");
  section.className = "dashboard__summary";

  section.appendChild(
    CreateStatCard({
      title: "Total Income",
      value: income,
      classModifier: "summary__item--income",
      icon: "↑",
    }),
  );

  section.appendChild(
    CreateStatCard({
      title: "Total Expenses",
      value: expenses,
      classModifier: "summary__item--expenses",
      icon: "↓",
    }),
  );

  section.appendChild(
    CreateStatCard({
      title: "Balance",
      value: balance,
      classModifier: "summary__item--balance",
      icon: "$",
    }),
  );

  section.appendChild(
    CreateStatCard({
      title: "Total Budget",
      value: budget,
      classModifier: "summary__item--budget",
      icon: "📊",
    }),
  );

  return section;
}
