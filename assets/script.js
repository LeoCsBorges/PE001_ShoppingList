const inputField = document.getElementById('input');
const submitButton = document.getElementById('btn-submit');
const clearButton = document.getElementById('btn-clean');
const listDescription = document.querySelector('.items-list__description');
const shopList = document.querySelector('#shop-list');
const purchasedListDiv = document.querySelector('#purchased-list-div');
const purchasedList = document.querySelector('#purchased-list');
const itemsArray = Array.from(document.querySelectorAll('.item'));
const itemsPurchasedArray = Array.from(document.querySelectorAll('.item .purchased-item'));


isListEmpty();
clearButton.addEventListener('click', cleanItem);
submitButton.addEventListener('click', submitItem)

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

function cleanItem(event) {
    event.preventDefault();
    inputField.value = '';
    inputField.focus();
}

function submitItem(event) {
    event.preventDefault();
    const itemsList = document.querySelector('.items-list__items');

    //input without any value
    if (inputField.value == '') {
        alert('Ops!... Por favor, preencha para adicionar o item à lista!');
        inputField.focus();
        return
    }

    //create an new item
    createElement(inputField.value);
    renderItems();


    //creating an item and adding it to items array
    inputField.value = '';
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
    const deleteBtn = document.createElement('img');
    const editBtn = document.createElement('img');
    const timing = document.createElement('p');
    const date = new Date();

    //adding classes
    item.classList.add('item');
    item.setAttribute('data-index', itemsArray.length);
    itemWrapper.classList.add('item__wrapper');
    itemInfo.classList.add('item__info');
    checkbox.classList.add('checkbox');
    label.classList.add('item__name');
    itemOptions.classList.add('item__options');
    itemOption1.classList.add('item__option', 'item__option--delete');
    itemOption2.classList.add('item__option', 'item__option--edit');
    timing.classList.add('item__timing');

    //setting element structure
    item.append(itemWrapper, timing);
    itemWrapper.append(itemInfo, itemOptions);
    itemInfo.append(checkbox, label);
    itemOptions.append(itemOption1, itemOption2);
    itemOption1.append(deleteBtn);
    itemOption2.append(editBtn);

    //setting element data
    checkbox.setAttribute('id', `checkbox${itemsArray.length}`);
    checkbox.setAttribute('type', 'checkbox');
    label.setAttribute('for', `checkbox${itemsArray.length}`);
    label.setAttribute('id', `label${itemsArray.length}`);
    label.innerHTML = capitalization(listItem);
    itemOption1.setAttribute('type', 'button');
    itemOption2.setAttribute('type', 'button');
    deleteBtn.setAttribute('src', 'assets/images/delete.svg');
    deleteBtn.setAttribute('alt', 'Deletar');
    editBtn.setAttribute('src', 'assets/images/edit.svg');
    editBtn.setAttribute('alt', 'Editar');
    timing.innerHTML = formatTiming(date);


    //adding listeners
    buyItemCheck(checkbox);
    buyItemLabel(label);


    //adding the new item to the array of items
    itemsArray.push(item);
    return;
}

function renderItems() {
    itemsArray.forEach(function (item) {
        shopList.appendChild(item);
    })

    itemsPurchasedArray.forEach(function (item) {
        purchasedList.appendChild(item);
    })
    isListEmpty();
}

function formatTiming(date) {
    return `${formatDay(date)} ${formatDate(date)} às ${formatHours(date)}`;

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
}

function buyItemCheck(check) {
    check.addEventListener('click', function () {
        const parentItem = getParentItem(this)

        console.log(itemsArray[check])

        itemsArray.splice(1, 1);
        console.log(itemsArray)
        itemsPurchasedArray.push(parentItem);
        console.log(itemsPurchasedArray)

        shopList.removeChild(parentItem);
        purchasedList.appendChild(parentItem);
        isListEmpty();
    })
}


function buyItemLabel(label) {
    label.addEventListener('click', function () {
        this.classList.add('purchased-item');
        const parent = getParentItem(this);
        itemsArray.splice(parent.dataset.index, 1)
    })
}

function deleteItem() {

}

function editItem() {

}

function getParentItem(element) {
    const lastParents = [];
    while (element.parentElement) {
        lastParents.push(element.parentElement);
        element = element.parentElement;
    }
    return lastParents[2];
}

