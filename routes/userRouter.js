import { Router } from "express";
import { getHome,getSignUp,getLogin,postSignUp,getLogout } from "../controller/userController.js";
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
userRouter.get("/log-out",getLogout)

export default userRouter;