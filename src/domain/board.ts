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
  if (board[row][column].isFlag) return board;

  const next = board.map((r) => r.map((cell) => ({ ...cell })));
  const maxRow = board.length;
  const maxColumn = board[0].length;

  const openRecursive = (r: number, c: number) => {
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
          next[nr][nc].isOpen ||
          next[nr][nc].isFlag ||
          next[nr][nc].isMine
        )
          return;

        next[nr][nc].isOpen = true;
        openRecursive(nr, nc);
      })
    );
  };

  next[row][column].isOpen = true;

  if (next[row][column].isMine) return next;

  openRecursive(row, column);

  return next;
};
