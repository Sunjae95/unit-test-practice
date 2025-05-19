import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { Info } from "./Info";

const HINT_COUNT = 3;

test("현재 지뢰 개수를 표시한다.", () => {
  render(<Info hintCount={HINT_COUNT} onReset={() => {}} />);

  const mineCounter = screen.getByRole("region", { name: "mineCounter" });

  expect(mineCounter.textContent).toBe(HINT_COUNT.toString());
});

test("게임이 초기화 된다.", () => {
  const onClickSpy = vi.fn();
  render(<Info hintCount={HINT_COUNT} onReset={onClickSpy} />);
  const resetButton = screen.getByRole("button", { name: "reset" });

  fireEvent.click(resetButton);

  expect(onClickSpy).toHaveBeenCalledOnce();
});

afterEach(() => {
  cleanup();
});
