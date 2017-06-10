import BorderType from './BorderType';

class Puzzle {
  constructor(size, boxWidth, boxHeight) {
    this.rows = size;
    this.columns = size;
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
    let rows = new Array(size);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(size);
    }
  }

  getBorderTypes(x, y) {
    let getUpperBorder = (x, y) => x === 0 ? BorderType.OUTER :
      (x % this.boxHeight === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    let getRightBorder = (x, y) => y+1 === this.columns ? BorderType.OUTER :
      ((y+1) % this.boxWidth === 0 ? BorderType.INNER_BOX : BorderType.NORMAL);

    let getBottomBorder = (x, y) => x+1 === this.rows ? BorderType.OUTER :
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
    return [
      [null, null, null, 1, 3, 6],
      [1, 6, 3, 5, null, null],
      [null, 2, null, null, 4, null],
      [null, 3, null, null, null, 2],
      [null, 5, 2, 4, 6, null],
      [null, 1, null, null, null, 3]
    ];
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
