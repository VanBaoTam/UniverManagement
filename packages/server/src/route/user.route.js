import { Router } from "express";
import { userInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/login", userInstance.login);
userRouter.get("/getprofile/:accountId", authenToken, userInstance.getProfile);
userRouter.put("/updateprofile", authenToken, userInstance.updateProfile);
userRouter.put("/changepassword", authenToken, userInstance.changePassword);
// -----------------------------------------------
export { userRouter };
