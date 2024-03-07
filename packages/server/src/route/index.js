import { adminRouter } from "./admin.route.js";
import { foodRouter } from "./food.route.js";
import { suplidorRouter } from "./suplidor.route.js";
import { userRouter } from "./user.route.js";
export const routes = () => {
    app.use("/v1/api/admin", adminRouter);
    app.use("/v1/api/food", foodRouter);
    app.use("/v1/api/suplidor", suplidorRouter);
    app.use("/v1/api/user", userRouter);
};
