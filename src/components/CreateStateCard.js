export function CreateStatCard({ title, value, classModifier = "", icon = "" }) {
    const card = document.createElement("div");
    card.className = `summary__item ${classModifier}`;

    const formatted = Number(value).toFixed(2);
    
    card.innerHTML = `
        <span>${icon ? icon + ' ' : ''}${title}</span>
        <span>$${formatted}</span>
    `;

    return card;
}