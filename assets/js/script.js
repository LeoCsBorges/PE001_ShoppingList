import { clearInput, submitForm } from "./formElements.js";

//clear button
document.querySelector('#clear-input-btn').addEventListener('click', clearInput);

//submit button
document.querySelector('#create-item-form').addEventListener('submit', submitForm);