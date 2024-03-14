import { Router } from "express";
import { adminInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const adminRouter = Router();
adminRouter.post("/create-course", adminInstance.CreateCourse);
adminRouter.get("/get-user/:accountId", authenToken, adminInstance.GetUsers);
// -----------------------------------------------
export { adminRouter };
