import { renderItems } from "./renderItems.js";


export function changeItemStatus(check) {
    check.addEventListener('change', function () {

        const item = getItem(this);
        const checkIndex = check.dataset.index;

        // SHOP > PURCHASED
        if (check.checked) {
            //deleting and adding elements and changing classes
            shoppingListArray.splice(checkIndex, 1);
            this.classList.replace('shop', 'purchased');
            this.nextSibling.classList.replace('shop', 'purchased');
            item.querySelector('.item__option--delete').classList.replace('shop', 'purchased');
            item.querySelector('.item__option--edit').classList.replace('shop', 'purchased');
            PurchasedListArray.push(item);

            //html dinamic elements
            renderItems();

            //reset index of all SHOP items
            // resetShopItems();

            //reset index of all PURCHASED items
            // resetPurchasedItems();

            //PURCHASED > SHOP
        } else {
            //deleting and adding elements and changing classes
            PurchasedListArray.splice(checkIndex, 1);
            this.classList.replace('purchased', 'shop');
            this.nextSibling.classList.replace('purchased', 'shop');
            item.querySelector('.item__option--delete').classList.replace('purchased', 'shop');
            shoppingListArray.push(item);

            //html dinamic elements
            renderItems();

            //reset index of all SHOP items
            // resetShopItems();

            //reset index of all PURCHASED items
            // resetPurchasedItems();
        }
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