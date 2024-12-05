export function formatDateObj(dateObj) {
    const day = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
    const date = dateObj.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const hours = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `${day} (${date}) às ${hours}`;
}