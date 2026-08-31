import express from "express";

const app = express();
const PORT = 3000;

// EJS setup
app.set("view engine", "ejs");

// Middleware for form data
app.use(express.urlencoded({ extended: true }));

// Home
app.get("/", (req, res) => {
  res.send("Hello");
});

// // Signup page
// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

// // Handle signup
// app.post("/signup", (req, res) => {
//   const { username, password } = req.body;

//   console.log("Signup:", username, password);

//   res.redirect("/login");
// });

// // Login page
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// // Handle login
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   console.log("Login:", username, password);

//   res.send("Login submitted!");
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
