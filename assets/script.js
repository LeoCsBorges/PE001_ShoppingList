
const inputField = document.getElementById('input');
const submitButton = document.getElementById('btn-submit');


submitButton.addEventListener('click', submitItem)

function submitItem(event) {
    event.preventDefault();

    const itemsList = document.querySelector('.items-list__items');

    itemsList.appendChild(createItem(inputField.value));
    inputField.value = '';
}

function capitalization(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function createItem(listItem) {
    const item = document.createElement('li');
    const itemWrapper = document.createElement('div');
    const itemInfo = document.createElement('div')
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const itemOptions = document.createElement('div');
    const deleteBtn = document.createElement('img');
    const editBtn = document.createElement('img');
    const timing = document.createElement('p');
    const date = new Date();


    //adding classes
    item.classList.add('items-list__item');
    itemWrapper.classList.add('item--wrapper');
    itemInfo.classList.add('item--info');
    checkbox.classList.add('checkbox');
    label.classList.add('item--name');
    itemOptions.classList.add('item--options');
    deleteBtn.classList.add('item--delete');
    editBtn.classList.add('item--edit');
    timing.classList.add('item--timing');


    //setting element structure
    item.append(itemWrapper, timing);
    itemWrapper.append(itemInfo, itemOptions);
    itemInfo.append(checkbox, label);
    itemOptions.append(deleteBtn, editBtn);


    //setting element data
    checkbox.setAttribute('id', 'checkbox03');
    checkbox.setAttribute('type', 'checkbox');
    label.setAttribute('for', 'checkbox03');
    label.innerHTML = capitalization(listItem);
    deleteBtn.setAttribute('src', 'assets/images/delete.svg');
    editBtn.setAttribute('src', 'assets/images/edit.svg');

    timing.innerHTML = `${date.getDay()} ${date.getDate()} às ${date.getHours()}:${date.getMinutes()}`;

    return item;
}