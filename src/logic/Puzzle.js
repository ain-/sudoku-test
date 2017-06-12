import BorderType from './BorderType';

class Puzzle {
  constructor(size, boxWidth, boxHeight) {
    this.rowCount = size;
    this.columnCount = size;
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
    this.initGrid();
  }

  initGrid() {
    let getRow = i => Math.floor(i / this.columnCount);
    let getColumn = i => i % this.columnCount;

    let boxValue = i => {
      let boxRow = Math.floor(getRow(i) / this.boxHeight);
      let boxColumn = Math.floor(getColumn(i) / this.boxWidth);
      return boxRow * Math.floor(this.columnCount / this.boxWidth) + boxColumn;
    }

    this.cells = Array(this.rowCount * this.columnCount).fill(null)
      .map((el, i) => ({
        row: getRow(i),
        column: getColumn(i),
        box: boxValue(i)
      }));

  }

  getBorderTypes(x, y) {
    let getUpperBorder = (x, y) => x === 0 ? BorderType.OUTER :
      (x % this.boxHeight === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    let getRightBorder = (x, y) => y+1 === this.columnCount ? BorderType.OUTER :
      ((y+1) % this.boxWidth === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    let getBottomBorder = (x, y) => x+1 === this.rowCount ? BorderType.OUTER :
      ((x+1) % this.boxHeight === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    let getLeftBorder = (x, y) => y === 0 ? BorderType.OUTER :
      (y % this.boxWidth === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    return [
      getUpperBorder(x, y),
      getRightBorder(x, y),
      getBottomBorder(x, y),
      getLeftBorder(x, y)
    ];
  }

  getClueGrid() {
    console.log(this.cells);
    let grid = new Array(this.rowCount);
    for (let i = 0; i < this.rowCount; i++) {
      grid[i] = new Array(this.columnCount);
      for (let j = 0; j < this.columnCount; j++) {
        grid[i][j] = this.cells[i*this.columnCount + j].box;
      }
    }
    return grid;
    /*return [
      [null, null, null, 1, 3, 6],
      [1, 6, 3, 5, null, null],
      [null, 2, null, null, 4, null],
      [null, 3, null, null, null, 2],
      [null, 5, 2, 4, 6, null],
      [null, 1, null, null, null, 3]
    ];*/
  }

  getSolutionGrid() {
    return [
      [2, 4, 5, 1, 3, 6],
      [1, 6, 3, 5, 2, 4],
      [6, 2, 1, 3, 4, 5],
      [5, 3, 4, 6, 1, 2],
      [3, 5, 2, 4, 6, 1],
      [4, 1, 6, 2, 5, 3]
    ];
  }
}

export default Puzzle;
