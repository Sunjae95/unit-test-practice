import { act, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { useGameStatus } from "./useGameStatus";

test("지뢰개수와 N * M 2차원 배열을 받아 랜덤으로 생성한다", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));
  const board = result.current.board;

  expect(board.length).toBe(5);
  expect(board[0].length).toBe(5);
});

test("지뢰가 중복되지 않도록 무작위 위치에 지정된 개수만큼 생성된다.", () => {
  const TOTAL_MINE_COUNT = 5;
  const { result } = renderHook(() => useGameStatus(5, 5, TOTAL_MINE_COUNT));
  const board = result.current.board;

  expect(board.flat().filter(({ isMine }) => isMine).length).toBe(
    TOTAL_MINE_COUNT
  );
});

test("각 셀의 mineCount는 자신과 주변 8칸의 지뢰 개수를 정확히 나타낸다.", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));
  const board = result.current.board;
  const mineCount = board[1][1].mineCount;
  const aroundMineCount = [0, 1, 2].reduce(
    (acc, row) =>
      acc +
      [0, 1, 2].reduce(
        (acc, column) => acc + Number(board[row][column].isMine),
        0
      ),
    0
  );

  expect(mineCount).toEqual(aroundMineCount);
});

test("깃발을 토글하면 isFlag 상태가 변경된다.", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });

  expect(result.current.board[0][0].isFlag).toBe(true);
});

test("깃발을 두번 토글하면 isFlag 상태가 원상태로 돌아온다.", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });
  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });

  expect(result.current.board[0][0].isFlag).toBe(false);
});

test("열린 셀에 깃발을 토글할 수 없다.", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));

  act(() => {
    result.current.openCell({ row: 0, column: 0 });
  });
  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });

  expect(result.current.board[0][0].isFlag).toBe(false);
});

test("깃발이 있는 셀은 열리지 않는다.", () => {
  const { result } = renderHook(() => useGameStatus(5, 5, 5));

  act(() => {
    result.current.toggleFlag({ row: 0, column: 0 });
  });
  act(() => {
    result.current.openCell({ row: 0, column: 0 });
  });

  expect(result.current.board[0][0].isFlag).toBe(true);
  expect(result.current.board[0][0].isOpen).toBe(false);
});
