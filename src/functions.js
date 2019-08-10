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
};

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
};

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
};

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field};
        });
    });
};

const getNeighbours = (board, row, column) => {
    const neighbours = [];
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board[0].length;
            if (different && validRow && validColumn) {
                neighbours.push(board[r][c]);
            }
        });
    });
    return neighbours;
};

const safeNeighbourhood = (board, row, column) => {
    const safes = (result, neighbour) => result && !neighbour.mined;
    return getNeighbours(board, row, column).reduce(safes, true);
};

const openField = (board, row, column) => {
    const field = board[row][column];
    if (!field.opened) {
        field.opened = true;
        if (field.mined) {
            field.exploded = true;
        } else if (safeNeighbourhood(board, row, column)) {
            getNeighbours(board, row, column)
                .forEach(n => openField(board, n.row, n.column));
        } else {
            const neighbours = getNeighbours(board, row, column);
            field.nearMines = neighbours.filter(n => n.mined).length;
        }
    }
}

const fields = board => [].concat(... board);

const hasExploded = board => fields(board).filter(field => field.exploded).length > 0;

const isFieldIntact = field => (field.mined && !field.flagged) || (!field.mined && !field.opened);

const isGameWon = board => fields(board).filter(isFieldIntact).length === 0;

const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true);

const toggleFlag = (board, row, column) => {
    const field = board[row][column];
    field.flagged = !field.flagged;
}

const usedFlags = (board) => fields(board).filter((field) => field.flagged).length;

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hasExploded,
    isGameWon,
    showMines,
    toggleFlag,
    usedFlags,
};