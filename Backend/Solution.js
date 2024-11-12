function isSafe(board, row, col, num) {
  // Check if num is not in the current row, column, or 3x3 subgrid
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        // Find an empty cell
        for (let num = 1; num <= 9; num++) {
          // Try each number from 1 to 9
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
              return true;
            }

            board[row][col] = 0; // Backtrack
          }
        }
        return false; // Trigger backtracking if no number fits
      }
    }
  }
  return true; // Sudoku is solved
}
export default solveSudoku;
