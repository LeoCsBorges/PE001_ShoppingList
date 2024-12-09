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

export function edit(index, newValue) {
    items[index].title = newValue;
}

export function remove(index) {
    items.splice(index, 1);
}

export function toggle(index) {
    items[index].checked = (items[index].checked == false) ? true : false;
}

export function toLocalStorage() {
    //convertando o array de items (obj) para jSON
    const itemsJSON = JSON.stringify(list());

    //salving on localstorage
    localStorage.clear();
    localStorage.setItem('items', itemsJSON);
}

export function fromLocalStorage() {
    //convertando o jSON para array de items (obj)
    const itemsObjects = JSON.parse(localStorage.getItem('items'));

    //preenche o array de items a partir do jSON recuperado no localstorage
    if (itemsObjects.lenght != 0) {
        let count = 0;
        for (let item of itemsObjects) {
            items[count] = item;
            count++;
        }
    }
}



