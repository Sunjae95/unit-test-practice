import React from "react";
import styles from "./Cell.module.css";

import { CellType } from "../../domain/board";

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

  const getClassNames = () => {
    const classNames = [styles.cell];

    if (isOpen) {
      classNames.push(styles.open);

      if (isMine) classNames.push(styles.mine);
      if (mineCount > 0) classNames.push(styles[`number${mineCount}`]);
    }

    if (isFlag) {
      classNames.push(styles.flag);
    }

    return classNames.join(" ");
  };

  return (
    <button
      className={getClassNames()}
      onClick={() => onClick({ row, column })}
      onContextMenu={(e) => {
        e.preventDefault();
        if (isOpen) return;
        onClickContext({ row, column });
      }}
      disabled={isOpen || isFlag}
    >
      {getButtonText()}
    </button>
  );
};
