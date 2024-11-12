// backend/routes/solveRoute.js
import express from "express";
import { Router } from "express";
import solveSudoku from "../Solution.js";
import generateSudokuPuzzle from "../Generator.js";

const router = Router();

function isValidSolution(board) {
  const isValidRowOrColumn = (arr) =>
    new Set(arr).size === 9 && arr.every((num) => num >= 1 && num <= 9);

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    if (
      !isValidRowOrColumn(board[i]) ||
      !isValidRowOrColumn(board.map((row) => row[i]))
    )
      return false;
  }

  // Check 3x3 subgrids
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const subgrid = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          subgrid.push(board[i + x][j + y]);
        }
      }
      if (!isValidRowOrColumn(subgrid)) return false;
    }
  }
  return true;
}

router.get("/generate", (req, res) => {
  const puzzle = generateSudokuPuzzle();
  res.json({ board: puzzle });
});

router.post("/solve", (req, res) => {
  const { board } = req.body;
  const solvedBoard = JSON.parse(JSON.stringify(board));
  if (solveSudoku(solvedBoard)) {
    res.json({ solved: true, board: solvedBoard });
  } else {
    res.json({ solved: false, message: "No solution exists" });
  }
});
router.post("/validate", (req, res) => {
  const { board } = req.body;
  if (isValidSolution(board)) {
    res.json({
      valid: true,
      message: "Congratulations! The Sudoku is solved correctly.",
    });
  } else {
    res.json({
      valid: false,
      message: "The solution is incorrect. Please try again.",
    });
  }
});

export default router;
