import { inputValidation } from "./validations.js";
import { formatDateObj } from "./formatDateObj.js"
import { createItemObject } from "./itemStorage.js"
import { renderItems } from "./itemElement.js";

const input = document.querySelector('#input');

//form buttons
export function clearInput() {
    input.value = '';
    input.focus();
}

/**
 * @param {SubmitEvent} event
 */
export function submitForm(event) {
    event.preventDefault();

    if (!inputValidation()) {
        //invalid input
        return;
    }

    //create an item object
    createItemObject(input.value, formatDateObj(new Date()), false);

    //render html elements and restart the process
    renderItems();
    clearInput();
}
