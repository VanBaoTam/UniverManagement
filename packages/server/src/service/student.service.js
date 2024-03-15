import { sheets, drive } from "../utils/authSheet.js";
import { CredentialsValidation } from "../constants/common.js";
import { datasource } from "../datasource/index.js";
import jwt from "jsonwebtoken";
import { rowToObject } from "../utils/changeToObject.js";
export class StudentService {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StudentService();
    }
    return this.instance;
  }
  async GetAttendanceByStudentId(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      //-----------------------------------------------------------

      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });

      const studentQuery =
        "select student_id,id from students join users on students.user_id = users.user_id where account_id = $1";
      const studentResult = await datasource.query(studentQuery, [accountId]);
      if (!studentResult.rows[0])
        return res.status(404).json({ message: "Student not found!" });
      const courseQuery =
        "SELECT course_title,name,s.course_id as courseId,s.days as day,s.shift as shift,i.instructor_id,url FROM public.studentscoursesmapping as s join instructorscoursesmapping as ism on s.course_id = ism.course_id join instructors as i on ism.instructor_id = i.instructor_id join users on i.user_id = users.user_id join accounts on accounts.account_id = users.account_id join profiles on profiles.profile_id = accounts.profile_id join courses on courses.course_id = ism.course_id where s.student_id = $1";
      const courseResult = await datasource.query(courseQuery, [
        studentResult.rows[0].student_id,
      ]);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });

      ////console.log(courseResult.rows);
      const result = await Promise.all(
        courseResult.rows.map(async (course) => {
          const sheetId = course.url.split("/d/")[1];
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `Thứ ${course.day} - Ca ${course.shift}`,
          });

          const header = response.data.values[1];

          const listStudent = response.data.values
            .slice(2)
            .map((row) => rowToObject(row, header));
          //   //console.log(listStudent);
          const studentAttendance = listStudent.find(
            (item) => item["Mã số sinh viên"] == studentResult.rows[0].id
          );
          //  //console.log(studentAttendance);
          //if (!studentAttendance) return;
          var student = {};
          student.teacherName = course.name;
          student.courseId = course.courseid;
          student.courseTitle = course.course_title;
          student.day = course.day;
          student.shift = course.shift;
          student.listTimes = [];

          for (var key in studentAttendance) {
            if (key.startsWith("Buổi")) {
              student.listTimes.push(studentAttendance[key]);
            }
          }
          //console.log(student);
          return student;
        })
      );
      //console.log(result);
      // //console.log(listStudent);

      return res.status(200).json({ result });
    } catch (error) {
      //console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }
  async GetCourseByStudentId(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });
      const courseQuery = `select scm.course_id, courses.course_title, ism.days, ism.shift, ism.instructor_id from accounts join users on users.account_id = accounts.account_id
      join students on students.user_id = users.user_id 
      join studentscoursesmapping as scm on scm.student_id = students.student_id 
      join courses on courses.course_id = scm.course_id
      join instructorscoursesmapping as ism on ism.course_id = courses.course_id
      where accounts.account_id = $1`;
      const courseValues = [accountId];
      const courseResult = await datasource.query(courseQuery, courseValues);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });
      const listcourse = courseResult.rows;
      return res.status(200).json({ listcourse });
    } catch (error) {
      //console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }
}
//----------------------------------------------------------------------
export const studentServiceInstance = StudentService.getInstance();
