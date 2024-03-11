//------------------------------------------------
export class InstructorService {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new InstructorService();
        }
        return this.instance;
    }

    // -----------------------------------------------

    async statistic(req, res) {
        res.send(" change open time");
    }
    async manualAttendance(req, res) {
        res.send(" change open time");
    }
    async openAttendance(req, res) {
        res.send(" change open time");
    }
}

//------------------------------------------------
export const instructorServiceInstance = InstructorService.getInstance();
