import { Router } from "express";
import { getHome,getSignUp,getLogin,postSignUp,getLogout,getCreateFolder,postCreateFolder,getFolder,getRenameFolder,postRenameFolder,postDeleteFolder,getCreateFile,postFileUpload } from "../controller/userController.js";
import { validateSignUp } from "../middleware/validation.js";
import passport from "../passport.js"
import { requireAuth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRouter = Router()

userRouter.get("/",requireAuth,getHome);
userRouter.get("/sign-up",getSignUp);
userRouter.get("/login",getLogin);
userRouter.post("/sign-up",validateSignUp,postSignUp);
userRouter.post("/login",passport.authenticate("local",{
 successRedirect:"/",
 failureRedirect:"/login",
})
);
userRouter.get("/log-out",getLogout)
userRouter.get("/create",requireAuth,getCreateFolder);
userRouter.post("/create",requireAuth,postCreateFolder);
userRouter.get("/folders/:id",requireAuth,getFolder);
userRouter.get("/folders/:id/rename",requireAuth,getRenameFolder);
userRouter.post("/folders/:id/rename",requireAuth,postRenameFolder);
userRouter.post("/folders/:id/delete",requireAuth,postDeleteFolder);
userRouter.get("/folders/:id/upload",requireAuth,getCreateFile);
userRouter.post("/folders/:id/upload",requireAuth,upload.single("file"),postFileUpload);

export default userRouter;