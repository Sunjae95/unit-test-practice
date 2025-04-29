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
