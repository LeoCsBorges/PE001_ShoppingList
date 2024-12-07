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



