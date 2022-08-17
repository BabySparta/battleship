import player from './player';
import { getShipLocations } from './DOM/modal';

function playGame() {

    // USER
    const user = new player('user');
    const shipLocations = getShipLocations();
    shipLocations.forEach(ship => {
        user.gameboard.placeShip(ship[3], ship[0], ship[1], ship[2]);
    })
    const oppBoard = document.querySelectorAll('.oppCell');
    oppBoard.forEach(cell => {
        cell.addEventListener('click', () => {
            const thisX = cell.getAttribute('data-x');
            const thisY = cell.getAttribute('data-y');
            user.attack(thisX, thisY, AI.gameboard);
            AI.autoAttack(user.gameboard);
            console.log(user.gameboard, AI.gameboard);
        })
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
}

const getRandomCoord = () => {
    return Math.floor(Math.random() * 10)
}
const getRandomDirection = () => {
    const randomNum = Math.round(Math.random());
    if (randomNum === 0) return 'hori';
    return 'vert';
}

export default playGame;