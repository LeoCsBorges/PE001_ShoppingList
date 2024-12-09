import { fromLocalStorage } from "./itemStorage.js";
import { isListEmpty } from "./validations.js";
import { deleteList, renderItems } from "./itemElement.js";
import { clearInput, submitForm } from "./formElements.js";

//on page load
document.addEventListener('DOMContentLoaded', function () {
    fromLocalStorage();
    isListEmpty();
    renderItems();
});

//clear form button
document.querySelector('#clear-input-btn').addEventListener('click', clearInput);

//submit form button
document.querySelector('#create-item-form').addEventListener('submit', submitForm);

//clear shopping list button
document.querySelector('#delete-shop-btn').addEventListener('click', function () {
    deleteList(this);
});

//clear purchased list button
document.querySelector('#delete-purchased-btn').addEventListener('click', function () {
    deleteList(this);
});