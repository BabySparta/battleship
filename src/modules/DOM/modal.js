import playGame from '../gameController';

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
    });
}

let direction = 'hori';
let ship = 1;
let shipLoc1;
let shipLoc2;
let shipLoc3;
let shipLoc4;
let shipLoc5;


function modalHoverEvents () {
    const cells = document.querySelectorAll('.modalCell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => addClassHover(cell));
        cell.addEventListener('mouseleave', () => removeClassHover(cell));
        cell.addEventListener('click', () => placeShipOnModal(cell));
    })
}

function addClassHover (cell) {
    if (ship === 6) return;
    if (cell.firstChild) {cell.classList.add('alreadyPlacedError'); return}
    const thisX = parseInt(cell.getAttribute('data-x'));
    const thisY = parseInt(cell.getAttribute('data-y'));
    let oneOver = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
    let twoOver = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
    let threeOver = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
    let fourOver = document.querySelector(`.modalCell[data-x="${thisX + 4}"][data-y="${thisY}"]`);
    if (direction === 'vert') {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 4}"]`);
    }
    let overArray = [cell, oneOver, twoOver, threeOver, fourOver];
    overArray = getCorrectLength(overArray);
    let allValid = true;
    overArray.forEach((over) => {
        if (!over) {allValid = false; return}
        if (over.classList.contains('occupied')) allValid = false;
    })
    if (!allValid) {cell.classList.add('placeError'); return}
    overArray.forEach((cellOver) => {
        cellOver.classList.add('placeHover');
    })
    
}

function removeClassHover (cell) {
    if (ship === 6) return;
    const thisX = parseInt(cell.getAttribute('data-x'));
    const thisY = parseInt(cell.getAttribute('data-y'));
    let oneOver = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
    let twoOver = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
    let threeOver = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
    let fourOver = document.querySelector(`.modalCell[data-x="${thisX + 4}"][data-y="${thisY}"]`);
    if (direction === 'vert') {
        oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
        twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
        fourOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 4}"]`);
    }
    let overArray = [cell, oneOver, twoOver, threeOver, fourOver];
    overArray = getCorrectLength(overArray);
    let allValid = true;
    let cellsOccipied = false
    overArray.forEach((over) => {
        if (!over) {allValid = false; return}
        if (over.classList.contains('occupied')) cellsOccipied = true;
    });
    if (!allValid) {cell.classList.remove('placeError'); return}
    if (cellsOccipied) cell.classList.remove('placeError');
    overArray.forEach((cellOver) => {
        cellOver.classList.remove('placeHover');
    });
    if (cell.firstChild) cell.classList.remove('alreadyPlacedError');
}

function getCorrectLength (arr) {
    if (ship === 1) {
        return arr;
    }
    if (ship === 2) {
        return arr.slice(0, 4);
    }
    if (ship === 3 || ship == 4) {
        return arr.slice(0, 3);
    }
    if (ship === 5) {
        return arr.slice(0, 2);
    }
}


function placeShipOnModal (cell) {
    if (ship === 1) {
        const thisX = parseInt(cell.getAttribute('data-x'));
        const thisY = parseInt(cell.getAttribute('data-y'));
        let oneOver  = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        let twoOver  = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        let threeOver  = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
        let fourOver  = document.querySelector(`.modalCell[data-x="${thisX + 4}"][data-y="${thisY}"]`);
        if (direction === 'vert') {
            oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
            twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
            threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
            fourOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 4}"]`);
        }
        if (!oneOver || !twoOver || !threeOver || !fourOver) return;
        const overArray = [cell, oneOver, twoOver, threeOver, fourOver];
        let isOccupied = false;
        overArray.forEach((over) => {
            if (over.classList.contains('occupied')) isOccupied = true;
        })
        if (isOccupied) return;
        const carrier = document.createElement('img');
        carrier.classList.add('carrier');
        if (direction === 'vert') carrier.classList.add('vertical');
        carrier.src = './resources/carrier.png';
        cell.appendChild(carrier);
        overArray.forEach((cellOver) => {
            cellOver.classList.add('occupied');
        })
        removeClassHover(cell);
        ship++;
        document.querySelector('.modalTitle').textContent = 'PLACE YOUR BATTLESHIP';
        shipLoc1 = [thisX, thisY, direction, 5];
        return; 
    }
    if (ship === 2) {
        const thisX = parseInt(cell.getAttribute('data-x'));
        const thisY = parseInt(cell.getAttribute('data-y'));
        let oneOver  = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        let twoOver  = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        let threeOver  = document.querySelector(`.modalCell[data-x="${thisX + 3}"][data-y="${thisY}"]`);
        if (direction === 'vert') {
            oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
            twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
            threeOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 3}"]`);
        }
        if (!oneOver || !twoOver || !threeOver) return;
        const overArray = [cell, oneOver, twoOver, threeOver];
        let isOccupied = false;
        overArray.forEach((over) => {
            if (over.classList.contains('occupied')) isOccupied = true;
        })
        if (isOccupied) return;
        const battleship = document.createElement('img');
        battleship.classList.add('battleship');
        if (direction === 'vert') battleship.classList.add('vertical');
        battleship.src = './resources/battleship.png';
        cell.appendChild(battleship);
        overArray.forEach((cellOver) => {
            cellOver.classList.add('occupied');
        })
        removeClassHover(cell);
        ship++;
        document.querySelector('.modalTitle').textContent = 'PLACE YOUR CRUISER';
        shipLoc2 = [thisX, thisY, direction, 4];
        return;
    }
    if (ship === 3) {
        const thisX = parseInt(cell.getAttribute('data-x'));
        const thisY = parseInt(cell.getAttribute('data-y'));
        let oneOver  = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        let twoOver  = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        if (direction === 'vert') {
            oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
            twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        }
        if (!oneOver || !twoOver) return;
        const overArray = [cell, oneOver, twoOver];
        let isOccupied = false;
        overArray.forEach((over) => {
            if (over.classList.contains('occupied')) isOccupied = true;
        })
        if (isOccupied) return;
        const cruiser = document.createElement('img');
        cruiser.classList.add('cruiser');
        if (direction === 'vert') cruiser.classList.add('vertical');
        cruiser.src = './resources/cruiser.png';
        cell.appendChild(cruiser);
        overArray.forEach((cellOver) => {
            cellOver.classList.add('occupied');
        })
        removeClassHover(cell);
        ship++;
        document.querySelector('.modalTitle').textContent = 'PLACE YOUR SUBMARINE';
        shipLoc3 = [thisX, thisY, direction, 3];
        return;
    }
    if (ship === 4) {
        const thisX = parseInt(cell.getAttribute('data-x'));
        const thisY = parseInt(cell.getAttribute('data-y'));
        let oneOver  = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        let twoOver  = document.querySelector(`.modalCell[data-x="${thisX + 2}"][data-y="${thisY}"]`);
        if (direction === 'vert') {
            oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
            twoOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 2}"]`);
        }
        if (!oneOver || !twoOver) return;
        const overArray = [cell, oneOver, twoOver];
        let isOccupied = false;
        overArray.forEach((over) => {
            if (over.classList.contains('occupied')) isOccupied = true;
        })
        if (isOccupied) return;
        const submarine = document.createElement('img');
        submarine.classList.add('submarine');
        if (direction === 'vert') submarine.classList.add('vertical');
        submarine.src = './resources/submarine.png';
        cell.appendChild(submarine);
        overArray.forEach((cellOver) => {
            cellOver.classList.add('occupied');
        })
        removeClassHover(cell);
        ship++;
        document.querySelector('.modalTitle').textContent = 'PLACE YOUR DESTROYER';
        shipLoc4 = [thisX, thisY, direction, 3];
        return;
    }
    if (ship === 5) {
        const thisX = parseInt(cell.getAttribute('data-x'));
        const thisY = parseInt(cell.getAttribute('data-y'));
        let oneOver  = document.querySelector(`.modalCell[data-x="${thisX + 1}"][data-y="${thisY}"]`);
        if (direction === 'vert') {
            oneOver = document.querySelector(`.modalCell[data-x="${thisX}"][data-y="${thisY + 1}"]`);
        }
        if (!oneOver) return;
        const overArray = [cell, oneOver];
        let isOccupied = false;
        overArray.forEach((over) => {
            if (over.classList.contains('occupied')) isOccupied = true;
        })
        if (isOccupied) return;
        const destroyer = document.createElement('img');
        destroyer.classList.add('destroyer');
        if (direction === 'vert') destroyer.classList.add('vertical');
        destroyer.src = './resources/destroyer.png';
        cell.appendChild(destroyer);
        overArray.forEach((cellOver) => {
            cellOver.classList.add('occupied');
        })
        removeClassHover(cell);
        ship++;
        shipLoc5 = [thisX, thisY, direction, 2];
        document.querySelector('.placeModal').style.display = 'none';
        playGame();
    }
}

function getShipLocations () {
    return [shipLoc1,shipLoc2,shipLoc3,shipLoc4,shipLoc5];
}

export {initModal, getShipLocations}

