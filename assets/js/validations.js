import { inputToolTip } from "./inputToolTip.js";
import { list } from "./itemStorage.js";

const input = document.querySelector('#input');

export function isListEmpty() {
    const items = list();
    const someShoppingItem = items.filter((item) => !item.checked);

    //empty list
    if (items.length == 0) {
        document.querySelector('.shopping-list__description').classList.remove('hidden');
        document.querySelector('#purchased-list-div').classList.add('hidden');
        return;
    }

    //empty shopping list
    if (someShoppingItem.length == 0) {
        document.querySelector('.shopping-list__description').classList.remove('hidden');
        document.querySelector('#purchased-list-div').classList.remove('hidden');

        //not empty lists
    } else {
        document.querySelector('.shopping-list__description').classList.add('hidden');
        document.querySelector('#purchased-list-div').classList.remove('hidden');
    }
}

export function inputValidation() {

    if (input.value.trim() == '' || input.value.length <= 2) {
        return false;
    }

    return true;
}

export function invalidInputTooltip() {
    const content = 'Ops... item inválido!';
    const theme = 'tomato';
    inputToolTip(input, content, theme);
}

export function validInputTooltip() {
    const content = 'Item adicionado à lista!';
    const theme = 'avocado';
    inputToolTip(input, content, theme);
}