export function Header() {
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <h1 class="header__title">Money planner</h1>
    <p>Track your income, expenses, and budget</p>

    <nav class="header__nav">
      <a href="/" class="header__link">Dashboard</a>
      <a href="/income" class="header__link">Income</a>
      <a href="/expenses" class="header__link">Expenses</a>
      <a href="/budget" class="header__link">Budget</a>
    </nav>
  `;

  return header;
}
