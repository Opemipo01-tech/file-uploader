import { prisma } from "../db/prisma.js";
import bcrypt from "bcryptjs"
 

async function getHome(req,res) {
    res.render("index")
}

async function getSignUp(req,res) {
    res.render("signup")
}

async function postSignUp(req,res) {
  const { firstName, lastName, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        password: hashedPassword,
      },
    });

    res.redirect("/log-in");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}

async function getLogin(req,res) {
    res.render("login")
}

async function getLogout(req,res,next) {
     req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

export {getHome,getSignUp,getLogin,postSignUp,getLogout};