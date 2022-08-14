import gameboard from "./gameboard";

class player {
    constructor(name) {
        this.name = name;
        this.ships = [];
        this.gameboard = new gameboard();
    }

    attack (x, y, enemyboard) {
        if (enemyboard.board[y][x].isHit) {
            return 'You already shot there';
        } else {
            enemyboard.recieveAttack(x, y);
        }
    }

    autoAttack (enemyboard) {
        const ranX = Math.round(Math.random() * 7);
        const ranY = Math.round(Math.random() * 7);

        if (enemyboard.board[ranY][ranX].isHit) {
            autoAttack(enemyboard);
        } else {
            enemyboard.recieveAttack(ranX, ranY);
        }
    }
    
}

export default player;