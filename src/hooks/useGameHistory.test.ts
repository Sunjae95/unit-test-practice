import { renderHook, act } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { LocalStorageGameHistoryRepository } from "../infra/LocalStorageGameHistory";
import { GameHistoryType } from "../domain/repository/GameHistoryRepository";
import { useGameHistory } from "./useGameHistory";

const repo = new LocalStorageGameHistoryRepository();

beforeEach(() => {
  localStorage.clear();
});

test("로컬스토리지에 기록을 저장한다.", async () => {
  const newRecord: GameHistoryType = {
    id: "1",
    createdAt: "2023-01-01",
    status: "won",
  };
  const { result } = renderHook(() => useGameHistory(repo));

  await act(async () => {
    await result.current.addHistory(newRecord);
  });

  expect(result.current.history[0]).toBe(newRecord);
});
