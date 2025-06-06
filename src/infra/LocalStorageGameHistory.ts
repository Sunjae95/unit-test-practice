import {
  GameHistoryType,
  GameHistoryRepository,
} from "../domain/repository/GameHistoryRepository";

export class LocalStorageGameHistoryRepository
  implements GameHistoryRepository
{
  private static readonly STORAGE_KEY = "history";

  async fetch(): Promise<GameHistoryType[]> {
    try {
      const data = localStorage.getItem(
        LocalStorageGameHistoryRepository.STORAGE_KEY
      );
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("로컬스토리지에서 기록 불러오기 실패", e);
      return [];
    }
  }

  async save(history: GameHistoryType[]): Promise<void> {
    try {
      localStorage.setItem(
        LocalStorageGameHistoryRepository.STORAGE_KEY,
        JSON.stringify(history)
      );
    } catch (e) {
      console.error("로컬스토리지에 기록 저장 실패", e);
      throw e;
    }
  }
}
