export function inputToolTip(element, content, theme) {
    //creating the html element that tippy will append to 
    const tooltip = document.createElement('div');
    tooltip.setAttribute('data-tippy-root', '');
    document.querySelector('main').appendChild(tooltip);

    //Tippy Object
    tippy(element, {
        content: content,
        trigger: 'focus',
        appendTo: tooltip,
        zIndex: 9999,
        arrow: true,
        animation: 'scale',
        theme: theme,
    });
    element.focus();

    //deleting the html element that tippy is append to after 2s
    setTimeout(function () {
        document.querySelector('main').removeChild(tooltip);
    }, 2000);
}