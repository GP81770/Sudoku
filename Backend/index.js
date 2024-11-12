// backend/server.js
import express from "express";
import cors from "cors";
import solveRoute from "./routes/solutionRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", solveRoute);

const PORT = process.env.PORT || 8848;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
