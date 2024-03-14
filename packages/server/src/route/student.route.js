import { Router } from "express";
import { studentInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const studentRouter = Router();
studentRouter.get(
    "/get-acttendane-by-student/:courseId/:teacherId/:day/:shift",
    authenToken,
    studentInstance.getActtendaneByStudent
);
studentRouter.get(
    "/get-course-by-student",
    authenToken,
    studentInstance.getCourseByStudent
);

// -----------------------------------------------
export { studentRouter };
