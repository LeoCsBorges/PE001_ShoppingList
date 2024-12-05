import { addTooltip } from "./addToolTip.js";
import { createItemElement } from "./createItemElement.js";
import { renderItems } from "./renderItems.js";


export function clearInput(event) {
    event.preventDefault();
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
}

export function submitInput(itemName, itemList) {
    //invalid input
    if (itemName.trim() === '' || itemName.length <= 2) {
        const tooltip = document.createElement('div');

        tooltip.setAttribute('data-tippy-root', null);
        document.querySelector('main').appendChild(tooltip);
        addTooltip(tooltip);
        setTimeout(function () {
            document.querySelector('main').removeChild(tooltip);
        }, 3000);
        return;
    }

    //create an new item
    const shoppingList = createItemElement(itemName, itemList);
    const purchasedList = [];
    renderItems(shoppingList, purchasedList);
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
}
