const items = [];

export function createItemObject(name, date, boolean) {
    const item = {
        title: name,
        date: date,
        checked: boolean,
    }

    items.push(item);
}

export function list() {
    return [...items];
}

export function edit(editBtn) {
    editBtn.addEventListener('click', function () {
        const newItem = prompt('Digite o novo valor: ');
        const item = getItemNode(editBtn);
        const itemIndex = item.querySelector('.checkbox').dataset.index;
        items[itemIndex].title = newItem;
        renderItems();
    })
}

export function remove(index) {
    items.splice(index, 1);
    console.log(items)
}

export function toggle(checkbox) {
    items[checkbox.dataset.index].checked = (items[checkbox.dataset.index].checked == false) ? true : false;
}



