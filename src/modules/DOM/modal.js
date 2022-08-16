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
let ship = 1;

function modalHoverEvents () {
    const cells = document.querySelectorAll('.modalCell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => addClassHover(cell));
        cell.addEventListener('mouseleave', () => removeClassHover(cell));
        cell.addEventListener('click', () => placeShipOnModal(cell));
    })
}

function addClassHover (cell) {
    if (cell.firstChild) {cell.classList.add('alreadyPlacedError'); return}
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
    if (cell.firstChild) cell.classList.remove('alreadyPlacedError')
}


function placeShipOnModal (cell) {
    if (ship === 1) {
        if (cell.firstChild) return;
        const carrier = document.createElement('img');
        carrier.classList.add('carrier');
        if (direction === 'vert') carrier.classList.add('vertical');
        carrier.src = './resources/carrier.png';
        cell.appendChild(carrier);
        removeClassHover(cell);
        ship++;
        return;
    }
    if (ship === 2) {
        if (cell.firstChild) return;
        const battleship = document.createElement('img');
        battleship.classList.add('battleship');
        if (direction === 'vert') battleship.classList.add('vertical');
        battleship.src = './resources/battleship.png';
        cell.appendChild(battleship);
        removeClassHover(cell);
        ship++;
        return;
    }
    if (ship === 3) {
        if (cell.firstChild) return;
        const cruiser = document.createElement('img');
        cruiser.classList.add('cruiser');
        if (direction === 'vert') cruiser.classList.add('vertical');
        cruiser.src = './resources/cruiser.png';
        cell.appendChild(cruiser);
        removeClassHover(cell);
        ship++;
        return;
    }
    if (ship === 4) {
        if (cell.firstChild) return;
        const submarine = document.createElement('img');
        submarine.classList.add('submarine');
        if (direction === 'vert') submarine.classList.add('vertical');
        submarine.src = './resources/submarine.png';
        cell.appendChild(submarine);
        removeClassHover(cell);
        ship++;
        return;
    }
    if (ship === 5) {
        if (cell.firstChild) return;
        const destroyer = document.createElement('img');
        destroyer.classList.add('destroyer');
        if (direction === 'vert') destroyer.classList.add('vertical');
        destroyer.src = './resources/destroyer.png';
        cell.appendChild(destroyer);
        removeClassHover(cell);
        ship++;
        return;
    }
}

export default initModal
