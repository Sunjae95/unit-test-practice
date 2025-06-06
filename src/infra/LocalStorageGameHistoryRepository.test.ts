import { test, expect, beforeEach } from "vitest";
import { LocalStorageGameHistoryRepository } from "./LocalStorageGameHistory";
import { GameHistoryType } from "../domain/repository/GameHistoryRepository";

const repo = new LocalStorageGameHistoryRepository();
const key = "history";

beforeEach(() => {
  localStorage.clear();
});

test("저장된 데이터가 없으면 빈 배열을 반환한다", async () => {
  const result = await repo.fetch();

  expect(result.length).toEqual(0);
});

test("유효한 JSON이 있으면 파싱하여 반환한다", async () => {
  const data: GameHistoryType[] = [
    { id: "1", createdAt: "2023-01-01", status: "won" },
  ];
  localStorage.setItem(key, JSON.stringify(data));

  const result = await repo.fetch();

  expect(result).toEqual(data);
});

test("fetch: JSON.parse 에러가 나면 빈 배열을 반환한다", async () => {
  localStorage.setItem(key, "{invalid json");

  const result = await repo.fetch();

  expect(result.length).toEqual(0);
});

test("정상적으로 데이터를 저장한다", async () => {
  const data: GameHistoryType[] = [
    { id: "2", createdAt: "2023-01-02", status: "lost" },
  ];

  await repo.save(data);

  expect(localStorage.getItem(key)).toBe(JSON.stringify(data));
});

test("JSON.stringify 에러가 발생하면 예외를 던진다", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circular: any = {};
  circular.self = circular;

  await expect(repo.save([circular])).rejects.toThrow();
});
