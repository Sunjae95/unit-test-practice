import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi, describe, afterEach } from "vitest";
import { Cell } from "./Cell";
import type { CellProps } from "./Cell";

const renderCell = (props?: Partial<CellProps>) => {
  const onClickSpy = vi.fn();
  const onClickContextSpy = vi.fn();
  const defaultProps: CellProps = {
    row: 1,
    column: 1,
    isFlag: false,
    isMine: false,
    isOpen: false,
    mineCount: 0,
    onClick: onClickSpy,
    onClickContext: onClickContextSpy,
  };
  render(<Cell {...defaultProps} {...props} />);
  const button = screen.getByRole("button");

  return { button, onClickSpy, onClickContextSpy };
};

describe("Cell 열림", () => {
  test("💣가 표시된다.", () => {
    const { button } = renderCell({ isOpen: true, isMine: true });

    expect(button.textContent).toBe("💣");
  });

  test("주변 지뢰개수를 표시한다.", () => {
    const mineCount = 5;
    const { button } = renderCell({ isOpen: true, mineCount });

    expect(button.textContent).toBe(mineCount.toString());
  });

  test("왼쪽마우스 클릭 onClick 함수는 작동하지 않는다.", () => {
    const { button, onClickSpy } = renderCell({ isOpen: true });

    fireEvent.click(button);

    expect(onClickSpy).not.toHaveBeenCalledOnce();
  });

  test("오른쪽마우스 클릭 onClickContext 함수는 작동하지 않는다.", () => {
    const { button, onClickContextSpy } = renderCell({ isOpen: true });

    fireEvent.contextMenu(button);

    expect(onClickContextSpy).not.toHaveBeenCalledOnce();
  });
});

describe("Cell 닫힘", () => {
  test("아무것도 표시되지 않는다.", () => {
    const { button } = renderCell();

    expect(button.textContent).toBe("");
  });

  test("왼쪽 마우스 클릭 onClick 함수는 좌표가 인자로 전달되어 작동한다.", () => {
    const row = 1;
    const column = 2;
    const { button, onClickSpy } = renderCell({ row, column });

    fireEvent.click(button);

    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(onClickSpy).toHaveBeenCalledWith({ row, column });
  });

  test("오른쪽마우스 클릭 onClickContext 함수는 좌표가 인자로 전달되어 작동한다.", () => {
    const row = 1;
    const column = 2;
    const { button, onClickContextSpy } = renderCell({ row, column });

    fireEvent.contextMenu(button);

    expect(onClickContextSpy).toHaveBeenCalledOnce();
    expect(onClickContextSpy).toHaveBeenCalledWith({ row, column });
  });
});

describe("Cell 깃발", () => {
  test("깃발이 표시된다.", () => {
    const { button } = renderCell({ isFlag: true });

    expect(button.textContent).toContain("🚩");
  });

  test("왼쪽 마우스 클릭 onClick 함수는 작동하지 않는다.", () => {
    const { button, onClickSpy } = renderCell({ isFlag: true });

    fireEvent.click(button);

    expect(onClickSpy).not.toHaveBeenCalledOnce();
  });

  test("오른쪽마우스 클릭 onClickContext 함수는 좌표가 인자로 전달되어 작동한다.", () => {
    const row = 1;
    const column = 2;
    const { button, onClickContextSpy } = renderCell({
      isFlag: true,
      row,
      column,
    });

    fireEvent.contextMenu(button);

    expect(onClickContextSpy).toHaveBeenCalledOnce();
    expect(onClickContextSpy).toHaveBeenCalledWith({ row, column });
  });
});

afterEach(() => {
  cleanup();
});
