import { Router } from "express";
import { suplidorInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const suplidorRouter = Router();
suplidorRouter.get("/", authenToken, suplidorInstance.getAvailableOrders);
suplidorRouter.post("/", authenToken, suplidorInstance.changeOpenTime);
suplidorRouter.post("/", authenToken, suplidorInstance.createDiscount);
// -----------------------------------------------
export { suplidorRouter };
