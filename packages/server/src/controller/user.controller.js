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
    async Login(req, res) {
        return await userServiceInstance.Login(req, res);
    }

    async GetProfile(req, res) {
        return await userServiceInstance.GetProfile(req, res);
    }
    async UpdateProfile(req, res) {
        return await userServiceInstance.UpdateProfile(req, res);
    }
    async ChangePassword(req, res) {
        return await userServiceInstance.ChangePassword(req, res);
    }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
