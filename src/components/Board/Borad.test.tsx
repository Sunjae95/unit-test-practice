import { render, screen, within } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Board, BoardProps } from "./Board";

test("n x m 격자판 생성", () => {
  const [n, m] = [5, 5];
  const onClickSpy = vi.fn();
  const onClickContextSpy = vi.fn();
  const cellList: BoardProps["board"] = Array.from({ length: n }, (_, row) =>
    Array.from({ length: m }, (_, column) => ({
      row,
      column,
      isOpen: false,
      isFlag: false,
      isMine: false,
      mineCount: 0,
    }))
  );
  render(
    <Board
      board={cellList}
      onClick={onClickSpy}
      onContextClick={onClickContextSpy}
    />
  );
  const board = screen.getByRole("region", { name: "board" });

  const row = within(board).getAllByRole("list");
  const column = within(board).getAllByRole("listitem");

  expect(row).toHaveLength(n);
  expect(column).toHaveLength(n * m);
});
