import React from "react";
import { CellProps } from "../Cell/Cell";

export interface InfoProps {
  cellList: Omit<CellProps, "onClick" | "onClickContext">[][];
  onReset: () => void;
}

export const Info = ({ cellList, onReset }: InfoProps) => {
  return (
    <section aria-label="info">
      <div role="region" aria-label="mineCounter">
        <span>
          {cellList.reduce((total, row) => {
            const mineCount = row.reduce(
              (count, { isMine }) => count + Number(isMine),
              0
            );

            return total + mineCount;
          }, 0)}
        </span>
      </div>

      <button aria-label="reset" onClick={onReset}>
        restart
      </button>
    </section>
  );
};
