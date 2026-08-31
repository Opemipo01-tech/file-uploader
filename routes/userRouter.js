import { Router } from "express";
import { getHome,getSignUp,getLogin,postSignUp } from "../controller/userController.js";
import { validateSignUp } from "../middleware/validation.js";
import passport from "../passport.js"


const userRouter = Router()

userRouter.get("/",getHome);
userRouter.get("/sign-up",getSignUp);
userRouter.get("/login",getLogin);
userRouter.post("/sign-up",validateSignUp,postSignUp);
userRouter.post("/login",passport.authenticate("local",{
 successRedirect:"/",
 failureRedirect:"/login",
})
);

export default userRouter;