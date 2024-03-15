import { Router } from "express";
import { studentInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const studentRouter = Router();
studentRouter.get(
  "/get-attendance-by-student-id/:courseId/:teacherId/:day/:shift",
  authenToken,
  studentInstance.GetAttendanceByStudentId
);
studentRouter.get(
  "/get-course-by-student-id",
  authenToken,
  studentInstance.GetCourseByStudentId
);

// -----------------------------------------------
export { studentRouter };
