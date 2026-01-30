import { Header } from "./components/Header.js";
import { Dashboard } from "./pages/Dashboard.js";

const app = document.getElementById("app");

const header = Header();
const dashboard = Dashboard();

app.append(header);
app.append(dashboard);
