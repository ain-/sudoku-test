import Puzzle from './Puzzle';

export function removeSingletonCells(puzzle) {
  puzzle.cells.forEach(cell => cell.isClue = true);
  while(true) {
    let cell = puzzle.findRandomCell(x => x.isClue === true);
    cell.isClue = false;
    cell
  }
}
