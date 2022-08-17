import player from './player';
import { getShipLocations } from './DOM/modal';

function playGame() {

    // USER
    const user = new player('user');
    const shipLocations = getShipLocations();
    shipLocations.forEach(ship => {
        user.gameboard.placeShip(ship[3], ship[0], ship[1], ship[2]);
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
    }

    // ATTACK

    const oppBoard = document.querySelectorAll('.oppCell');
    oppBoard.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.firstChild) return;
            const thisX = parseInt(cell.getAttribute('data-x'));
            const thisY = parseInt(cell.getAttribute('data-y'));
            const missLength = AI.gameboard.missed.length;
            user.attack(thisX, thisY, AI.gameboard);
            if (missLength < AI.gameboard.missed.length) placeMiss(cell);
            else placeHit(cell);
            AI.autoAttack(user.gameboard);
        })
    });
}

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

export default playGame;