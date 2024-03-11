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
    async post(req, res) {
        return await adminServiceInstance.post(req, res);
    }
}

//------------------------------------------------
export const adminInstance = AdminController.getInstance();
