import { describe, expect, test } from "vitest";
import { generateBoard, openCell, toggleBoard } from "./board";

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

  test("N * M개보다 많은 지뢰를 생성할 수 없다.", () => {
    const mock = { rows: 3, cols: 5, mineCount: 20 };
    const sut = generateBoard(mock);

    expect(sut.flat().filter(({ isMine }) => isMine).length).toBe(
      mock.rows * mock.cols
    );
  });
});

describe("보드판 토글", () => {
  const cell = {
    row: 0,
    column: 0,
    isFlag: false,
    isMine: true,
    isOpen: false,
    mineCount: 0,
  };

  test("임의의 위치를 1번 토글한다.", () => {
    const board = [[cell]];
    const sut = toggleBoard({
      board,
      row: 0,
      column: 0,
    });

    expect(sut[0][0].isFlag).toBe(true);
  });

  test("임의의 위치를 2번 토글한다.", () => {
    const board = [[{ ...cell, isFlag: true }]];
    const sut = toggleBoard({
      board,
      row: 0,
      column: 0,
    });

    expect(sut[0][0].isFlag).toBe(false);
  });

  test("열려있는 Cell은 토글되지 않는다.", () => {
    const board = [[{ ...cell, isOpen: true }]];
    const sut = toggleBoard({
      board,
      row: 0,
      column: 0,
    });

    expect(sut[0][0].isFlag).toBe(false);
  });
});

describe(`
   🚩  💣  x
   x   x   x
   x   x   o`, () => {
  const board = Array.from({ length: 3 }, (_, row) =>
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

  test("깃발은 클릭되지 않는다.", () => {
    const sut = openCell({ board, row: 0, column: 0 });

    expect(sut.flat().filter(({ isOpen }) => isOpen).length).toBe(1);
  });

  test("열린곳은 클릭되지 않는다.", () => {
    const sut = openCell({ board, row: 2, column: 2 });

    expect(sut.flat().filter(({ isOpen }) => isOpen).length).toBe(1);
  });

  test("지뢰라면 지뢰만 열린다.", () => {
    const sut = openCell({ board, row: 0, column: 1 });

    expect(sut.flat().filter(({ isOpen }) => isOpen).length).toBe(2);
  });

  test("주변에 지뢰가 있다면 연쇄적으로 열리지 않는다.", () => {
    const sut = openCell({ board, row: 1, column: 1 });

    expect(sut.flat().filter(({ isOpen }) => isOpen).length).toBe(2);
  });

  test("주변에 지뢰가 없으면 연쇄적으로 열린다.", () => {
    const sut = openCell({ board, row: 2, column: 1 });

    expect(sut.flat().filter(({ isOpen }) => isOpen).length).toBe(6);
  });
});
