import { useState, useEffect } from "react";
import { generateBoard, openCell, toggleBoard } from "../domain/board";

export type CellType = {
  row: number;
  column: number;
  isOpen: boolean;
  isFlag: boolean;
  isMine: boolean;
  mineCount: number;
};

export const useGameStatus = (
  rows: number,
  cols: number,
  mineCount: number
) => {
  const [board, setBoard] = useState<CellType[][]>([]);

  // 1. 초기 보드 생성
  useEffect(() => {
    const newBoard = generateBoard({ rows, cols, mineCount });
    setBoard(newBoard);
  }, [rows, cols, mineCount]);

  // row, column, setFlagCount
  const toggleFlag = ({ row, column }: { row: number; column: number }) => {
    setBoard((board) => toggleBoard({ board, row, column }));
  };

  const openBoard = ({ row, column }: { row: number; column: number }) => {
    setBoard((board) => openCell({ board, row, column }));
  };

  return {
    board,
    gameStatus: status,
    mineCount,
    toggleFlag,
    openCell: openBoard,
  };
};
