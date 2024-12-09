import { list } from "./itemStorage.js";

//modal listeners
document.querySelector('.modal-close-btn').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-cancel').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-confirm').addEventListener('click', modalConfirmation);
document.querySelector('.backdrop').addEventListener('click', function (event) {
    if (this === event.target) {
        hideModal();
    }
})

let moduleResolvePromise;
let moduleRejectPromise;

export function showModal(description, imgSrc, index, hasInput) {
    return new Promise((resolve, reject) => {
        moduleResolvePromise = resolve;
        moduleRejectPromise = reject;

        document.querySelector('#modal').classList.add('is-open');
        document.querySelector('.modal-custom-content__description').innerHTML = description;
        document.querySelector('.modal-img').src = imgSrc;

        //edit modal
        if (hasInput) {
            modalPosition(true);

            const input = document.querySelector('.input--edit');
            const items = list();

            input.classList.remove('hidden');
            input.value = items[index].title;
            input.focus();
        }
        //delete modal
        else {
            modalPosition(false);
            document.querySelector('.input--edit').classList.add('hidden');
        }
    })
}

function modalPosition(condition) {
    const windowWidth = window.innerWidth;

    if (condition && (windowWidth < 600)) {
        const modalPosition = document.querySelector('#modal .backdrop')
        modalPosition.style.alignItems = 'start';
        modalPosition.style.paddingTop = '2.5rem';
    }

    else {
        const modalPosition = document.querySelector('#modal .backdrop')
        modalPosition.style.alignItems = 'center';
        modalPosition.style.paddingTop = '0';
    }
}

function hideModal() {
    document.querySelector('#modal').classList.remove('is-open');
    moduleRejectPromise?.();

    moduleResolvePromise = null;
    moduleRejectPromise = null;
}

function modalConfirmation() {
    moduleResolvePromise?.();
    hideModal();
}