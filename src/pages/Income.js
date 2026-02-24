import { TransactionSection } from "../components/TransactionSection.js";

export function Income() {
return TransactionSection({
  sectionClass: "income-balance",
  text: "income",
  buttonClass: "button-income"
});
}
