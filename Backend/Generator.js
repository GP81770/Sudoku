// backend/sudokuGenerator.js

import solveSudoku from "./Solution.js";
function generateFullSudoku() {
  const board = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));
  solveSudoku(board); // Generate a fully solved board
  return board;
}

function removeNumbers(board, cluesPerQuadrant = 4) {
  const newBoard = board.map((row) => [...row]);

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let removed = 0;
      while (removed < 5 - cluesPerQuadrant) {
        const row = i + Math.floor(Math.random() * 3);
        const col = j + Math.floor(Math.random() * 3);
        if (newBoard[row][col] !== 0) {
          newBoard[row][col] = 0;
          removed++;
        }
      }
    }
  }
  return newBoard;
}

function generateSudokuPuzzle() {
  const fullBoard = generateFullSudoku();
  return removeNumbers(fullBoard);
}

export default generateSudokuPuzzle;
