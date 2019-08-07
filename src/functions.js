const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    });
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length;
    const columns = board[0].length;

    let plantedMines = 0;
    while (plantedMines < minesAmount) {
        const selectedRow = parseInt(Math.random() * rows, 10);
        const selectedColumn = parseInt(Math.random() * columns, 10);

        if (!board[selectedRow][selectedColumn].mined) {
            board[selectedRow][selectedColumn].mined = true;
            plantedMines++;
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

export { createMinedBoard };