import { userServiceInstance } from "../service/index.js";

//------------------------------------------------
export class UserController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    //-----------------------------------------------
    async login(req, res) {
        return await userServiceInstance.login(req, res);
    }

    async getProfile(req, res) {
        return await userServiceInstance.getProfile(req, res);
    }
    async updateProfile(req, res) {
        return await userServiceInstance.updateProfile(req, res);
    }
    async readCourse(req, res) {
        return await userServiceInstance.readCourse(req, res);
    }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
