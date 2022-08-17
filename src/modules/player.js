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
        const ranX = Math.round(Math.random() * 9);
        const ranY = Math.round(Math.random() * 9);

        if (enemyboard.board[ranY][ranX].isHit) {
            this.autoAttack(enemyboard);
        } else {
            enemyboard.recieveAttack(ranX, ranY);
        }
    }
    
}

export default player;