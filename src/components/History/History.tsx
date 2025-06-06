import React from "react";
import styles from "./History.module.css";
import { GameHistoryType } from "../../domain/repository/GameHistoryRepository";

interface HistoryProps {
  histories: GameHistoryType[];
  onDelete: (id: string) => void;
}

export const History = ({ histories, onDelete }: HistoryProps) => {
  return (
    <div className={styles.history}>
      <h2 className={styles.historyTitle}>게임 기록</h2>
      {histories.length === 0 ? (
        <p>아직 기록이 없습니다.</p>
      ) : (
        <ul className={styles.historyList}>
          {histories.map(({ id, status, createdAt }) => (
            <li key={id} className={styles.historyItem}>
              <span>{new Date(createdAt).toLocaleString()}</span>
              <span>{status === "won" ? "승리" : "패배"}</span>
              <button onClick={() => onDelete(id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
