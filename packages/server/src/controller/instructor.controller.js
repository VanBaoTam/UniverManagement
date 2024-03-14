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

    async GetCourses(req, res) {
        return await instructorServiceInstance.GetCourses(req, res);
    }
    async GetAttendancesByCourse(req, res) {
        return await instructorServiceInstance.GetAttendancesByCourse(req, res);
    }
    async Attendance(req, res) {
        return await instructorServiceInstance.Attendance(req, res);
    }
    async GetAttendanceStatus(req, res) {
        return await instructorServiceInstance.GetAttendanceStatus(req, res);
    }
}

//------------------------------------------------
export const instructorInstance = InstructorController.getInstance();
