import express from "express";

import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = 3000;

// EJS setup
app.set("view engine", "ejs");

// Middleware for form data
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
