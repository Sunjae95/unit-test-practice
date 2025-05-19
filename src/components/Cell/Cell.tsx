import React, { MouseEventHandler } from "react";
import styles from "./Cell.module.css";

export interface CellProps {
  isOpen: boolean;
  isFlag: boolean;
  isMine: boolean;
  mineCount: number;
  onClick: () => void;
  onClickContext: () => void;
}

export const Cell = ({
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

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (isOpen) return;

    onClickContext();
  };

  return (
    <button
      className={getClassNames()}
      onClick={onClick}
      onContextMenu={handleOnClick}
      disabled={isOpen || isFlag}
    >
      {getButtonText()}
    </button>
  );
};
