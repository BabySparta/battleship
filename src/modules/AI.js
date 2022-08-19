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
    const smartAttack = findShips(firstHit, gameboard, validSpots, allHits);
    if (smartAttack) return smartAttack;
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

const findShips = (shot, gameboard, validSpots, allHits) => {
    console.log(isCoordInLocation(allHits, [shot[0] + 1, shot[1]]), allHits);
    // Vertical Ship
    if (isCoordInLocation(validSpots, [shot[0], shot[1] - 1]) || isCoordInLocation(validSpots, [shot[0], shot[1] + 1])) {
        shot = validSpots[0];
        while (shot[1] -1 >= 0 && gameboard.board[shot[1] - 1][shot[0]].isHit && shot[1] + 1 < 10 && gameboard.board[shot[1] + 1][shot[0]].isHit && validSpots.indexOf(shot) < validSpots.length - 1) {
            const index = validSpots.indexOf(shot);
            let newValid = validSpots[index + 1];
            shot = newValid;
        }
        if (shot[1] + 1 < 10 && gameboard.board[shot[1] + 1][shot[0]].isHit) {
            if (shot[1] - 1 >= 0 && !gameboard.board[shot[1] - 1][shot[0]].isHit) {
                gameboard.recieveAttack(shot[0], shot[1] - 1); return [shot[0], shot[1] - 1];
            }
        }
        if (shot[1] - 1 >=0 && gameboard.board[shot[1] - 1][shot[0]].isHit) {
            if (shot[1] + 1 < 10 && !gameboard.board[shot[1] + 1][shot[0]].isHit) {
                gameboard.recieveAttack(shot[0], shot[1] + 1); return [shot[0], shot[1] + 1];
            }
        }
    }
    // Horizontal Ship
    else if (isCoordInLocation(allHits, [shot[0] - 1, shot[1]]) || isCoordInLocation(allHits, [shot[0] + 1, shot[1]])) {
        shot = validSpots[0];
        while (shot[0] - 1 >= 0 && gameboard.board[shot[1]][shot[0] - 1].isHit && shot[0] + 1 < 10 && gameboard.board[shot[1]][shot[0] + 1].isHit && validSpots.indexOf(shot) < validSpots.length - 1) {
            const index = validSpots.indexOf(shot);
            let newValid = validSpots.splice(index, 1);
            shot = newValid[0];
        }
        if (shot[0] + 1 < 10 && gameboard.board[shot[1]][shot[0] + 1].isHit) {
            if (shot[0] - 1 >= 0 && !gameboard.board[shot[1]][shot[0] - 1].isHit) {
                gameboard.recieveAttack(shot[0] - 1, shot[1]); return [shot[0] - 1, shot[1]];
            }
        }
        if (shot[0] - 1 >= 0 && gameboard.board[shot[1]][shot[0] - 1].isHit) {
            if (shot[0] + 1 < 10 && !gameboard.board[shot[1]][shot[0] + 1].isHit) {
                gameboard.recieveAttack(shot[0] + 1, shot[1]); return [shot[0] + 1, shot[1]];
            }
        }
    }
    return false;
}

const isCoordInLocation = (arr, item) => {
    const itemString = JSON.stringify(item);

    const contains = arr.some(function(ele){
      return JSON.stringify(ele) === itemString;
    });
    return contains;
}

export default AImove;