import { adminRouter } from "./admin.route.js";
import { instructorRouter } from "./instructor.route.js";
import { userRouter } from "./user.route.js";
export const routes = (app) => {
    app.use("/v1/api/admin", adminRouter);

    app.use("/v1/api/instructor", instructorRouter);
    app.use("/v1/api/user", userRouter);
};
