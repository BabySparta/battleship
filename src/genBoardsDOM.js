function genBoards () {
    const boards = document.querySelectorAll('.board');

    boards.forEach((board) => {
        for (let i = 0; i < 100; i++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            if (board.classList.contains('opponent')) newCell.classList.add('oppCell');
            if (board.classList.contains('player')) newCell.classList.add('userCell');
            board.appendChild(newCell);
        }
    })
}

export default genBoards;