import React from "react";

import { Cell, CellProps } from "../Cell/Cell";
import { CellType } from "../../hooks/useGameStatus";

import styles from "./Board.module.css";

export interface BoardProps {
  cellList: CellType[][];
  onClick: CellProps["onClick"];
  onContextClick: CellProps["onClickContext"];
}

export const Board = ({ cellList, onClick, onContextClick }: BoardProps) => {
  return (
    <div className={styles.board} role="region" aria-label="board">
      {cellList.map((row, i) => (
        <ul className={styles.row} key={`row-${i}`}>
          {row.map((cell, j) => (
            <li className={styles.cellWrapper} key={`cell-${i}-${j}`}>
              <Cell
                {...cell}
                onClick={onClick}
                onClickContext={onContextClick}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
