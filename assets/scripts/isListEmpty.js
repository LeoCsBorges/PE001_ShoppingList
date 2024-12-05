const listDescription = document.querySelector('.items-list__description');
const purchasedListDiv = document.querySelector('#purchased-list-div');

export function isListEmpty(shoppingListArray, purchasedListArray) {
    //validation: empty list or not
    if (shoppingListArray.length != 0) {
        listDescription.classList.add('hidden');
        purchasedListDiv.classList.remove('hidden');

    } else if (purchasedListArray.length != 0) {
        listDescription.classList.remove('hidden');
        purchasedListDiv.classList.remove('hidden');

    } else {
        listDescription.classList.remove('hidden');
        purchasedListDiv.classList.add('hidden');
    }
}