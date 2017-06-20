import BorderType from './BorderType';
import CellRemoval from './CellRemoval';

class Puzzle {
  constructor(size, boxWidth, boxHeight) {
    this.size = size;
    this.uniqueSymbols = size;
    this.rowCount = size;
    this.columnCount = size;
    this.boxCount = size;
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
    this.initGrid();
    this.generateUniqueFullGrid();
  }

  initGrid() {
    let rowIndex = i => Math.floor(i / this.columnCount);
    let columnIndex = i => i % this.columnCount;

    let boxIndex = i => {
      let boxRow = Math.floor(rowIndex(i) / this.boxHeight);
      let boxColumn = Math.floor(columnIndex(i) / this.boxWidth);
      return boxRow * Math.floor(this.columnCount / this.boxWidth) + boxColumn;
    }

    this.cells = Array(this.rowCount * this.columnCount).fill(null)
      .map((el, i) => ({
        row: rowIndex(i),
        column: columnIndex(i),
        box: boxIndex(i),
        candidates: Array.from({length: this.size}, (v, i) => i + 1),
        value: null
      }));

    this.rows = Array.from({length: this.rowCount}, (v, i) => []);
    this.cells.forEach(cell => this.rows[cell.row].push(cell));

    this.columns = Array.from({length: this.columnCount}, (v, i) => []);
    this.cells.forEach(cell => this.columns[cell.column].push(cell));

    this.boxes = Array.from({length: this.boxCount}, (v, i) => []);
    this.cells.forEach(cell => this.boxes[cell.box].push(cell));
  }

  checkValid() {
    let correctSum = Array.from({length: this.uniqueSymbols}, (v, i) => i + 1).reduce((acc, v) => acc + v, 0);
    let correctProduct = Array.from({length: this.uniqueSymbols}, (v, i) => i + 1).reduce((acc, v) => acc * v, 1);
    let checkSets = set => {
      let allCorrect = true;
      set.forEach(cells => {
        let setSum = cells.reduce((acc, cell) => acc + cell.value, 0);
        let setProduct = cells.reduce((acc, cell) => acc * cell.value, 1);
        if (setSum !== correctSum || setProduct !== correctProduct)
          allCorrect = false;
      });
      return allCorrect;
    }
    return checkSets(this.rows)
      && checkSets(this.columns)
      && checkSets(this.boxes);
  }

  generateUniqueFullGrid() {
    let cell;
    while (true) {
      cell = this.findRandomEmptyCell();
      if (cell === null)
        break;
      this.setRandomValue(cell);
      this.reductionLoop(cell);
    }
  }

  setRandomValue(cell) {
    let index = this.getRandomInt(1, cell.candidates.length) - 1;
    cell.value = cell.candidates[index];
    cell.candidates = null;
  }

  reductionLoop(cell) {
    this.removeCandidates(cell);
    let removed = this.removeSingletons();
    if (removed) {
      this.reductionLoop(removed);
    }
  }

  removeSingletons() {
    let remove = (set) => {
      let lastCell = null;
      let found = set.some(cells => {
        for (let candidate = 1; candidate <= this.uniqueSymbols; candidate++) {
          let valueCount = 0;
          lastCell = null;
          cells.forEach(cell => {
            if (cell.value === null) {
              if (cell.candidates.includes(candidate)) {
                valueCount++;
                lastCell = cell;
              }
            }
          });
          //if (valueCount === 0)
          //  throw new Error("ran out of candidates");
          if (valueCount === 1) {
            lastCell.candidates = null;
            lastCell.value = candidate;
            return true;
          }
        }
        return false;
      });
      return found ? lastCell : null;
    };

    let val;
    val = remove(this.rows);
    if (val) return val;
    val = remove(this.columns);
    if (val) return val;
    val = remove(this.boxes);
    return val;
  }

  removeCandidates(cell) {
    this.cells.forEach(c => {
      if (c.candidates !== null) {
        if (c.row === cell.row || c.column === cell.column || c.box === cell.box) {
          let candidateToRemoveIndex = c.candidates.indexOf(cell.value);
          if (candidateToRemoveIndex !== -1) {
            c.candidates.splice(candidateToRemoveIndex, 1);
            if (c.candidates.length === 1) {
              c.value = c.candidates[0];
              c.candidates = null;
              this.removeCandidates(c);
            }
          }
        }
      }
    });
    //return null;
  }

  findEmptyCellsLeft() {
    return this.cells.reduce((acc, c) => c.value === null ? acc + 1 : acc, 0);
  }

  findRandomEmptyCell() {
    return this.findRandomCell(cell => cell.value === null);
  }

  findRandomCell(cellFunc) {
    let cellsLeft = this.cells.reduce((acc, c) => cellFunc(c) ? acc + 1 : acc, 0);
    let randomCell = this.getRandomInt(1, cellsLeft);
    let cellCounter = 0, i = 0;
    while (i < this.cells.length) {
      if (cellFunc(this.cells[i])) {
        cellCounter++;
        if (cellCounter === randomCell)
          return this.cells[i];
      }
      i++;
    }
    return null;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        grid[i][j] = this.cells[i*this.columnCount + j].value;
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
