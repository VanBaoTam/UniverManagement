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
    async createCourse(req, res) {
        return await adminServiceInstance.createCourse(req, res);
    }
    async getUsers(req, res) {
        return await adminServiceInstance.getUsers(req, res);
    }
    async changeStatusAccount(req, res) {
        return await adminServiceInstance.changeStatusAccount(req, res);
    }
    async getCourseByAdmin(req, res) {
        return await adminServiceInstance.getCourseByAdmin(req, res);
    }
}

//------------------------------------------------
export const adminInstance = AdminController.getInstance();
