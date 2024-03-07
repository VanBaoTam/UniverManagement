import { Router } from "express";
import { adminInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const adminRouter = Router();
adminRouter.get("/", authenToken, adminInstance.get);
adminRouter.post("/", authenToken, adminInstance.post);

// -----------------------------------------------
export { adminRouter };
