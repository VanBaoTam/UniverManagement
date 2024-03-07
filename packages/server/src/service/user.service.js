//------------------------------------------------
export class UserService {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    // -----------------------------------------------
    async login(req, res) {
        const { username, password } = req.body;
    }
    async signUp(req, res) {
        res.send("Sign up user");
    }
    async forgotPassword(req, res) {
        res.send("Forgot password ");
    }
    async getProfile(req, res) {
        res.send("Get profile user ");
    }
    async getAddresses(req, res) {
        res.send("Get address User");
    }
    async updateProfile(req, res) {
        res.send("Update profile user");
    }
    async validate(req, res) {
        res.send("validate account");
    }
}

//------------------------------------------------
export const userServiceInstance = UserService.getInstance();
