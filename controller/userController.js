import { prisma } from "../db/prisma.js";
import bcrypt from "bcryptjs"
 

async function getHome(req,res) {
    res.send("Hello!!!")
}

async function getSignUp(req,res) {
    res.render("signup")
}

async function postSignUp(req,res) {
    const {firstname,lastname,username,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {
            firstname,
            lastname,
            username,
            password:hashedPassword,
        },
    })

    res.redirect("/login")
}

async function getLogin(req,res) {
    res.render("login")
}

export {getHome,getSignUp,getLogin,postSignUp};