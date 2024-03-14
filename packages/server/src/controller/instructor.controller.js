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

  async getCourses(req, res) {
    return await instructorServiceInstance.getCourses(req, res);
  }
  async GetAttendancesByCourse(req, res) {
    return await instructorServiceInstance.GetAttendancesByCourse(req, res);
  }
  async attendance(req, res) {
    return await instructorServiceInstance.attendance(req, res);
  }
  async GetAttendanceStatus(req, res) {
    return await instructorServiceInstance.GetAttendanceStatus(req, res);
  }
}

//------------------------------------------------
export const instructorInstance = InstructorController.getInstance();
