import { isListEmpty, inputValidation, validInputTooltip, invalidInputTooltip } from "./validations.js";
import { formatDateObj } from "./formatDateObj.js"
import { createItemObject } from "./itemStorage.js"
import { renderItems } from "./itemElement.js";
const input = document.querySelector('#input');


//on page load
isListEmpty();

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

    //invalid
    if (!inputValidation()) {
        invalidInputTooltip();
        return;
    }

    //valid
    validInputTooltip();

    //create item object & render html elements
    createItemObject(input.value, formatDateObj(new Date()), false);

    //render html elements and restart the process
    renderItems();
    clearInput();
}
