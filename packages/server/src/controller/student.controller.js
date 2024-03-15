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
  async GetAttendanceByStudentId(req, res) {
    return await studentServiceInstance.GetAttendanceByStudentId(req, res);
  }
  async GetCourseByStudentId(req, res) {
    return await studentServiceInstance.GetCourseByStudentId(req, res);
  }
}

//------------------------------------------------
export const studentInstance = StudentController.getInstance();
