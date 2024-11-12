import React, { useState, useEffect } from "react";
import api from "../src/api";
import "../src/App.css";

const SudokuSolver = () => {
  const [board, setBoard] = useState(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(0))
  );
  const [solution, setSolution] = useState(null);
  const [message, setMessage] = useState("");
  const [initialBoard, setInitialBoard] = useState(null); // Track fixed cells

  useEffect(() => {
    // Fetch a partially filled Sudoku puzzle when the component mounts
    const fetchPuzzle = async () => {
      try {
        const response = await api.get("/generate");
        setBoard(response.data.board);
        setInitialBoard(response.data.board); // Save the initial state to prevent overwriting filled cells
      } catch (err) {
        console.error("Error fetching puzzle:", err);
      }
    };

    fetchPuzzle();
  }, []);

  useEffect(() => {
    if (solution) {
      setBoard(solution); // Update board display with solved puzzle
    }
  }, [solution]);

  const handleChange = (row, col, value) => {
    // Allow only numbers 1-9 and empty input
    if (!/^[1-9]?$/.test(value)) return;

    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) =>
        i === row && j === col ? Number(value) || 0 : cell
      )
    );
    setBoard(newBoard);
    setMessage(""); // Reset message when input changes
  };

  const solvePuzzle = async () => {
    try {
      const response = await api.post("/solve", { board });
      if (response.data.solved) {
        setSolution(response.data.board);
        setMessage("Sudoku solved successfully!");
      } else {
        setMessage("No solution exists for the given puzzle.");
      }
    } catch (err) {
      setMessage("Error solving the puzzle");
    }
  };

  const validateSolution = async () => {
    try {
      const response = await api.post("/validate", { board });
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error validating the solution");
    }
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>
      <div className="sudoku-grid">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <input
              type="text" // Set input type to text to remove number arrows
              value={cell || ""} // Display 0 as empty cell
              onChange={(e) => handleChange(i, j, e.target.value)}
              key={`${i}-${j}`}
              disabled={initialBoard && initialBoard[i][j] !== 0} // Disable initially filled cells
              className={
                initialBoard && initialBoard[i][j] !== 0 ? "prefilled-cell" : ""
              }
            />
          ))
        )}
      </div>
      <button onClick={solvePuzzle}>Solve Sudoku</button>
      <button onClick={validateSolution}>Validate Solution</button>
      {message && (
        <p
          className={`message ${
            message.includes("incorrect") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SudokuSolver;
