import gameboard from "../modules/gameboard";

describe('Gameboard tests', () => {
    let newBoard;

    beforeEach(() => {
        newBoard = new gameboard();
    })

    it('place ship', () => {
        const testPlace = newBoard.placeShip(3, 0, 0);
        expect(testPlace.location).toEqual([[0,0],[1,0],[2,0]])
    })
})