//------------------------------------------------
export class AdminService {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new AdminService();
        }
        return this.instance;
    }

    // -----------------------------------------------
    async changeStatusAccount(req, res) {
        res.send("Ban acc :D");
    }
    async getListSuplidor(req, res) {
        res.send("get list suplidor");
    }
}

//------------------------------------------------
export const adminServiceInstance = AdminService.getInstance();
