import { Router } from "express";
import { adminInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const adminRouter = Router();
adminRouter.post("/create-course", adminInstance.createCourse);
adminRouter.get("/get-user", authenToken, adminInstance.getUsers);
adminRouter.get(
    "/change-status-account/:account/",
    authenToken,
    adminInstance.changeStatusAccount
);
adminRouter.get(
    "/get-course-by-admin",
    authenToken,
    adminInstance.getCourseByAdmin
);
// -----------------------------------------------
export { adminRouter };
