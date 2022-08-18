function AImove (gameboard) {
    let allHits = [];
    gameboard.ships.forEach(ship => {
        if (!ship.isSunk()) {
        ship.hits.forEach(hit => {
            allHits.push(hit);
        })
    }});

    if (allHits.length < 1) return;

    const validSpots = [];
    allHits.forEach(hit => {
        if (hasOpenSpace(hit, gameboard)) validSpots.push(hit);
    })

    let firstHit = validSpots[0];
    console.log(firstHit);
    /* const smartAttack = findShips(firstHit, gameboard);
    if (smartAttack) return smartAttack; */
    if (firstHit[1] + 1 < 10 && !gameboard.board[firstHit[1] + 1][firstHit[0]].isHit) {gameboard.recieveAttack(firstHit[0], firstHit[1] + 1); return [firstHit[0], firstHit[1] + 1]}
    else if (firstHit[0] + 1 < 10 && !gameboard.board[firstHit[1]][firstHit[0] + 1].isHit) {gameboard.recieveAttack(firstHit[0] + 1, firstHit[1]); return [firstHit[0] + 1, firstHit[1]]}
    else if (firstHit[1] - 1 >= 0 && !gameboard.board[firstHit[1] - 1][firstHit[0]].isHit) {gameboard.recieveAttack(firstHit[0], firstHit[1] - 1); return [firstHit[0], firstHit[1] - 1]}
    else if (firstHit[0] - 1 >= 0 && !gameboard.board[firstHit[1]][firstHit[0] - 1].isHit) {gameboard.recieveAttack(firstHit[0] - 1, firstHit[1]); return [firstHit[0] - 1, firstHit[1]]}
}

const hasOpenSpace = (shot, gameboard) => {
    if ((shot[1] + 1 < 10 && !gameboard.board[shot[1] + 1][shot[0]].isHit) ||
        (shot[0] + 1 < 10 && !gameboard.board[shot[1]][shot[0] + 1].isHit) ||
        (shot[1] - 1 >= 0 && !gameboard.board[shot[1] - 1][shot[0]].isHit) ||
        (shot[0] - 1 >= 0 && !gameboard.board[shot[1]][shot[0] - 1].isHit)) {
            return true;
    }
    return false;
}

const findShips = (shot, gameboard) => {
    // Vertical Ship
/*     if ((gameboard.board[shot[1]][shot[0]].isHit && gameboard.board[shot[1]][shot[0]].hasShip) &&
        (gameboard.board[shot[1] + 1][shot[0]].isHit && gameboard.board[shot[1] + 1][shot[0]].hasShip) && 
        (!gameboard.board[shot[1] + 2][shot[0]].isHit)) {
            shot[1] = shot[1] + 2;
    }
    if ((gameboard.board[shot[1]][shot[0]].isHit && gameboard.board[shot[1]][shot[0]].hasShip) &&
        (gameboard.board[shot[1] - 1][shot[0]].isHit && gameboard.board[shot[1] - 1][shot[0]].hasShip) &&
        (!gameboard.board[shot[1] + 1 ][shot[0]].isHit)) {
         shot[1] = shot[1] + 1;
    } */
    
    // Horizontal Ship
    if (shot[0] + 1 < 10 && gameboard.board[shot[1]][shot[0] + 1].isHit && gameboard.board[shot[1]][shot[0] + 1].hasShip) {
        if (shot[0] + 2 < 10 && shot[0] - 1 >= 0 && gameboard.board[shot[1]][shot[0] + 2].isHit) {
            gameboard.recieveAttack(shot[0] - 1, shot[1]); return [shot[0] - 1, shot[1]];
        }
        gameboard.recieveAttack(shot[0] + 2, shot[1]); return [shot[0] + 2, shot[1]];
    }
    if (gameboard.board[shot[1]][shot[0] - 1] && gameboard.board[shot[1]][shot[0] - 1].isHit && gameboard.board[shot[1]][shot[0] - 1].hasShip) {
        if (shot[0] + 1 < 10 && shot[0] + 2 < 10 && gameboard.board[shot[1]][shot[0] + 1].isHit) {
            gameboard.recieveAttack(shot[0] + 2, shot[1]); return [shot[0] + 2, shot[1]];
        }
        gameboard.recieveAttack(shot[0] + 1, shot[1]); return [shot[0] + 1, shot[1]];
    }
    return false;
}

export default AImove;