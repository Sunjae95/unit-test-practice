import { describe, expect, test } from "vitest";
import { generateBoard } from "./board";

describe("보드판 생성", () => {
  test("N * M개의 cell을 가진 보드판을 생성한다.", () => {
    const mock = { rows: 3, cols: 5, mineCount: 5 };
    const sut = generateBoard(mock);

    expect(sut.length).toBe(mock.rows);
    expect(sut[0].length).toBe(mock.cols);
  });

  test("N * M개보다 작은 지뢰를 생성한다.", () => {
    const mock = { rows: 3, cols: 5, mineCount: 5 };
    const sut = generateBoard(mock);

    expect(sut.flat().filter(({ isMine }) => isMine).length).toBe(
      mock.mineCount
    );
  });

  test("N * M개보다 많은 지뢰를 생성한다.", () => {
    const mock = { rows: 3, cols: 5, mineCount: 20 };
    const sut = generateBoard(mock);

    expect(sut.flat().filter(({ isMine }) => isMine).length).toBe(
      mock.rows * mock.cols
    );
  });
});
