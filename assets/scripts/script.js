import { clearInput, submitForm } from "./formElements.js";
import { deleteList } from "./itemElement.js";

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