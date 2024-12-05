import { isListEmpty } from "./isListEmpty.js";

const shopList = document.querySelector('#shop-list');
const purchasedList = document.querySelector('#purchased-list');

export function renderItems(shoppingList, purchasedList) {
    console.log('renderizar')

    // remove all shop items & fill within the array items
    // while (shoppingListArray.firstChild) {
    //     shoppingList.removeChild(shopList.firstChild);
    // }

    shoppingList.forEach(function (item) {
        shopList.appendChild(item);
    })


    // //remove all purchased items & fill within the array purchased items
    // while (purchasedListArray.firstChild) {
    //     purchasedListArray.removeChild(purchasedList.firstChild);
    // }

    purchasedList.forEach(function (item) {
        purchasedList.appendChild(item);
    })

    isListEmpty(shoppingList, purchasedList);
}