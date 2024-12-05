import { toggle, list } from "./itemStorage.js";
import { isListEmpty } from "./validations.js";
import { showModal } from "./modal.js";


export function renderItems() {
    //remove all html elements from the lists
    const shopList = document.querySelector('#shop-list');
    const purchasedList = document.querySelector('#purchased-list');
    shopList.innerHTML = '';
    purchasedList.innerHTML = '';

    //fill the lists with html elements
    const shoppingItems = list().filter((item) => !item.checked);
    const purchasedItems = list().filter((item) => item.checked);

    shoppingItems.forEach(function (item) {
        const itemHtmlElement = createItemHtmlElement(item);
        shopList.appendChild(itemHtmlElement);
    })

    purchasedItems.forEach(function (item) {
        const itemHtmlElement = createItemHtmlElement(item);
        itemHtmlElement.querySelector('.checkbox').setAttribute('checked', 'true');
        purchasedList.appendChild(itemHtmlElement);
    })

    isListEmpty();
}

export function deleteList(deleteListButton) {
    const feature = (deleteListButton.id == 'delete-shop-btn') ? 'delete-shop-list' : 'delete-purchased-list';
    const description = (deleteListButton.id == 'delete-shop-btn') ? 'Apagar a Lista de Compras? Esse processo não pode ser desfeito.' : 'Apagar a Lista de Comprados? Esse processo não pode ser desfeito.';
    const imgSrc = '../assets/images/delete-list-modal.png';
    const itemIndex = null;

    showModal(feature, description, imgSrc, itemIndex);
}

function addRemoveListener(deleteButton) {
    deleteButton.addEventListener('click', function () {
        const feature = 'delete-item';
        const description = 'Deletar este item da lista? Esse processo não pode ser desfeito.';
        const imgSrc = '../assets/images/delete-modal.png';
        const itemIndex = this.dataset.index;

        showModal(feature, description, imgSrc, itemIndex);
    })
}

function addEditListener(editButton) {
    editButton.addEventListener('click', function () {
        const feature = 'edit-item';
        const description = 'Digite a alteração que deseja fazer no item:';
        const imgSrc = '../assets/images/edit-modal.png';
        const itemParent = getItemNode(this);
        const itemIndex = itemParent.querySelector('.checkbox').dataset.index;

        showModal(feature, description, imgSrc, itemIndex);
    })
}

function addToggleListener(checkbox) {
    checkbox.addEventListener('change', function () {
        toggle(checkbox);
        renderItems();
    })
}

function createItemHtmlElement(itemObject) {
    const item = document.createElement('li');
    const itemWrapper = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const itemOptions = document.createElement('div');
    const itemOption1 = document.createElement('button');
    const itemOption2 = document.createElement('button');
    const timing = document.createElement('p');

    //adding classes
    item.classList.add('item');
    itemWrapper.classList.add('item__wrapper');
    label.classList.add('item__info');
    checkbox.classList.add('checkbox');
    span.classList.add('item__name');
    itemOptions.classList.add('item__options');
    itemOption1.classList.add('item__option', 'item__option--delete');
    itemOption2.classList.add('item__option', 'item__option--edit');
    timing.classList.add('item__timing');

    //setting element data
    const index = list().indexOf(itemObject);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', `${index}`);
    span.setAttribute('data-index', `${index}`);
    span.innerHTML = itemObject.title;
    itemOption1.setAttribute('type', 'button');
    itemOption1.setAttribute('data-index', `${index}`);
    itemOption1.style.backgroundImage = "url('../assets/images/delete.svg')";
    itemOption2.setAttribute('type', 'button');
    itemOption2.style.backgroundImage = "url('../assets/images/edit.svg')";
    timing.innerHTML = itemObject.date;

    //setting element structure
    item.append(itemWrapper, timing);
    itemWrapper.append(label, itemOptions);
    label.append(checkbox, span);
    itemOptions.append(itemOption1, itemOption2);

    //adding buttons listeners
    addToggleListener(checkbox);
    addRemoveListener(itemOption1);
    addEditListener(itemOption2);

    //returning the html item element
    return item;
}

function getItemNode(element) {
    let item;
    while (element.parentElement) {
        item = element.parentElement;
        element = element.parentElement;

        if (element.classList.contains('item')) { break; }
    }
    return item;
}


