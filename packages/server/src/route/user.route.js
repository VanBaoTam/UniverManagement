import { Router } from "express";
import { userInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/login", userInstance.Login);
userRouter.get("/get-profile/:accountId", authenToken, userInstance.GetProfile);
userRouter.put("/update-profile", authenToken, userInstance.UpdateProfile);
userRouter.put("/change-password", authenToken, userInstance.ChangePassword);
// -----------------------------------------------
export { userRouter };
