import ship from "./ship";

class gameboard {
    constructor() {
        this.board = this.initBoard();
        this.missed = [];
        this.ships =[];
    }
    initBoard() {
        let totalBoard = [];
        for (let y = 0; y < 10; y++) {
            let row = [];
            for (let x = 0; x < 10; x++) {
                row.push({ isHit: false, hasShip: false})
            }
            totalBoard.push(row);
        }
        return totalBoard;
    }

    placeShip (length, x, y, dir) {
        const fullLocation = [];
        for (let i = 0; i < length; i++) {
            if (dir === 'hori') {
                fullLocation.push([x + i, y]);
                this.board[y][x + i].hasShip = true;
            } 
            if (dir === 'vert') {
                fullLocation.push([x, y + i]);
                this.board[y + i][x].hasShip = true;
            }
        }
        const newShip = new ship('ship', fullLocation);
        this.ships.push(newShip);
        return newShip;
    }

    recieveAttack (x, y) {
        if (this.board[y][x].hasShip) {
            let shipIndex;
            for (let i = 0; i < this.ships.length; i++) {
                if (this.ships[i].location.includes([x,y])) {
                    shipIndex = i;
                }
            }
            //this.ships[shipIndex].hit([x,y]);
            return ([[1,2], 3].includes([1,2]));
        } else {
            this.missed.push([x, y]);
            return this.missed;
        }
    }

}

export default gameboard;