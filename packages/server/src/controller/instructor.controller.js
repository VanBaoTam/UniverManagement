import { instructorServiceInstance } from "../service/index.js";

//------------------------------------------------
export class InstructorController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new InstructorController();
        }
        return this.instance;
    }

    //-----------------------------------------------

    async getAvailableOrders(req, res) {
        return await instructorServiceInstance.getAvailableOrders(req, res);
    }
    async changeOpenTime(req, res) {
        return await instructorServiceInstance.changeOpenTime(req, res);
    }
    async createDiscount(req, res) {
        return await instructorServiceInstance.createDiscount(req, res);
    }
}

//------------------------------------------------
export const instructorInstance = InstructorController.getInstance();
