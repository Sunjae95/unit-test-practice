import { useEffect, useState } from "react";
import {
  GameHistoryRepository,
  GameHistoryType,
} from "../domain/repository/GameHistoryRepository";

export const useGameHistory = (repository: GameHistoryRepository) => {
  const [history, setHistory] = useState<GameHistoryType[]>([]);

  useEffect(() => {
    repository.fetch().then(setHistory);
  }, [repository]);

  const save = async (updated: GameHistoryType[]) => {
    try {
      await repository.save(updated);
      setHistory(updated);
    } catch (e) {
      console.log(e);
    }
  };

  const addHistory = async (item: GameHistoryType) => {
    await save([...history, item]);
  };

  const deleteHistory = async (id: string) => {
    await save(history.filter((h) => h.id !== id));
  };

  return { history, addHistory, deleteHistory };
};
