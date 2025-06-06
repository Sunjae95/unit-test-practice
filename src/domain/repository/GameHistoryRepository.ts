export type GameHistoryType = {
  id: string;
  createdAt: string;
  status: "won" | "lost";
};

export interface GameHistoryRepository {
  fetch: () => Promise<GameHistoryType[]>;
  save: (history: GameHistoryType[]) => Promise<void>;
}
