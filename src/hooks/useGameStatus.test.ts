// import { act, renderHook } from "@testing-library/react";
// import { expect, test } from "vitest";
// import { useGameStatus } from "./useGameStatus";

// test("각 셀의 mineCount는 자신과 주변 8칸의 지뢰 개수를 정확히 나타낸다.", () => {
//   const { result } = renderHook(() => useGameStatus(5, 5, 5));
//   const board = result.current.board;
//   const mineCount = board[1][1].mineCount;
//   const aroundMineCount = [0, 1, 2].reduce(
//     (acc, row) =>
//       acc +
//       [0, 1, 2].reduce(
//         (acc, column) => acc + Number(board[row][column].isMine),
//         0
//       ),
//     0
//   );

//   expect(mineCount).toEqual(aroundMineCount);
// });

// test("깃발이 있는 셀은 열리지 않는다.", () => {
//   const { result } = renderHook(() => useGameStatus(5, 5, 5));

//   act(() => {
//     result.current.toggleFlag({ row: 0, column: 0 });
//   });
//   act(() => {
//     result.current.openCell({ row: 0, column: 0 });
//   });

//   expect(result.current.board[0][0].isFlag).toBe(true);
//   expect(result.current.board[0][0].isOpen).toBe(false);
// });
