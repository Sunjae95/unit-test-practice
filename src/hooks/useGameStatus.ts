import { useState, useEffect } from "react";

export type CellType = {
  row: number;
  column: number;
  isOpen: boolean;
  isFlag: boolean;
  isMine: boolean;
  mineCount: number;
};

type GameStatus = "playing" | "won" | "lost";

export const useGameStatus = (
  rows: number,
  cols: number,
  mineCount: number
) => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [flagCount, setFlagCount] = useState(0);

  // 1. 초기 보드 생성
  useEffect(() => {
    const newBoard = generateBoard(rows, cols, mineCount);
    setBoard(newBoard);
  }, [rows, cols, mineCount]);

  // 2. 지뢰 위치 랜덤 생성
  const generateBoard = (
    rows: number,
    cols: number,
    mineCount: number
  ): CellType[][] => {
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
    while (planted < mineCount) {
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

  const toggleFlag = ({ row, column }: { row: number; column: number }) => {
    setBoard((prev) =>
      prev.map((r, ri) =>
        r.map((cell, ci) => {
          if (ri === row && ci === column) {
            if (cell.isOpen) return cell; // 열린 셀은 깃발 못 바꿈
            const isFlagging = !cell.isFlag;
            setFlagCount((prev) => prev + (isFlagging ? 1 : -1));
            return { ...cell, isFlag: isFlagging };
          }
          return cell;
        })
      )
    );
  };

  const openCell = ({ row, column }: { row: number; column: number }) => {
    const next = board.map((r) => r.map((cell) => ({ ...cell })));

    const openRecursive = (r: number, c: number) => {
      if (
        r < 0 ||
        r >= rows ||
        c < 0 ||
        c >= cols ||
        next[r][c].isOpen ||
        next[r][c].isFlag
      )
        return;

      next[r][c].isOpen = true;

      if (next[r][c].isMine) {
        setStatus("lost");
        return;
      }

      if (next[r][c].mineCount === 0) {
        [-1, 0, 1].forEach((dr) =>
          [-1, 0, 1].forEach((dc) => {
            if (dr !== 0 || dc !== 0) openRecursive(r + dr, c + dc);
          })
        );
      }
    };

    openRecursive(row, column);
    setBoard(next);
  };

  return {
    board,
    gameStatus: status,
    flagCount,
    mineCount,
    toggleFlag,
    openCell,
  };
};
