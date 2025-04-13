import React from "react";
import { Cell, CellProps } from "../Cell/Cell";

export interface BoardProps {
  cellList: Omit<CellProps, "onClick" | "onClickContext">[][];
  onClick: CellProps["onClick"];
  onContextClick: CellProps["onClickContext"];
}

export const Board = ({ cellList, onClick, onContextClick }: BoardProps) => {
  return (
    <div role="region" aria-label="board">
      {cellList.map((row, i) => (
        <ul key={`row-${i}`}>
          {row.map((cell, j) => (
            <li key={`cell-${i}-${j}`}>
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
