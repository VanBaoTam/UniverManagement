import { Router } from "express";
import { userInstance } from "../controller/user.controllder.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/login", authenToken, userInstance.login);
userRouter.post("/signup", authenToken, userInstance.signUp);
userRouter.post("/forgot-password", authenToken, userInstance.forgotPassword);
userRouter.get("/profile", authenToken, userInstance.getProfile);
userRouter.get("/address", authenToken, userInstance.getAddresses);
userRouter.post("/updateprofile", authenToken, userInstance.updateProfile);
userRouter.post("/validate", authenToken, userInstance.validate);

// -----------------------------------------------
export { userRouter };
