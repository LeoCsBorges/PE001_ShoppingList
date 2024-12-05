import { textCapitalization } from "./textCapitalization.js";
import { formatDateObject } from "./formatDateObject.js";
import { changeItemStatus } from "./itemPersistency.js"


export function createItemElement(itemName, shoppingList) {
    const item = document.createElement('li');
    const itemWrapper = document.createElement('div');
    const itemInfo = document.createElement('div')
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const itemOptions = document.createElement('div');
    const itemOption1 = document.createElement('button');
    const itemOption2 = document.createElement('button');
    const timing = document.createElement('p');
    const date = new Date();

    //adding classes
    item.classList.add('item');
    itemWrapper.classList.add('item__wrapper');
    itemInfo.classList.add('item__info');
    checkbox.classList.add('checkbox', 'shop');
    label.classList.add('item__name', 'shop');
    itemOptions.classList.add('item__options');
    itemOption1.classList.add('item__option', 'item__option--delete', 'shop');
    itemOption2.classList.add('item__option', 'item__option--edit', 'shop');
    timing.classList.add('item__timing');

    //setting element structure
    item.append(itemWrapper, timing);
    itemWrapper.append(itemInfo, itemOptions);
    itemInfo.append(checkbox, label);
    itemOptions.append(itemOption1, itemOption2);

    //setting element data
    checkbox.setAttribute('id', `checkShop${shoppingList.length}`);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', `${shoppingList.length}`);
    label.setAttribute('for', `checkShop${shoppingList.length}`);
    label.setAttribute('id', `labelShop${shoppingList.length}`);
    label.setAttribute('data-index', `${shoppingList.length}`);
    label.innerHTML = textCapitalization(itemName);
    itemOption1.setAttribute('type', 'button');
    itemOption1.setAttribute('data-index', `${shoppingList.length}`);
    itemOption1.style.backgroundImage = "url('../assets/images/delete.svg')";
    itemOption2.setAttribute('type', 'button');
    itemOption2.style.backgroundImage = "url('../assets/images/edit.svg')";
    timing.innerHTML = formatDateObject(date);

    //adding listeners
    changeItemStatus(checkbox);
    // deleteItem(itemOption1);
    // editItem(itemOption2);

    //adding the new item to the array of items
    shoppingList.push(item);
    return shoppingList;
}