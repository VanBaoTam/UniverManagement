import { studentServiceInstance } from "../service/index.js";

//------------------------------------------------
export class StudentController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new StudentController();
        }
        return this.instance;
    }

    //-----------------------------------------------
    async getActtendaneByStudent(req, res) {
        return await studentServiceInstance.getActtendaneByStudent(req, res);
    }
    async getCourseByStudent(req, res) {
        return await studentServiceInstance.getCourseByStudent(req, res);
    }
}

//------------------------------------------------
export const studentInstance = StudentController.getInstance();
