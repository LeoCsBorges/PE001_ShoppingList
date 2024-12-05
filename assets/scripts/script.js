const inputField = document.getElementById('input');
const submitButton = document.getElementById('btn-submit');
const clearButton = document.getElementById('btn-clean');


const shoppingListArray = Array.from(document.querySelectorAll('.item'));
const PurchasedListArray = Array.from(document.querySelectorAll('.item .purchased-item'));
const deleteShopListBtn = document.getElementById('delete-shop-btn');
const deletePurchasedListBtn = document.getElementById('delete-purchased-btn');
let itemIndex = null;
let itemList = null;
let itemToEdit = null;

import { isListEmpty } from "./isListEmpty.js";
import { textCapitalization } from "./textCapitalization.js";
import { clearInput, submitInput } from "./formInputButtons.js";

//check lists on load
isListEmpty(shoppingListArray, PurchasedListArray);

//listeners of all main features
clearButton.addEventListener('click', clearInput);
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    submitInput(inputField.value, shoppingListArray);
});
// deleteShopListBtn.addEventListener('click', deleteShopList);
// deletePurchasedListBtn.addEventListener('click', deletePurchasedList)





// function deleteShopList() {
//     const description = 'Deseja apagar toda a lista? Esse processo não pode ser desfeito.'
//     const list = 'shop'
//     showModal(description, null, list, true);
// }

// function deletePurchasedList() {
//     const description = 'Deseja apagar toda a lista? Esse processo não pode ser desfeito.'
//     const list = 'purchased'
//     showModal(description, null, list, true);
// }

// function deleteItem(btnDelete) {
//     btnDelete.addEventListener('click', async function () {
//         const description = 'Deletar este item da lista? Esse processo não pode ser desfeito.'
//         const itemIndex = this.dataset.index;
//         let list = this.classList.contains('shop') ? 'shop' : 'purchased';

//         showModal(description, itemIndex, list, true);
//     })
// }

// function editItem(btnEdit) {
//     btnEdit.addEventListener('click', function () {
//         const item = getItem(this);
//         const description = 'Digite a alteração que deseja fazer no item:';
//         let list = this.classList.contains('shop') ? 'shop' : 'purchased';

//         showModal(description, item, list, false);
//     })
// }



// function resetShopItems() {
//     const allCheckboxesShop = document.querySelectorAll('.checkbox.shop');
//     const allLabelsShop = document.querySelectorAll('.item__name.shop');
//     const allDeleteButtonsShop = document.querySelectorAll('.item__option--delete.shop');

//     for (let cont = 0; cont < shoppingListArray.length; cont++) {
//         allCheckboxesShop[cont].setAttribute('id', `checkShop${cont}`);
//         allCheckboxesShop[cont].dataset.index = `${cont}`;
//         allLabelsShop[cont].setAttribute('for', `checkShop${cont}`);
//         allLabelsShop[cont].setAttribute('id', `labelShop${cont}`);
//         allLabelsShop[cont].dataset.index = `${cont}`;
//         allDeleteButtonsShop[cont].dataset.index = `${cont}`;
//     }
// }

// function resetPurchasedItems() {
//     const allCheckboxesPurchased = document.querySelectorAll('.checkbox.purchased');
//     const allLabelspurchased = document.querySelectorAll('.item__name.purchased');
//     const allDeleteButtonsPurchased = document.querySelectorAll('.item__option--delete.purchased');

//     for (let cont = 0; cont < PurchasedListArray.length; cont++) {
//         allCheckboxesPurchased[cont].setAttribute('id', `checkPurchased${cont}`);
//         allCheckboxesPurchased[cont].dataset.index = `${cont}`;
//         allLabelspurchased[cont].setAttribute('for', `checkPurchased${cont}`);
//         allLabelspurchased[cont].setAttribute('id', `labelPurchased${cont}`);
//         allLabelspurchased[cont].dataset.index = `${cont}`;
//         allDeleteButtonsPurchased[cont].dataset.index = `${cont}`;
//     }
// }

// //modal hide after a confirmation
// function hideModal() {
//     document.getElementById('modal').classList.remove('is-open');

//     //clear all items/list
//     itemIndex = null;
//     itemList = null;
//     itemToEdit = null;
// }

// //open modal in accordance with the feature
// function showModal(description, item, list, isDelete) {
//     const modal = document.getElementById('modal');
//     const descriptionElement = document.querySelector('.modal-custom-content__description');
//     const inputEdit = document.querySelector('.input--edit');
//     let img = document.querySelector('#modal img');

//     cleanModal();
//     modal.classList.add('is-open');
//     descriptionElement.innerHTML = description;
//     itemIndex = item;
//     itemList = list;

//     //deleting modal
//     if (isDelete) {
//         const backdropElement = document.querySelector('.backdrop');
//         backdropElement.style.alignItems = 'center';
//         backdropElement.style.paddingTop = '0';
//         img.src = '../assets/images/delete-modal.png';

//         //editing modal
//     } else {
//         const backdropElement = document.querySelector('.backdrop');
//         backdropElement.style.alignItems = 'start';
//         backdropElement.style.paddingTop = '2.5rem';
//         img.src = '../assets/images/edit-modal.png';
//         inputEdit.classList.remove('hidden');
//         itemIndex = item.querySelector('.item__name').dataset.index;
//         inputEdit.value = item.querySelector('.item__name').innerHTML;
//         inputEdit.focus();
//         itemToEdit = true;
//     }

//     function cleanModal() {
//         descriptionElement.innerHTML = '';
//         img.src = '';
//         document.querySelector('.input--edit').classList.add('hidden');
//     }
// }

// function modalConfirmation() {
//     //item to edit
//     if (itemToEdit) {
//         const newItemValue = document.querySelector('.input--edit').value;

//         if (itemList == 'shop') {
//             shoppingListArray[itemIndex].querySelector('.item__name').innerHTML = textCapitalization(newItemValue);
//             hideModal();
//             return;

//         } else {
//             PurchasedListArray[itemIndex].querySelector('.item__name').innerHTML = textCapitalization(newItemValue);
//             hideModal();
//             return;
//         }

//         //item or list to delete
//     } else {
//         //list delete
//         if (itemIndex == null && itemList == 'shop') {
//             if (!shoppingListArray.length == 0) {
//                 shoppingListArray.length = 0;
//             }
//             renderItems();
//             resetShopItems();
//             hideModal();
//             return;
//         }

//         if (itemIndex == null && itemList == 'purchased') {
//             if (!PurchasedListArray.length == 0) {
//                 PurchasedListArray.length = 0;
//             }
//             renderItems();
//             resetPurchasedItems();
//             hideModal();
//             return;
//         }

//         //item delete
//         if (itemIndex) {
//             //shopping
//             if (itemList == 'shop') {
//                 shoppingListArray.splice(itemIndex, 1);
//                 renderItems();
//                 resetShopItems();
//                 hideModal();
//                 return;

//                 //purchased
//             } else {
//                 PurchasedListArray.splice(itemIndex, 1);
//                 renderItems();
//                 resetPurchasedItems();
//                 hideModal();
//                 return;
//             }
//         }
//     }
// }

// //modal listeners
// document.querySelector('.modal-btn.modal-btn-confirm').addEventListener('click', modalConfirmation);
// document.querySelectorAll('[data-modal').forEach((closeModalButton) => {
//     closeModalButton.addEventListener('click', hideModal)
// })
// document.querySelector('.backdrop').addEventListener('click', function (event) {
//     if (this === event.target) {
//         hideModal();
//     }
// })



