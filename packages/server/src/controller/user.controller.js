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
    async get(req, res) {
        return await userServiceInstance.get(req, res);
    }

    async login(req, res) {
        return await userServiceInstance.login(req, res);
    }
    async signUp(req, res) {
        return await userServiceInstance.signUp(req, res);
    }
    async forgotPassword(req, res) {
        return await userServiceInstance.forgotPassword(req, res);
    }
    async getProfile(req, res) {
        return await userServiceInstance.getProfile(req, res);
    }
    async getAddresses(req, res) {
        return await userServiceInstance.getAddresses(req, res);
    }
    async updateProfile(req, res) {
        return await userServiceInstance.updateProfile(req, res);
    }
    async validate(req, res) {
        return await userServiceInstance.validate(req, res);
    }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
