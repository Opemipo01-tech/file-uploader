import { Router } from "express";
import { getHome,getSignUp,getLogin,postSignUp } from "../controller/userController.js";


const userRouter = Router()

userRouter.get("/",getHome);
userRouter.get("/sign-up",getSignUp);
userRouter.get("/login",getLogin);
userRouter.post("/sign-up",postSignUp);

export default userRouter;