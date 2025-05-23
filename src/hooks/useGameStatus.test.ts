import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useGameStatus } from "./useGameStatus";

const createBaseMockBoard = () =>
  Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, column) => ({
      isFlag: false,
      isOpen: false,
      row,
      column,
      isMine: false,
      mineCount: 0,
    }))
  );

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("깃발을 토글하면 허용깃발 개수가 변경된다.", () => {
  const initialBoard = createBaseMockBoard();
  initialBoard[0][1].isMine = true;

  const { result } = renderHook(() => useGameStatus({ initialBoard }));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });

  expect(result.current.hintCount).toBe(0);
});

test("지뢰가 존재하는 cell에 깃발이 모두 존재하면 승리한다.", () => {
  const initialBoard = createBaseMockBoard();
  initialBoard[0][0].isMine = true;

  const { result } = renderHook(() => useGameStatus({ initialBoard }));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });

  expect(window.alert).toHaveBeenCalledWith("승리");
});

test("지뢰를 발견하면 패배한다.", () => {
  const initialBoard = createBaseMockBoard();
  initialBoard[0][0].isMine = true;

  const { result } = renderHook(() => useGameStatus({ initialBoard }));

  act(() => {
    result.current.openCell({ row: 0, column: 0 });
  });

  expect(window.alert).toHaveBeenCalledWith("패배");
});

test("게임을 재시작한다.", () => {
  const initialBoard = createBaseMockBoard();
  initialBoard[0][0].isMine = true;

  const { result } = renderHook(() => useGameStatus({ initialBoard }));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 1 });
    result.current.openCell({ row: 1, column: 1 });
    result.current.onReset();
  });

  expect(
    result.current.board.flat().filter(({ isFlag }) => isFlag).length
  ).toEqual(0);
  expect(
    result.current.board.flat().filter(({ isOpen }) => isOpen).length
  ).toEqual(0);
});
