import { renderItems } from "./itemElement.js";
import { list, remove, edit } from "./itemStorage.js";

//modal listeners
document.querySelector('.modal-close-btn').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-cancel').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-confirm').addEventListener('click', modalConfirmation);
document.querySelector('.backdrop').addEventListener('click', function (event) {
    if (this === event.target) {
        hideModal();
    }
})

let modalFeature = '';
let itemIndex = '';

export function showModal(feature, description, imgSrc, index) {
    modalFeature = feature;
    itemIndex = index;

    document.querySelector('#modal').classList.add('is-open');
    document.querySelector('.modal-custom-content__description').innerHTML = description;
    document.querySelector('.modal-img').src = imgSrc;

    //edit modal
    if (feature == 'edit-item') {
        const input = document.querySelector('.input--edit');
        const items = list();

        input.classList.remove('hidden');
        input.value = items[index].title;
        input.focus();

        //delete modal
    } else {
        document.querySelector('.input--edit').classList.add('hidden');
    }
}

function hideModal() {
    document.querySelector('#modal').classList.remove('is-open');
    modalFeature = '';
    itemIndex = '';
}

function modalConfirmation() {
    switch (modalFeature) {
        case 'delete-shop-list':
            const shoppingItems = list().filter((item) => !item.checked);

            shoppingItems.forEach(function (item) {
                remove(list().indexOf(item));
            })

            renderItems();
            break;

        case 'delete-purchased-list':
            const purchasedItems = list().filter((item) => item.checked);

            purchasedItems.forEach(function (item) {
                remove(list().indexOf(item));
            })

            renderItems();
            break;

        case 'delete-item':
            remove(itemIndex);
            renderItems();
            break;

        case 'edit-item':
            const value = document.querySelector('.input--edit').value;
            edit(itemIndex, value);
            renderItems();
            break;

        default:
            console.log('feature not found!');
    }
    hideModal();
}