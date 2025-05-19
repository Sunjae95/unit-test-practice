import React from "react";
import styles from "./Info.module.css";

export interface InfoProps {
  hintCount: number;
  onReset: () => void;
}

export const Info = ({ hintCount, onReset }: InfoProps) => {
  return (
    <section className={styles.info} aria-label="info">
      <div role="region" aria-label="mineCounter">
        <span>{hintCount}</span>
      </div>

      <button
        className={styles.resetButton}
        aria-label="reset"
        onClick={onReset}
      >
        restart
      </button>
    </section>
  );
};
