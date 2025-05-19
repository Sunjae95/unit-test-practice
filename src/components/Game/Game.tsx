import React from "react";

import styles from "./Game.module.css";
import { generateBoard } from "../../domain/board";
import { useGameStatus } from "../../hooks/useGameStatus";
import { Info } from "../Info/Info";
import { Cell } from "../Cell/Cell";

export const Game = () => {
  const initialBoard = generateBoard({ rows: 5, cols: 5, mineCount: 4 });
  const { board, hintCount, openCell, toggleFlag, onReset } = useGameStatus({
    initialBoard,
  });

  return (
    <div className={styles.game}>
      <Info hintCount={hintCount} onReset={onReset} />

      <div className={styles.board} role="region" aria-label="board">
        {board.map((row, i) => (
          <ul className={styles.row} key={`row-${i}`}>
            {row.map(({ row, column, ...props }, j) => (
              <li className={styles.cellWrapper} key={`cell-${i}-${j}`}>
                <Cell
                  {...props}
                  onClick={() => openCell({ row, column })}
                  onClickContext={() => toggleFlag({ row, column })}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
