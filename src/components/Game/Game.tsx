import React from "react";
import { Info } from "../Info/Info";
import { Board } from "../Board/Board";
import { useGameStatus } from "../../hooks/useGameStatus";
import styles from "./Game.module.css";

export const Game = () => {
  const { board, openCell, toggleFlag } = useGameStatus(5, 5, 5);
  return (
    <div className={styles.game}>
      <Info cellList={board} onReset={() => {}} />
      <Board board={board} onClick={openCell} onContextClick={toggleFlag} />
    </div>
  );
};
