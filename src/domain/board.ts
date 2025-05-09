import { CellType } from "../hooks/useGameStatus";

type GenerateBoardParams = { rows: number; cols: number; mineCount: number };

export const generateBoard = ({
  rows,
  cols,
  mineCount,
}: GenerateBoardParams): CellType[][] => {
  const board: CellType[][] = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, column) => ({
      row,
      column,
      isMine: false,
      isOpen: false,
      isFlag: false,
      mineCount: 0,
    }))
  );

  let planted = 0;
  while (planted < mineCount && planted < rows * cols) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      planted++;
    }
  }

  // mineCount 설정
  const dirs = [-1, 0, 1];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let count = 0;
      dirs.forEach((dr) =>
        dirs.forEach((dc) => {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            board[nr][nc].isMine
          ) {
            count++;
          }
        })
      );
      board[r][c].mineCount = count;
    }
  }

  return board;
};

type ToggleBoardParams = { board: CellType[][]; row: number; column: number };

export const toggleBoard = ({ board, row, column }: ToggleBoardParams) => {
  const toggledBoard = board.map((r, ri) =>
    r.map((cell, ci) => {
      if (ri === row && ci === column) {
        if (cell.isOpen) return cell;
        return { ...cell, isFlag: !cell.isFlag };
      }

      return cell;
    })
  );

  return toggledBoard;
};

export const openCell = ({ board, row, column }: ToggleBoardParams) => {
  if (board[row][column].isFlag || board[row][column].isOpen) return board;

  const _board = board.map((r) => r.map((cell) => ({ ...cell })));

  const openRecursive = (r: number, c: number) => {
    _board[r][c].isOpen = true;
    if (_board[r][c].isMine || _board[r][c].mineCount > 0) return;

    const maxRow = board.length;
    const maxColumn = board[0].length;

    [-1, 0, 1].forEach((dr) =>
      [-1, 0, 1].forEach((dc) => {
        const nr = r + dr;
        const nc = c + dc;

        if (
          (dr === 0 && dc === 0) ||
          nr < 0 ||
          nr >= maxRow ||
          nc < 0 ||
          nc >= maxColumn ||
          _board[nr][nc].isOpen ||
          _board[nr][nc].isFlag ||
          _board[nr][nc].isMine
        )
          return;

        openRecursive(nr, nc);
      })
    );
  };

  openRecursive(row, column);

  return _board;
};
