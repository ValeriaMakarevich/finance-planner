import { Budget } from "./pages/Budget.js";
import { Dashboard } from "./pages/Dashboard.js";
import { Expenses } from "./pages/Expenses.js";
import { Income } from "./pages/Income.js";


const routes = {
  "/": Dashboard,
  "/dashboard": Dashboard,
  "/income": Income,
  "/expenses": Expenses,
  "/budget": Budget,
};

function getOrCreateMain() {
  let main = document.querySelector("main.layout");
  if (!main) {
    // если main ещё нет — создаём его один раз
    main = document.createElement("main");
    main.className = "layout";
    document.getElementById("app").appendChild(main);
  }
  return main;
}


function renderPage(path) {
  const main = getOrCreateMain();

  // полностью очищаем предыдущий контент
  main.replaceChildren();

  const pageFactory = routes[path] || routes["/"];
  const pageContent = pageFactory(); // ← это <section> или другой элемент

  main.appendChild(pageContent);

  // обновляем адресную строку
  window.history.pushState({ path }, "", path);
}

export function initRouter() {
  // клики по ссылкам
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;

    e.preventDefault();
    renderPage(href);
  });

  // поддержка истории браузера (назад/вперёд)
  window.addEventListener("popstate", (event) => {
    const path = event.state?.path || window.location.pathname;
    renderPage(path);
  });

  // первый рендер
  const initialPath = window.location.pathname || "/";
  renderPage(initialPath);
}
