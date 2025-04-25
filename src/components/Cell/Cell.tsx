import React from "react";
import { CellType } from "../../hooks/useGameStatus";

export interface CellProps extends CellType {
  onClick: (params: { row: number; column: number }) => void;
  onClickContext: (params: { row: number; column: number }) => void;
}

export const Cell = ({
  row,
  column,
  isOpen,
  isFlag,
  isMine,
  mineCount,
  onClick,
  onClickContext,
}: CellProps) => {
  const getButtonText = () => {
    if (isOpen === false) return isFlag ? "🚩" : "";
    if (isMine) return "💣";
    return mineCount ? mineCount : "";
  };

  return (
    <button
      onClick={() => onClick({ row, column })}
      onContextMenu={() => {
        if (isOpen) return;
        onClickContext({ row, column });
      }}
      disabled={isOpen || isFlag}
    >
      {getButtonText()}
    </button>
  );
};
