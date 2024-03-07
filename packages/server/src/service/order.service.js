//------------------------------------------------
export class OrderService {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new OrderService();
        }
        return this.instance;
    }

    // -----------------------------------------------
    async getListOrder(req, res) {
        res.send("List order");
    }
    async createOrder(req, res) {
        res.send("new order");
    }
    async updateStatusOrder(req, res) {
        res.send("Update status order");
    }
    async cancelOrder(req, res) {
        res.send("Cancel order");
    }
}

//------------------------------------------------
export const orderServiceInstance = OrderService.getInstance();
