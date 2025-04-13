import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Info, InfoProps } from "./Info";

test("현재 지뢰 개수를 표시한다.", () => {
  const cellList: InfoProps["cellList"] = Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, column) => ({
      row,
      column,
      isOpen: false,
      isFlag: false,
      isMine: row === 0,
      mineCount: 0,
    }))
  );
  const onClickSpy = vi.fn();
  render(<Info cellList={cellList} onReset={onClickSpy} />);

  const mineCounter = screen.getByRole("region", { name: "mineCounter" });

  expect(mineCounter.textContent).toBe("3");
});

test("게임이 초기화 된다.", () => {
  const cellList: InfoProps["cellList"] = Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, column) => ({
      row,
      column,
      isOpen: false,
      isFlag: false,
      isMine: row === 0,
      mineCount: 0,
    }))
  );
  const onClickSpy = vi.fn();
  render(<Info cellList={cellList} onReset={onClickSpy} />);
  const resetButton = screen.getByRole("button", { name: "reset" });

  fireEvent.click(resetButton);

  expect(onClickSpy).toHaveBeenCalledOnce();
});

afterEach(() => {
  cleanup();
});
