import { TransactionSection } from "../components/TransactionSection.js";

export function Expenses() {
  return TransactionSection({
    sectionClass: "expenses-balance",
    text: "expenses",
    buttonClass: "button-expenses",
  });
  }
