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

export const useGameStatus = ({
  initialBoard,
}: {
  initialBoard: CellType[][];
}) => {
  const rows = initialBoard.length;
  const cols = initialBoard[0]?.length ?? 0;
  const mineCount = initialBoard.flat().filter(({ isMine }) => isMine).length;

  const [board, setBoard] = useState(initialBoard);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

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
    if (gameStatus === "lost") {
      alert("패배");
      onReset();
    }
    if (gameStatus === "won") {
      alert("승리");
      onReset();
    }
  }, [gameStatus]);

  return {
    board,
    toggleFlag,
    openCell: openBoard,
    onReset,
  };
};
