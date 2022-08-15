function genBoards () {
    const boards = document.querySelectorAll('.board');
    boards.forEach((board) => {
        for (let i = 0; i < 10; i++) {
            let row = document.createElement('div');
            for (let y = 0; y < 10; y++) {
              let cell = document.createElement('div');
                cell.classList.add('cell');
                if (board.classList.contains('opponent')) cell.classList.add('oppCell');
                if (board.classList.contains('player')) cell.classList.add('userCell');
                if (board.classList.contains('modalBoard')) cell.classList.add('modalCell');
                cell.dataset.x = y;
                cell.dataset.y = i;
                row.appendChild(cell);
            }
            row.classList.add('row');
            board.appendChild(row);
          }
    })
}


export default genBoards;