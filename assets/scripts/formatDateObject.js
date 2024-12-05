export function formatDateObject(dateObj) {
    // Pesquisar sobre o `Intl.DateTimeFormat`
    function formatDay(dateObj) {
        let day;
        switch (dateObj.getDay()) {
            case 0:
                day = "Domingo";
                break;
            case 1:
                day = "Segunda-feira";
                break;
            case 2:
                day = "Terça-feira";
                break;
            case 3:
                day = "Quarta-feira";
                break;
            case 4:
                day = "Quinta-feira";
                break;
            case 5:
                day = "Sexta-feira";
                break;
            case 6:
                day = "Sábado";
        }
        return day;
    }

    function formatDate(dateObj) {
        return `(${dateObj.getDate()}/${dateObj.getUTCMonth() + 1}/${dateObj.getFullYear()})`;
    }

    function formatHours(dateObj) {
        let hours;
        let minutes;

        hours = dateObj.getHours();
        minutes = dateObj.getMinutes();

        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }

        return `${hours}:${minutes}`;
    }

    return `${formatDay(dateObj)} ${formatDate(dateObj)} às ${formatHours(dateObj)}`;
}