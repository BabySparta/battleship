import ship from "./ship";

class gameboard {
    constructor() {
        this.board = this.#initBoard();
        this.missed = [];
        this.ships =[];
    }
    #initBoard() {
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
            let hitShip;
            for (let i = 0; i < this.ships.length; i++) {
                if (this.#isCoordInLocation(this.ships[i].location, [x,y])) hitShip = this.ships[i];
            }
            hitShip.hit([x,y]);
            this.board[y][x].isHit = true;
            return hitShip.hits;
        } else {
            this.missed.push([x, y]);
            this.board[y][x].isHit = true;
            return this.missed;
        }
    }

    allShipsSunk () {
        let allSunk = true;
        this.ships.forEach((boat) => {
            if (!boat.isSunk()) allSunk = false;
        })
        return allSunk;
    }

    #isCoordInLocation (arr, item) {
        const itemString = JSON.stringify(item);
 
        const contains = arr.some(function(ele){
          return JSON.stringify(ele) === itemString;
        });
        return contains;
    }
}

export default gameboard;