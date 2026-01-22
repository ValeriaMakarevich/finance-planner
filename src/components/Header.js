
export function Header() {
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <h1 class="header__title">Money planner</h1>
    <p>Track your income, expenses, and budget</p>

    <nav class="header__nav">
      <button class="header__button"><a href="/" class="header__link">Dashboard</a></button>
      <button class="header__button"><a href="/transactions" class="header__link">Income</a></button>
      <button class="header__button"><a href="/settings" class="header__link">Expenses</a></button>
      <button class="header__button"><a href="/settings" class="header__link">Budget</a></button>
    </nav>
  `;

  return header;
}
