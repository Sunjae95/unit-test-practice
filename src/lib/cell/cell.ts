interface CellProps {
  mine?: boolean;
}

export default class Cell {
  private mine: boolean;
  private aroundCellList: Cell[] = [];
  private hide: boolean = true;

  constructor({ mine }: CellProps = { mine: false }) {
    this.mine = mine ?? false;
  }

  getMine() {
    return this.mine;
  }

  setAroundCellList(cellList: Cell[]) {
    this.aroundCellList = cellList;
  }

  getAroundMineCount() {
    return this.aroundCellList.filter((cell) => cell.getMine()).length;
  }

  check() {
    this.hide = false;
  }

  getPrint() {
    if (this.hide) return "";

    if (this.mine) {
      return "지뢰";
    }

    const count = this.getAroundMineCount();

    return count === 0 ? "" : count;
  }
}
