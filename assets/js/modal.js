//modal listeners
document.querySelector('.modal-close-btn').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-cancel').addEventListener('click', hideModal);
document.querySelector('.modal-btn.modal-btn-confirm').addEventListener('click', modalConfirmation);
document.querySelector('.backdrop').addEventListener('click', function (event) {
    if (this === event.target) {
        hideModal();
    }
})


export function showModal(content, imgSrc, index, input) {
    document.querySelector('#modal').classList.add('is-open');
    document.querySelector('.modal-custom-content__description').innerHTML = content;
    document.querySelector('.modal-img').src = imgSrc;

    //edit modal
    if (input) {
        document.querySelector('.input--edit').classList.remove('hidden');

        //delete modal
    } else {
        document.querySelector('.input--edit').classList.add('hidden');
    }
}

function hideModal() {
    document.querySelector('#modal').classList.remove('is-open');
}

function modalConfirmation() {
    console.log('clicou na confirmacao da modal')
}