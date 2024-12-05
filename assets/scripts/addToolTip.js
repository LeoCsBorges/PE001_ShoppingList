const inputField = document.getElementById('input');

export function addTooltip(div) {
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