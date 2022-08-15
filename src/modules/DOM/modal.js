const initModal = () => {
    modalHoverEvents('hori');
    const axisBtn = document.querySelector('.changeAxis');

    axisBtn.addEventListener('click', () => {
        if (axisBtn.textContent.charAt(6) === 'X') {
            axisBtn.textContent = 'AXIS: Y';
            direction = 'vert';
        } else {
            axisBtn.textContent = 'AXIS: X';
            direction = 'hori';
        }
    })
}

let direction = 'hori';

function modalHoverEvents (dir) {
    const cells = document.querySelectorAll('.modalCell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => addClassHover(cell));
        cell.addEventListener('mouseleave', () => removeClassHover(cell));
    })
}

function addClassHover (cell) {
    const thisX = parseInt(cell.getAttribute('data-x'));
    const thisY = parseInt(cell.getAttribute('data-y'));
    let oneOver;
    let twoOver;
    let threeOver;
    let fourOver;
    if (direction === 'vert') {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 4}"]`);
    } else {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX + 4}"][data-y="${thisY}"]`);
    }

    if (!oneOver || !twoOver || !threeOver || !fourOver) {cell.classList.add('placeError'); return}
    cell.classList.add('placeHover');
    oneOver.classList.add('placeHover');
    twoOver.classList.add('placeHover');
    threeOver.classList.add('placeHover');
    fourOver.classList.add('placeHover');
}

function removeClassHover (cell) {
    const thisX = parseInt(cell.getAttribute('data-x'));
    const thisY = parseInt(cell.getAttribute('data-y'));
    let oneOver;
    let twoOver;
    let threeOver;
    let fourOver
    if (direction === 'vert') {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 4}"]`);
    } else {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX + 4}"][data-y="${thisY}"]`);
    }
    if (!oneOver || !twoOver || !threeOver || !fourOver) {cell.classList.remove('placeError'); return}
    cell.classList.remove('placeHover');
    oneOver.classList.remove('placeHover');
    twoOver.classList.remove('placeHover');
    threeOver.classList.remove('placeHover');
    fourOver.classList.remove('placeHover');
}

export default initModal
