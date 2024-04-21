import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    for (let i = 0; i < nrows; i++) {
      initialBoard.push(Array(ncols).fill(false));
    }
    // Set some initial values
    initialBoard[1][0] = true;
    initialBoard[1][1] = true;

    return initialBoard;
  }

  function hasWon(board) {
    // Iterate through each cell in the board
    for (let row of board) {
      for (let cell of row) {
        // If any cell is still lit (true), the player hasn't won yet
        if (cell) {
          return false;
        }
      }
    }
    // If all cells are off, the player has won
    return true;
  }

  /** Flip cells around a given cell */
  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map((row) => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  return (
    <>
      <h1>Lets play lights-out</h1>
      <table className="Board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((isLit, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  flipCellsAroundMe={() =>
                    flipCellsAround(`${rowIndex}-${colIndex}`)
                  }
                  isLit={isLit}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {hasWon(board) && <div>You Win!</div>}
    </>
  );
}

export default Board;
