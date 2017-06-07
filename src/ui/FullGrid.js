import React, {Component} from 'react';
import Square from './Square';

class FullGrid extends Component {
  constructor() {
    super();
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
      height: gridHeight / 9,
      width: gridWidth / 9
    };
    return (
      <div style={styles}>
        {Array(81).fill(1).map((_, i) =>
          <Square style={squareStyles} key={i} id={i}></Square>
        )}
      </div>

    );
  }
}

export default FullGrid;
