import gameboard from "../modules/gameboard";

describe('Gameboard tests', () => {
    let newBoard;

    beforeEach(() => {
        newBoard = new gameboard();
    });
    
    // Place Ship
    it('place ship', () => {
        const testPlace = newBoard.placeShip(3, 0, 0, 'hori');
        expect(testPlace.location).toEqual([[0,0],[1,0],[2,0]])
    });

    it('place ship vert', () => {
        const testPlace = newBoard.placeShip(3, 0, 0, 'vert');
        expect(testPlace.location).toEqual([[0,0],[0,1],[0,2]])
    });

    it('gameboard has correct coords', () => {
        newBoard.placeShip(3, 0, 0, 'hori');
        const checkVal = () => {
        if (
        newBoard.board[0][0].hasShip &&
        newBoard.board[0][1].hasShip &&
        newBoard.board[0][2].hasShip &&
        !newBoard.board[0][3].hasShip
        ) return true;
        return false;
        }
        expect(checkVal()).toEqual(true);
    });

    it('vertical coords works', () => {
        newBoard.placeShip(3, 0, 0, 'vert');
        const checkVal = () => {
        if (
        newBoard.board[0][0].hasShip &&
        newBoard.board[1][0].hasShip &&
        newBoard.board[2][0].hasShip &&
        !newBoard.board[3][0].hasShip
        ) return true;
        return false;
        }
        expect(checkVal()).toEqual(true);
    });

    // Recieve Attacks
    it('recieve hit', () => {
        newBoard.placeShip(3, 0, 0, 'hori');
        expect(newBoard.recieveAttack(2, 0)).toEqual([[2,0]]);
    });

    it('recieve miss', () => {
        newBoard.placeShip(3, 0, 0, 'hori');
        expect(newBoard.recieveAttack(4, 0)).toEqual([[4,0]]);
    });
})