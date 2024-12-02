const inputField = document.getElementById('input');
const submitButton = document.getElementById('btn-submit');
const clearButton = document.getElementById('btn-clean');
const listDescription = document.querySelector('.items-list__description');
const shopList = document.querySelector('#shop-list');
const purchasedListDiv = document.querySelector('#purchased-list-div');
const purchasedList = document.querySelector('#purchased-list');
const itemsArray = Array.from(document.querySelectorAll('.item'));
const itemsPurchasedArray = Array.from(document.querySelectorAll('.item .purchased-item'));
const deleteShopListBtn = document.getElementById('delete-shop-btn');
const deletePurchasedListBtn = document.getElementById('delete-purchased-btn');
let itemIndex = null;
let itemList = null;
let itemToEdit = null;
let itemtoEditValue = null;


//buttons
isListEmpty();
clearButton.addEventListener('click', cleanInputItem);
submitButton.addEventListener('click', submitItem);
deleteShopListBtn.addEventListener('click', deleteShopList);
deletePurchasedListBtn.addEventListener('click', deletePurchasedList)

function isListEmpty() {
    //validation: empty list or not
    if (itemsArray.length != 0) {
        listDescription.classList.add('hidden');
        purchasedListDiv.classList.remove('hidden');

    } else if (itemsPurchasedArray.length != 0) {
        listDescription.classList.remove('hidden');
        purchasedListDiv.classList.remove('hidden');

    } else {
        listDescription.classList.remove('hidden');
        purchasedListDiv.classList.add('hidden');
    }
}

function cleanInputItem(event) {
    event.preventDefault();
    inputField.value = '';
    inputField.focus();
}

function submitItem(event) {
    event.preventDefault();

    //invalid input
    if (inputField.value.trim() === '' || inputField.value.length <= 2) {
        const tooltip = document.createElement('div');

        tooltip.setAttribute('data-tippy-root', null);
        document.querySelector('main').appendChild(tooltip);
        addTooltip(tooltip);
        setTimeout(function () {
            document.querySelector('main').removeChild(tooltip);
        }, 3000);
        return;
    }

    //create an new item
    createElement(inputField.value);
    renderItems();

    //input clean and focus
    inputField.value = '';
    inputField.focus();
}

function addTooltip(div) {
    // tippyjs
    tippy(inputField, {
        content: 'Ops... Campo inválido!',
        trigger: 'focus',
        appendTo: div,
        zIndex: 9999,
        arrow: true,
        animation: 'scale',
        theme: 'tomato',
    });
    inputField.focus();
}

function capitalization(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function createElement(listItem) {
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
    checkbox.setAttribute('id', `checkShop${itemsArray.length}`);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', `${itemsArray.length}`);
    label.setAttribute('for', `checkShop${itemsArray.length}`);
    label.setAttribute('id', `labelShop${itemsArray.length}`);
    label.setAttribute('data-index', `${itemsArray.length}`);
    label.innerHTML = capitalization(listItem);
    itemOption1.setAttribute('type', 'button');
    itemOption1.setAttribute('data-index', `${itemsArray.length}`);
    itemOption1.style.backgroundImage = "url('../assets/images/delete.svg')";
    itemOption2.setAttribute('type', 'button');
    itemOption2.style.backgroundImage = "url('../assets/images/edit.svg')";
    timing.innerHTML = formatTiming(date);

    //adding listeners
    changeItemStatus(checkbox);
    deleteItem(itemOption1);
    editItem(itemOption2);

    //adding the new item to the array of items
    itemsArray.push(item);
}

function renderItems() {
    //remove all shop items & fill within the array items
    while (shopList.firstChild) {
        shopList.removeChild(shopList.firstChild);
    }

    itemsArray.forEach(function (item) {
        shopList.appendChild(item);
    })

    //remove all purchased items & fill within the array purchased items
    while (purchasedList.firstChild) {
        purchasedList.removeChild(purchasedList.firstChild);
    }

    itemsPurchasedArray.forEach(function (item) {
        purchasedList.appendChild(item);
    })
    isListEmpty();
}

function formatTiming(date) {
    // Pesquisar sobre o `Intl.DateTimeFormat`
    function formatDay(date) {
        let day;
        switch (date.getDay()) {
            case 0:
                day = "Domingo";
                break;
            case 1:
                day = "Segunda-feira";
                break;
            case 2:
                day = "Terça-feira";
                break;
            case 3:
                day = "Quarta-feira";
                break;
            case 4:
                day = "Quinta-feira";
                break;
            case 5:
                day = "Sexta-feira";
                break;
            case 6:
                day = "Sábado";
        }
        return day;
    }

    function formatDate(date) {
        return `(${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()})`;
    }

    function formatHours(date) {
        let hours;
        let minutes;

        hours = date.getHours();
        minutes = date.getMinutes();

        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }

        return `${hours}:${minutes}`;
    }

    return `${formatDay(date)} ${formatDate(date)} às ${formatHours(date)}`;
}

function changeItemStatus(check) {
    check.addEventListener('change', function () {

        const item = getItem(this);
        const checkIndex = check.dataset.index;

        // SHOP > PURCHASED
        if (check.checked) {
            //deleting and adding elements and changing classes
            itemsArray.splice(checkIndex, 1);
            this.classList.replace('shop', 'purchased');
            this.nextSibling.classList.replace('shop', 'purchased');
            item.querySelector('.item__option--delete').classList.replace('shop', 'purchased');
            item.querySelector('.item__option--edit').classList.replace('shop', 'purchased');
            itemsPurchasedArray.push(item);

            //html dinamic elements
            renderItems();
            isListEmpty();

            //reset index of all SHOP items
            resetShopItems();

            //reset index of all PURCHASED items
            resetPurchasedItems();

            //PURCHASED > SHOP
        } else {
            //deleting and adding elements and changing classes
            itemsPurchasedArray.splice(checkIndex, 1);
            this.classList.replace('purchased', 'shop');
            this.nextSibling.classList.replace('purchased', 'shop');
            item.querySelector('.item__option--delete').classList.replace('purchased', 'shop');
            itemsArray.push(item);

            //html dinamic elements
            renderItems();
            isListEmpty();

            //reset index of all SHOP items
            resetShopItems();

            //reset index of all PURCHASED items
            resetPurchasedItems();
        }
    })
}

function deleteShopList() {
    const description = 'Deseja apagar toda a lista? Esse processo não pode ser desfeito.'
    const list = 'shop'
    showModal(description, null, list, true);
}

function deletePurchasedList() {
    const description = 'Deseja apagar toda a lista? Esse processo não pode ser desfeito.'
    const list = 'purchased'
    showModal(description, null, list, true);
}

function deleteItem(btnDelete) {
    btnDelete.addEventListener('click', async function () {
        const description = 'Deletar este item da lista? Esse processo não pode ser desfeito.'
        const itemIndex = this.dataset.index;
        let list = this.classList.contains('shop') ? 'shop' : 'purchased';

        showModal(description, itemIndex, list, true);
    })
}

function editItem(btnEdit) {
    btnEdit.addEventListener('click', function () {
        const item = getItem(this);
        const description = 'Digite a alteração que deseja fazer no item:';
        let list = this.classList.contains('shop') ? 'shop' : 'purchased';

        showModal(description, item, list, false);
    })
}

function getItem(element) {
    let item;
    while (element.parentElement) {
        item = element.parentElement;
        element = element.parentElement;

        if (element.classList.contains('item')) { break; }
    }
    return item;
}

function resetShopItems() {
    const allCheckboxesShop = document.querySelectorAll('.checkbox.shop');
    const allLabelsShop = document.querySelectorAll('.item__name.shop');
    const allDeleteButtonsShop = document.querySelectorAll('.item__option--delete.shop');

    for (cont = 0; cont < itemsArray.length; cont++) {
        allCheckboxesShop[cont].setAttribute('id', `checkShop${cont}`);
        allCheckboxesShop[cont].dataset.index = `${cont}`;
        allLabelsShop[cont].setAttribute('for', `checkShop${cont}`);
        allLabelsShop[cont].setAttribute('id', `labelShop${cont}`);
        allLabelsShop[cont].dataset.index = `${cont}`;
        allDeleteButtonsShop[cont].dataset.index = `${cont}`;
    }
}

function resetPurchasedItems() {
    const allCheckboxesPurchased = document.querySelectorAll('.checkbox.purchased');
    const allLabelspurchased = document.querySelectorAll('.item__name.purchased');
    const allDeleteButtonsPurchased = document.querySelectorAll('.item__option--delete.purchased');

    for (cont = 0; cont < itemsPurchasedArray.length; cont++) {
        allCheckboxesPurchased[cont].setAttribute('id', `checkPurchased${cont}`);
        allCheckboxesPurchased[cont].dataset.index = `${cont}`;
        allLabelspurchased[cont].setAttribute('for', `checkPurchased${cont}`);
        allLabelspurchased[cont].setAttribute('id', `labelPurchased${cont}`);
        allLabelspurchased[cont].dataset.index = `${cont}`;
        allDeleteButtonsPurchased[cont].dataset.index = `${cont}`;
    }
}

//modal hide after a confirmation
function hideModal() {
    document.getElementById('modal').classList.remove('is-open');

    //clear all items/list
    itemIndex = null;
    itemList = null;
    itemToEdit = null;
    itemtoEditValue = null;
}

//open modal in accordance with the feature
function showModal(description, item, list, isDelete) {
    const modal = document.getElementById('modal');
    const descriptionElement = document.querySelector('.modal-custom-content__description');
    const inputEdit = document.querySelector('.input--edit');
    let img = document.querySelector('#modal img');

    cleanModal();
    modal.classList.add('is-open');
    descriptionElement.innerHTML = description;
    itemIndex = item;
    itemList = list;

    //deleting modal
    if (isDelete) {
        const backdropElement = document.querySelector('.backdrop');
        backdropElement.style.alignItems = 'center';
        backdropElement.style.paddingTop = '0';
        img.src = '../assets/images/delete-modal.png';

        //editing modal
    } else {
        const backdropElement = document.querySelector('.backdrop');
        backdropElement.style.alignItems = 'start';
        backdropElement.style.paddingTop = '2.5rem';
        img.src = '../assets/images/edit-modal.png';
        inputEdit.classList.remove('hidden');
        itemIndex = item.querySelector('.item__name').dataset.index;
        inputEdit.value = item.querySelector('.item__name').innerHTML;
        inputEdit.focus();
        itemToEdit = true;
    }

    function cleanModal() {
        description.innerHTML = '';
        img.src = '';
        document.querySelector('.input--edit').classList.add('hidden');
    }
}

function modalConfirmation() {
    //item to edit
    if (itemToEdit) {
        const newItemValue = document.querySelector('.input--edit').value;

        if (itemList == 'shop') {
            itemsArray[itemIndex].querySelector('.item__name').innerHTML = newItemValue;
            hideModal();
            return;

        } else {
            itemsPurchasedArray[itemIndex].querySelector('.item__name').innerHTML = newItemValue;
            hideModal();
            return;
        }

        //item or list to delete
    } else {
        //list delete
        if (itemIndex == null && itemList == 'shop') {
            if (!itemsArray.length == 0) {
                itemsArray.length = 0;
            }
            renderItems();
            resetShopItems();
            hideModal();
            return;
        }

        if (itemIndex == null && itemList == 'purchased') {
            if (!itemsPurchasedArray.length == 0) {
                itemsPurchasedArray.length = 0;
            }
            renderItems();
            resetPurchasedItems();
            hideModal();
            return;
        }

        //item delete
        if (itemIndex) {
            //shopping
            if (itemList == 'shop') {
                itemsArray.splice(itemIndex, 1);
                renderItems();
                resetShopItems();
                hideModal();
                return;

                //purchased
            } else {
                itemsPurchasedArray.splice(itemIndex, 1);
                renderItems();
                resetPurchasedItems();
                hideModal();
                return;
            }
        }
    }
}

//modal listeners
document.querySelector('.modal-btn.modal-btn-confirm').addEventListener('click', modalConfirmation);
document.querySelectorAll('[data-modal').forEach((closeModalButton) => {
    closeModalButton.addEventListener('click', hideModal)
})
document.querySelector('.backdrop').addEventListener('click', function (event) {
    if (this === event.target) {
        hideModal();
    }
})



