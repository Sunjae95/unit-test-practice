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

type GameStatusType = "playing" | "won" | "lost";

export const useGameStatus = ({
  initialBoard,
  onGameEnd,
}: {
  initialBoard: CellType[][];
  onGameEnd: (result: Exclude<GameStatusType, "playing">) => void;
}) => {
  const rows = initialBoard.length;
  const cols = initialBoard[0]?.length ?? 0;
  const mineCount = initialBoard.flat().filter(({ isMine }) => isMine).length;

  const [board, setBoard] = useState(initialBoard);
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");

  const hintCount = board.reduce((total, row) => {
    const mineCount = row.filter(({ isMine }) => isMine).length;
    const flagCount = row.filter(({ isFlag }) => isFlag).length;

    return total + mineCount - flagCount;
  }, 0);

  const toggleFlag = ({ row, column }: { row: number; column: number }) => {
    setBoard((board) => toggleBoard({ board, row, column }));
  };

  const openBoard = ({ row, column }: { row: number; column: number }) => {
    setBoard((board) => openCell({ board, row, column }));
  };

  const onReset = () => {
    const newBoard = generateBoard({ rows, cols, mineCount });
    setBoard(newBoard);
    setGameStatus("playing");
  };

  useEffect(() => {
    if (board.flat().find(({ isMine, isOpen }) => isMine && isOpen)) {
      setGameStatus("lost");
    }
    if (
      board.flat().filter(({ isMine, isFlag }) => isMine && isFlag).length ===
      mineCount
    ) {
      setGameStatus("won");
    }
  }, [board, mineCount]);

  useEffect(() => {
    if (gameStatus === "playing") return;

    onGameEnd(gameStatus);
    onReset();
  }, [gameStatus]);

  return {
    board,
    hintCount,
    toggleFlag,
    openCell: openBoard,
    onReset,
  };
};
