import { Router } from "express";
import { userInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const userRouter = Router();
userRouter.post("/login", userInstance.login);
userRouter.get("/getprofile/:accountId", userInstance.getProfile);
userRouter.put("/updateprofile", userInstance.updateProfile);
userRouter.get("/readcourse", authenToken, userInstance.readCourse);

// -----------------------------------------------
export { userRouter };
