import { suplidorServiceInstance } from "../service/index.js";

//------------------------------------------------
export class SuplidorController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new SuplidorController();
        }
        return this.instance;
    }

    //-----------------------------------------------

    async getAvailableOrders(req, res) {
        return await suplidorServiceInstance.getAvailableOrders(req, res);
    }
    async changeOpenTime(req, res) {
        return await suplidorServiceInstance.changeOpenTime(req, res);
    }
    async createDiscount(req, res) {
        return await suplidorServiceInstance.createDiscount(req, res);
    }
}

//------------------------------------------------
export const suplidorInstance = SuplidorController.getInstance();
