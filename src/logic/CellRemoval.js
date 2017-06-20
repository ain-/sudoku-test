import Puzzle from './Puzzle';

export function removeSingletonCells(puzzle) {
  puzzle.cells.forEach(cell => cell.isClue = true);

}
