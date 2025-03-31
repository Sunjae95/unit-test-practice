import { expect, test } from "vitest";
import Cell from "./cell";

test("mine", () => {
  const sut = new Cell({ mine: true });
  sut.setAroundCellList([
    new Cell(),
    new Cell(),
    new Cell({ mine: true }),
    new Cell(),
  ]);

  sut.check();

  expect(sut.getPrint()).toBe("지뢰");
});

test("non-mine with around non-mine", () => {
  const sut = new Cell();
  sut.setAroundCellList([new Cell(), new Cell(), new Cell(), new Cell()]);

  sut.check();

  expect(sut.getPrint()).toBe("");
});

test("non-mine with around 2 mine", () => {
  const sut = new Cell();
  sut.setAroundCellList([
    new Cell(),
    new Cell({ mine: true }),
    new Cell({ mine: true }),
    new Cell(),
  ]);

  sut.check();

  expect(sut.getPrint()).toBe(2);
});
