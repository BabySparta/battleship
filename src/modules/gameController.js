import gameboard from "./gameboard";
import player from './player';
import ship from "./ship";

function playGame() {
    const user = new player('user');
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