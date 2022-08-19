import gameboard from "../modules/gameboard";

describe("Gameboard tests", () => {
  let newBoard;

  beforeEach(() => {
    newBoard = new gameboard();
  });

  // Place Ship
  it("place ship", () => {
    const testPlace = newBoard.placeShip(3, 0, 0, "hori");
    expect(testPlace.location).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it("place ship vert", () => {
    const testPlace = newBoard.placeShip(3, 0, 0, "vert");
    expect(testPlace.location).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("wont ship out of board", () => {
    expect(newBoard.placeShip(3, 9, 0, "hori")).toEqual("Not a valid spot");
  });

  it("wont place ship on other ships", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    expect(newBoard.placeShip(2, 0, 0, "hori")).toEqual("Not a valid spot");
  });

  it("gameboard has correct coords", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    const checkVal = () => {
      if (
        newBoard.board[0][0].hasShip &&
        newBoard.board[0][1].hasShip &&
        newBoard.board[0][2].hasShip &&
        !newBoard.board[0][3].hasShip
      )
        return true;
      return false;
    };
    expect(checkVal()).toEqual(true);
  });

  it("vertical coords works", () => {
    newBoard.placeShip(3, 0, 0, "vert");
    const checkVal = () => {
      if (
        newBoard.board[0][0].hasShip &&
        newBoard.board[1][0].hasShip &&
        newBoard.board[2][0].hasShip &&
        !newBoard.board[3][0].hasShip
      )
        return true;
      return false;
    };
    expect(checkVal()).toEqual(true);
  });

  // Recieve Attacks
  it("recieve hit", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    expect(newBoard.recieveAttack(2, 0)).toEqual([[2, 0]]);
  });
  it("recieve multiple hits", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(2, 0);
    newBoard.recieveAttack(0, 0);
    expect(newBoard.ships[0].hits).toEqual([
      [0, 0],
      [2, 0],
    ]);
  });

  it("recieve miss", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    expect(newBoard.recieveAttack(4, 0)).toEqual([[4, 0]]);
  });

  it("recieve multiple misses", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(4, 0);
    expect(newBoard.recieveAttack(2, 1)).toEqual([
      [4, 0],
      [2, 1],
    ]);
  });

  // All Ships Sunk
  it("no ship sunk", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(0, 0);
    expect(newBoard.allShipsSunk()).toEqual(false);
  });

  it("one ship sunk", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(0, 0);
    newBoard.recieveAttack(1, 0);
    newBoard.recieveAttack(2, 0);
    expect(newBoard.allShipsSunk()).toEqual(true);
  });

  it("multiple ships sunk", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(0, 0);
    newBoard.recieveAttack(1, 0);
    newBoard.recieveAttack(2, 0);
    newBoard.placeShip(2, 1, 1, "hori");
    newBoard.recieveAttack(1, 1);
    newBoard.recieveAttack(2, 1);
    expect(newBoard.allShipsSunk()).toEqual(true);
  });

  it("only one ship sunk", () => {
    newBoard.placeShip(3, 0, 0, "hori");
    newBoard.recieveAttack(0, 0);
    newBoard.recieveAttack(1, 0);
    newBoard.recieveAttack(2, 0);
    newBoard.placeShip(2, 1, 1, "hori");
    expect(newBoard.allShipsSunk()).toEqual(false);
  });
});
