import { Router } from "express";
import { userInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/login", userInstance.login);
userRouter.get("/get-profile", authenToken, userInstance.getProfile);
userRouter.put("/update-profile", authenToken, userInstance.updateProfile);
userRouter.put("/change-password", authenToken, userInstance.changePassword);
// -----------------------------------------------
export { userRouter };
