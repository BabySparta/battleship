import player from "../modules/player";

describe('player tests', () => {
    let testPlayer;
    let testDummy;

    beforeEach(() => {
        testPlayer = new player('person');
        testDummy = new player('computer');
    });

    it('has name', () => {
        expect(testPlayer.name).toBe('person')
    });

    it('attacks other board', () => {
        testPlayer.attack(0, 0, testDummy.gameboard);
        expect(testDummy.gameboard.missed).toEqual([[0,0]])
    });

    it('hits other board', () => {
        testDummy.gameboard.placeShip(3,0,0,'hori');
        testPlayer.attack(0, 0, testDummy.gameboard);
        expect(testDummy.gameboard.ships[0].hits).toEqual([[0,0]])
    });

    it('does random attack', () => {
        testDummy.autoAttack(testPlayer.gameboard);
        expect(testPlayer.gameboard.missed).not.toEqual([])
    });

    it('doesnt shoot at previously shot spot', () => {
        testPlayer.attack(0, 0, testDummy.gameboard);
        expect(testPlayer.attack(0, 0, testDummy.gameboard)).toEqual('You already shot there')
    });
})