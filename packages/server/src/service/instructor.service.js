import { datasource } from "../datasource/index.js";
import { sheets } from "../utils/authSheet.js";
import { CredentialsValidation } from "../constants/common.js";
import jwt from "jsonwebtoken";
import { rowToObject } from "../utils/changeToObject.js";
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

  async getCourses(req, res) {
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
      const teacherQuery =
        "select instructor_id from accounts join users on accounts.account_id = users.account_id join instructors on instructors.user_id = users.user_id where accounts.account_id = $1";
      const teacherValues = [accountId];
      const teacherResult = await datasource.query(teacherQuery, teacherValues);
      if (!teacherResult.rows[0])
        return res.status(404).json({ message: "Teacher not found!" });
      const courseQuery =
        "select courses.course_id,course_title,start_date,end_date,shift,days,url from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id  where instructor_id = $1";
      const courseValue = [teacherResult.rows[0].instructor_id];
      const courseResult = await datasource.query(courseQuery, courseValue);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });
      return res
        .status(200)
        .json({ message: "ok", listCourse: courseResult.rows });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async GetAttendancesByCourse(req, res) {
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
      const urlString = req.url;

      const queryString = urlString.split("?")[1];

      const paramsArray = queryString.split("&");
      const params = {};
      paramsArray.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
      });

      const dayValue = params.days;
      const shiftValue = params.shifts;
      const courseIdValue = params.courseId;
      if (dayValue < 2 || dayValue > 7 || shiftValue < 1 || shiftValue > 4)
        return res.status(400).json({ message: "Invalid day or shift" });
      const courseQuery =
        "select times, url from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id where courses.course_id = $1 and days = $2 and shift = $3";
      const courseValue = [courseIdValue, dayValue, shiftValue];
      const courseResult = await datasource.query(courseQuery, courseValue);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });
      const sheetId = courseResult.rows[0].url.split("/d/")[1];
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `Thứ ${dayValue} - Ca ${shiftValue}`,
      });
      const header = response.data.values[1];

      const objects = response.data.values
        .slice(2)
        .map((row) => rowToObject(row, header));
      const listStudent = objects.map((ob) => {
        var student = {};
        var times = 0;
        student.name = ob["Tên sinh viên"];
        student.studentId = ob["Mã số sinh viên"];
        student.listTimes = [];
        student.class = ob["Lớp"];
        student.times = courseResult.rows[0].times;
        for (var key in ob) {
          if (key.startsWith("Buổi")) {
            student.listTimes.push(ob[key]);
            if (ob[key] == "x") times++;
          }
        }

        return student;
      });
      return res.status(200).json({ listStudent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async attendance(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      const { courseId, studentIds, shifts, days } = req.body ?? {};
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });
      const teacherQuery =
        "select instructor_id from instructors join users on users.user_id = instructors.user_id where account_id = $1";
      const teacherValue = [accountId];
      const teacherResult = await datasource.query(teacherQuery, teacherValue);

      if (!teacherResult.rows[0])
        return res.status(404).json({ message: "Teacher not found!" });
      ////console.log(courseId, studentIds, shifts, days);
      const courseQuery =
        "select times, url from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id where courses.course_id = $1 and days = $2 and shift = $3 and instructor_id = $4";
      const courseValue = [
        courseId,
        days,
        shifts,
        teacherResult.rows[0].instructor_id,
      ];
      const courseResult = await datasource.query(courseQuery, courseValue);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });
      const sheetId = courseResult.rows[0].url.split("/d/")[1];
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `Thứ ${days} - Ca ${shifts}`,
      });
      const checkAttendance = response.data.values[0];
      if (checkAttendance.length - 3 >= courseResult.rows[0].tomes)
        return res.status(400).json({
          message: "exceeded the predetermined session limit",
        });
      var request = {
        spreadsheetId: sheetId,
        range: `Thứ ${days} - Ca ${shifts}!${String.fromCharCode(
          65 + checkAttendance.length
        )}${1}`,
        valueInputOption: "RAW",
        resource: { values: [["x"]] },
      };
      await sheets.spreadsheets.values.update(request);

      const listStudentId = response.data.values.slice(2).map((row) => row[0]);

      await Promise.all(
        listStudentId.map(async (id, index) => {
          var flag = false;
          for (var i = 0; i < studentIds.length; i++) {
            if (studentIds[i] == id) {
              flag = true;
              break;
            }
          }
          var value;
          if (flag) {
            value = "x";
          } else value = "o";
          var request = {
            spreadsheetId: sheetId,
            range: `Thứ ${days} - Ca ${shifts}!${String.fromCharCode(
              65 + checkAttendance.length
            )}${index + 3}`,
            valueInputOption: "RAW",
            resource: { values: [[value]] },
          };
          await sheets.spreadsheets.values.update(request);
          return true;
        })
      );
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async GetAttendanceStatus(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      //---------------------------------------------------------
      const urlString = req.url;

      const queryString = urlString.split("?")[1];
      if (!queryString)
        return res.status(400).json({ message: "Invalid Params" });
      const paramsArray = queryString.split("&");
      const params = {};
      paramsArray.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
      });
      //--------------------------------------------------------
      const dayValue = params.days;
      const shiftValue = params.shifts;
      const courseIdValue = params.courseId;
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });
      if (dayValue < 2 || dayValue > 7 || shiftValue < 1 || shiftValue > 4)
        return res.status(400).json({ message: "Invalid day or shift" });
      const teacherQuery =
        "select instructor_id from instructors join users on users.user_id = instructors.user_id where account_id = $1";
      const teacherValues = [accountId];
      const teacherResult = await datasource.query(teacherQuery, teacherValues);
      if (!teacherResult.rows[0])
        return res.status(404).json({ message: "Teacher not found!" });
      const courseQuery =
        "select * from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id where courses.course_id = $1 and days = $2 and shift = $3 and instructor_id = $4";
      const courseValue = [
        courseIdValue,
        dayValue,
        shiftValue,
        teacherResult.rows[0].instructor_id,
      ];
      // //console.log(courseValue);
      // //console.log(courseValue);
      const courseResult = await datasource.query(courseQuery, courseValue);
      // //console.log(courseResult.rows);
      if (!courseResult.rows[0])
        return res.status(404).json({ message: "Course not found!" });
      const sheetId = courseResult.rows[0].url.split("/d/")[1];
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `Thứ ${dayValue} - Ca ${shiftValue}`,
      });
      const checkAttendance = response.data.values[0].length - 2;

      const header = response.data.values[1];

      const listStudent = response.data.values
        .slice(2)
        .map((row) => rowToObject(row, header));
      const buoi = `Buổi ${checkAttendance}`;
      const attendanceStatus = listStudent.map((item) => {
        return {
          studentId: item["Mã số sinh viên"],
          studentName: item["Tên sinh viên"],
          studentClass: item["Lớp"],
          isAttendance: item[buoi] == "x",
        };
      });
      return res.status(200).json({ attendanceStatus });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

//------------------------------------------------
export const instructorServiceInstance = InstructorService.getInstance();
