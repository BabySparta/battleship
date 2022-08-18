import player from './player';
import { getShipLocations } from './DOM/modal';

function playGame() {

    // USER
    const user = new player('user');
    const shipLocations = getShipLocations();
    shipLocations.forEach(ship => {
        user.gameboard.placeShip(ship[3], ship[0], ship[1], ship[2]);
        placeOnDOM(user.gameboard.ships.slice(-1)[0], shipLocations.indexOf(ship), 'userCell');
    })

    // AI 
    const AI = new player('AI');
    let shipLength = 5;
    while (AI.gameboard.ships.length !== 5) {
        const ranX = getRandomCoord();
        const ranY = getRandomCoord();
        const ranDir = getRandomDirection();

        if (AI.gameboard.ships.length === 1) shipLength = 4;
        if (AI.gameboard.ships.length === 2) shipLength = 3;
        if (AI.gameboard.ships.length === 3) shipLength = 3;
        if (AI.gameboard.ships.length === 4) shipLength = 2;
        
        AI.gameboard.placeShip(shipLength, ranX, ranY, ranDir);
    };
    AI.gameboard.ships.forEach(ship => {
        placeOnDOM(ship, AI.gameboard.ships.indexOf(ship), 'oppCell');
    })

    // ATTACK

    const oppBoard = document.querySelectorAll('.oppCell');
    oppBoard.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.lastChild && (cell.lastChild.classList.contains('hit') || cell.lastChild.classList.contains('miss'))) return;
            const thisX = parseInt(cell.getAttribute('data-x'));
            const thisY = parseInt(cell.getAttribute('data-y'));

            // Place User shot on DOM
            const missLength = AI.gameboard.missed.length;
            user.attack(thisX, thisY, AI.gameboard);
            if (missLength < AI.gameboard.missed.length) placeMiss(cell);
            else {
                placeHit(cell);
                AI.gameboard.ships.forEach(ship => {
                    if (ship.isSunk()) displaySunkShip(ship);
                });
                if (AI.gameboard.allShipsSunk()) {
                    document.querySelector('.endModal').style.display = 'flex';
                    document.querySelector('.whoWon').textContent = 'CONGRATULATIONS. YOU SUNK ALL ENEMY SHIPS AND WON THE BATTLE!';
                    return;
                }
            }

            // Place AI shot on DOM
            const AImiss = user.gameboard.missed.length;
            let AIattack = AI.autoAttack(user.gameboard);
            while (!AIattack) AIattack = AI.autoAttack(user.gameboard);
            const AIcell = document.querySelector(`.userCell[data-x="${AIattack[0]}"][data-y="${AIattack[1]}"]`);
            if (AImiss < user.gameboard.missed.length) placeMiss(AIcell);
            else {
                placeHit(AIcell);
                if (user.gameboard.allShipsSunk()) {
                    document.querySelector('.endModal').style.display = 'flex';
                    document.querySelector('.whoWon').textContent = 'ARGHH! THE ENEMY HAS SUNK ALL YOUR SHIPS AND YOU HAVE TO RETREAT. REGROUP AND TRY AGAIN.'
                }
            }

            // Add new game event listener
            document.querySelector('.playAgain').addEventListener('click', () => {
                location.reload();
            })
        });
    });
}

// Get random values for AI attack
const getRandomCoord = () => {
    return Math.floor(Math.random() * 10)
}
const getRandomDirection = () => {
    const randomNum = Math.round(Math.random());
    if (randomNum === 0) return 'hori';
    return 'vert';
}
// Place attack markers
const placeMiss = (cell) => {
    const missIcon = document.createElement('div');
    missIcon.classList.add('miss');
    cell.appendChild(missIcon);
}
const placeHit = (cell) => {
    const hitIcon = document.createElement('div');
    hitIcon.classList.add('hit');
    cell.appendChild(hitIcon);
}

// Place ships on board

const placeOnDOM = (ship, index, cellType) => {
    const startX = ship.location[0][0];
    const startY = ship.location[0][1];
    const direction = getDirection(ship);
    const origin = document.querySelector(`.${cellType}[data-x="${startX}"][data-y="${startY}"]`);
    const shipImg = document.createElement('img');
    if (direction === 'vert') shipImg.classList.add('vertical');
    shipImg.classList.add('playerShip');
    if (index === 0) {
        shipImg.classList.add('carrier');
        shipImg.classList.add('oppShip');
        shipImg.src = './resources/carrier.png';
    } if (index === 1) {
        shipImg.classList.add('battleship');
        shipImg.classList.add('oppShip');
        shipImg.src = './resources/battleship.png';
    } if (index === 2) {
        shipImg.classList.add('cruiser');
        shipImg.classList.add('oppShip');
        shipImg.src = './resources/cruiser.png';
    } if (index === 3) {
        shipImg.classList.add('submarine');
        shipImg.classList.add('oppShip');
        shipImg.src = './resources/submarine.png';
    } if (index === 4) {
        shipImg.classList.add('destroyer');
        shipImg.classList.add('oppShip');
        shipImg.src = './resources/destroyer.png';
    }
    origin.appendChild(shipImg);
    if (cellType === 'oppCell') shipImg.style.opacity = 0;
}

const getDirection = (ship) => {
    if (ship.location[0][0] === ship.location[1][0]) return 'vert';
    return 'hori';
}

// Show sunk ships

const displaySunkShip = (ship) => {
    const sunkX = ship.location[0][0];
    const sunkY = ship.location[0][1];

    const cellWithShip = document.querySelector(`.oppCell[data-x="${sunkX}"][data-y="${sunkY}"]`);
    cellWithShip.firstChild.style.opacity = 0.8;
}

export default playGame;