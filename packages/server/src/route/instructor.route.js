import { Router } from "express";
import { instructorInstance } from "../controller/index.js";
import { authenToken } from "../middlewares/authen.js";

// -----------------------------------------------
const instructorRouter = Router();
instructorRouter.get(
  "/get-courses",
  authenToken,
  instructorInstance.getCourses
);
instructorRouter.get(
  "/get-attendances-by-course",
  authenToken,
  instructorInstance.GetAttendancesByCourse
);

instructorRouter.post(
  "/attendance",
  authenToken,
  instructorInstance.attendance
);
instructorRouter.get(
    "/get-attendance-status",
    authenToken,
    instructorInstance.GetAttendanceStatus
);
// -----------------------------------------------
export { instructorRouter };
