import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi, describe, afterEach } from "vitest";
import { Cell } from "./Cell";

describe("Cell이 오픈", () => {
  test("오픈된 상태의 Cell을 클릭할 때 onClick 함수가 호출되면 안된다.", () => {
    const onClickSpy = vi.fn();
    render(<Cell row={1} column={1} onClick={onClickSpy} isOpen={true} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClickSpy).not.toHaveBeenCalledOnce();
  });
});

describe("Cell이 안 오픈", () => {
  test("왼쪽 마우스 클릭 시 onClick 함수가 좌표가 인자로 전달되어 호출되어야한다.", () => {
    const isOpen = false;
    const onClickSpy = vi.fn();
    render(<Cell row={1} column={1} onClick={onClickSpy} isOpen={isOpen} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(onClickSpy).toHaveBeenCalledWith({ row: 1, column: 1 });
  });

  test.todo("깃발을 토글한다.");
});

afterEach(() => {
  cleanup();
});
