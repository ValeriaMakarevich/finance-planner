import { Header } from "./components/Header.js";
import { MainContent } from "./components/MainContent.js";
import { initRouter } from "/src/router.js";

const app = document.getElementById("app");

const header = Header();
const mainContent = MainContent();

app.append(header);
app.append(mainContent);
initRouter()
