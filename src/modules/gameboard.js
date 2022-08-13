import ship from "./ship";

class gameboard {
    constructor() {
        this.board = this.initBoard();
    }
    initBoard() {
        let totalBoard = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let y = 0; y < 10; y++) {
                row.push({ isHit: false, hasShip: false})
            }
            totalBoard.push(row);
        }
        return totalBoard;
    }

    placeShip (length, x, y, dir = 'hori') {
        const fullLocation = [];
        for (let i = 0; i < length; i++) {
            if (dir = 'hori') {
                fullLocation.push([x + i, y]);
                this.board[x + i][y].hasShip = true;
            }
            else {
                fullLocation.push([x, y + i]);
                this.board[x][y + i].hasShip = true;
            }
        }
        return new ship('ship', fullLocation);
    }
}

export default gameboard;