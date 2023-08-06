export const domAdd = (father) => {
    const div = document.createElement('div');
    father.appendChild(div);
    return div;
}