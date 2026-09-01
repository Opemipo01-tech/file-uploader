import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db/prisma.js"; 


import userRouter from "./routes/userRouter.js";


import "./passport.js";

const app = express();
const PORT = 3000;

// EJS setup
app.set("view engine", "ejs");

app.use(express.static("public"));

// Middleware for form data
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store:new PrismaSessionStore(prisma,{
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId:true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
