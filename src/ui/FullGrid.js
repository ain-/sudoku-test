import React, {Component} from 'react';
import Square from './Square';
import Puzzle from '../logic/Puzzle';
import BorderType from '../logic/BorderType';

class FullGrid extends Component {
  constructor() {
    super();
    this.state = {puzzle: new Puzzle(4, 2, 2)};
  }
  render() {
    let gridHeight = window.innerHeight * 0.8;
    let gridWidth = gridHeight;
    let styles = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'cornsilk',
      height: gridHeight,
      width: gridWidth,
      margin: 'auto',
      display: 'flex',
      flexWrap: 'wrap'
    };
    let squareStyles = {
      height: gridHeight / this.state.puzzle.rowCount,
      width: gridWidth / this.state.puzzle.columnCount
    };
    let grid = this.state.puzzle.getClueGrid();
    return (
      <div style={styles}>
        {grid.map((row, row_i) =>
          row.map((square, col_i) =>
            <Square style={squareStyles}
              key={row_i + '_' + col_i}
              value={square}
              borderTypes={this.state.puzzle.getBorderTypes(row_i, col_i)}>
            </Square>
        ))}
      </div>

    );
  }
}

export default FullGrid;
