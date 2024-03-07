//------------------------------------------------
export class SuplidorService {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new SuplidorService();
        }
        return this.instance;
    }

    // -----------------------------------------------
    async getAvailableOrders(req, res) {
        res.send(" get available orders");
    }
    async changeOpenTime(req, res) {
        res.send(" change open time");
    }
    async createDiscount(req, res) {
        res.send("create Discount");
    }
}

//------------------------------------------------
export const suplidorServiceInstance = SuplidorService.getInstance();
