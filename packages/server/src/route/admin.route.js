import { Router } from "express";
import { adminInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const adminRouter = Router();
adminRouter.post("/createcourse", adminInstance.createCourse);
adminRouter.get("/getuser/:accountId", authenToken, adminInstance.getUsers);
// -----------------------------------------------
export { adminRouter };
