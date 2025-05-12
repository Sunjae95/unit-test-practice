import { test, vi } from "vitest";
import * as boardDomain from "../domain/board";

/**
 * 🚩  💣  x
 * x   x   x
 * x   x   o
 */
const mockBoard = Array.from({ length: 3 }, (_, row) =>
  Array.from({ length: 3 }, (_, column) => ({
    isFlag: row === 0 && column === 0,
    isOpen: row === 2 && column === 2,
    row,
    column,
    isMine: row === 0 && column === 1,
    mineCount:
      (row === 0 && column === 0) ||
      (row === 0 && column === 2) ||
      (row === 1 && column === 0) ||
      (row === 1 && column === 1) ||
      (row === 1 && column === 2)
        ? 1
        : 0,
  }))
);

vi.mock("../domain/board", async () => {
  const actual = await vi.importActual<typeof boardDomain>("../domain/board");
  return {
    ...actual,
    generateBoard: vi.fn(() => mockBoard),
  };
});

test.todo("깃발을 토글하면 허용깃발 개수가 변경된다.");

test.todo("지뢰가 존재하는 cell에 깃발이 모두 존재하면 승리한다.");

test.todo("지뢰를 발견하면 패배한다.");

test.todo("게임을 재시작한다.");
