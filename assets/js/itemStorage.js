const items = [];


export function list() {
    return [...items];
}

export function createItemObject(name, date, boolean) {
    const item = {
        title: name,
        date: date,
        checked: boolean,
    }

    items.push(item);
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

export function remove(deleteBtn) {
    deleteBtn.addEventListener('click', function () {
        items.splice(this.dataset.index, 1);
        renderItems();
    })
}

export function toogle(checkbox) {
    checkbox.addEventListener('change', function () {
        items[this.dataset.index].checked = (items[this.dataset.index].checked == false) ? true : false;;
        renderItems();
    })
}



