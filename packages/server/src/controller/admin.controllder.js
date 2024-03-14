import { adminServiceInstance } from "../service/index.js";

//------------------------------------------------
export class AdminController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new AdminController();
        }
        return this.instance;
    }

    //-----------------------------------------------
    async CreateCourse(req, res) {
        return await adminServiceInstance.CreateCourse(req, res);
    }
    async GetUsers(req, res) {
        return await adminServiceInstance.GetUsers(req, res);
    }
}

//------------------------------------------------
export const adminInstance = AdminController.getInstance();
