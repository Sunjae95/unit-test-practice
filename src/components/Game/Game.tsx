import React from "react";
import { Info } from "../Info/Info";
import { Board } from "../Board/Board";
import { useGameStatus } from "../../hooks/useGameStatus";
import styles from "./Game.module.css";

export const Game = () => {
  const { board, openCell, toggleFlag, onReset } = useGameStatus(5, 5, 3);

  return (
    <div className={styles.game}>
      <Info cellList={board} onReset={onReset} />
      <Board board={board} onClick={openCell} onContextClick={toggleFlag} />
    </div>
  );
};
