class Puzzle {
  constructor() {
    let size = 6;
    this.rows = size;
    this.columns = size;
    let rows = new Array(size);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(size);
    }
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
