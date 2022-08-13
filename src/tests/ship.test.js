import ship from '../modules/ship';


describe('Ship tests', () => {
    let testShip;

    beforeEach(() => {
        testShip = new ship('test', [0,1,2]);
    })

    it('test hit', () => {
        testShip.hit(1);
        expect(testShip.hits).toEqual([1]);
    });

    it('test multiple hits', () => {
        testShip.hit(1);
        testShip.hit(2);
        expect(testShip.hits).toEqual([1, 2]);
    });

    it('test not sunk', () => {
        testShip.hit(1);
        expect(testShip.isSunk()).toEqual(false);
    });

    it('test sunk', () => {
        testShip.hit(1);
        testShip.hit(2);
        testShip.hit(0);
        expect(testShip.isSunk()).toEqual(true);
    });
});