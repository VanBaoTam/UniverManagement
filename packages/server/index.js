import express from "express";
import dotenv from "dotenv";

import cors from "cors";
// -----------------------------------------------
dotenv.config();
const app = express();
const port = 5999; // Default
// -----------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------
app.get("/", (_, res) => {
  res.send("Hello Fooder Server!");
});

// -----------------------------------------------
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
