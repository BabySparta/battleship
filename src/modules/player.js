import gameboard from "./gameboard";
import AImove from "./AI";

class player {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.gameboard = new gameboard();
  }

  attack(x, y, enemyboard) {
    if (enemyboard.board[y][x].isHit) {
      return "You already shot there";
    } else {
      enemyboard.recieveAttack(x, y);
    }
  }

  autoAttack(enemyboard) {
    const AIplay = AImove(enemyboard);
    if (AIplay) return AIplay;
    const ranX = Math.round(Math.random() * 9);
    const ranY = Math.round(Math.random() * 9);
    if (enemyboard.board[ranY][ranX].isHit) {
      return false;
    } else {
      enemyboard.recieveAttack(ranX, ranY);
      return [ranX, ranY];
    }
  }
}

export default player;
