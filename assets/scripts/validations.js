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
    try {
        if (input.value.trim() == '') {
            throw new Error('Ops... o item está vazio.');
        }
        if (input.value.length < 3) {
            throw new Error('Ops... o item precisa ter pelo menos 3 caracteres.');
        }
        if (!isNaN(input.value)) {
            throw new Error('Ops... o item não pode conter apenas números.');
        }
        validInputTooltip('Item adicionado à lista!');
        return true;

    } catch (error) {
        invalidInputTooltip(error.message);
        return false;
    }
}

export function invalidInputTooltip(message) {
    const theme = 'tomato';
    inputToolTip(input, message, theme);
}

export function validInputTooltip(message) {
    const theme = 'avocado';
    inputToolTip(input, message, theme);
}