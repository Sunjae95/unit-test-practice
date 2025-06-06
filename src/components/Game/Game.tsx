import React from "react";

import { LocalStorageGameHistoryRepository } from "../../infra/LocalStorageGameHistory";

import { useGameStatus } from "../../hooks/useGameStatus";
import { useGameHistory } from "../../hooks/useGameHistory";

import { generateBoard } from "../../domain/board";

import { Info } from "../Info/Info";
import { Cell } from "../Cell/Cell";
import { History } from "../History/History";

import styles from "./Game.module.css";

const RESULT_MAP = {
  won: "승리",
  lost: "패배",
  error: "오류가 있어 저장되지 않았습니다.",
};
const INITIAL_BOARD = generateBoard({ rows: 5, cols: 5, mineCount: 4 });

const GameHistoryLocalStorage = new LocalStorageGameHistoryRepository();

export const Game = () => {
  const { history, deleteHistory, addHistory } = useGameHistory(
    GameHistoryLocalStorage
  );
  const { board, hintCount, openCell, toggleFlag, onReset } = useGameStatus({
    initialBoard: INITIAL_BOARD,
    onGameEnd: async (status) => {
      try {
        await addHistory({
          id: Date.now().toString(),
          status,
          createdAt: Date.now().toString(),
        });
        alert(RESULT_MAP[status]);
      } catch (error) {
        alert(`${RESULT_MAP.error}: ${error}`);
      }
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

      <History histories={history} onDelete={deleteHistory} />
    </div>
  );
};
