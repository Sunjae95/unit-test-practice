import React from "react";

import styles from "./Game.module.css";
import { generateBoard } from "../../domain/board";
import { useGameStatus } from "../../hooks/useGameStatus";
import { Info } from "../Info/Info";
import { Cell } from "../Cell/Cell";

const RESULT_MAP = {
  won: "승리",
  lost: "패배",
  error: "오류가 있어 저장되지 않았습니다.",
};

export const Game = () => {
  const initialBoard = generateBoard({ rows: 5, cols: 5, mineCount: 4 });
  const { board, hintCount, openCell, toggleFlag, onReset } = useGameStatus({
    initialBoard,
    onGameEnd: (result) => {
      alert(RESULT_MAP[result]);
    },
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
