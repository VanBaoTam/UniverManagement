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
            const { courseId, teacherId, shift, day } = req.params ?? {};
            console.log(courseId, teacherId, shift, day);
            if (!CredentialsValidation("id", accountId))
                return res.status(400).json({ message: "Invalid Account ID" });
            if (!courseId || !teacherId || !day || !shift)
                return res.status(400).json({ message: "Missing value" });
            const studentQuery =
                "select id from students join users on students.user_id = users.user_id where account_id = $1";
            const studentResult = await datasource.query(studentQuery, [
                accountId,
            ]);
            if (!studentResult.rows[0])
                return res.status(404).json({ message: "Student not found!" });
            const courseQuery =
                "select url from instructorscoursesmapping where instructor_id = $1 and course_id = $2 and days = $3 and shift = $4";
            const courseValues = [teacherId, courseId, day, shift];
            const courseResult = await datasource.query(
                courseQuery,
                courseValues
            );
            if (!courseResult.rows[0])
                return res.status(404).json({ message: "Course not found!" });
            const sheetId = courseResult.rows[0].url.split("/d/")[1];
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: `Thứ ${day} - Ca ${shift}`,
            });

            const header = response.data.values[1];

            const listStudent = response.data.values
                .slice(2)
                .map((row) => rowToObject(row, header));
            // console.log(listStudent);
            const studentAttendance = listStudent.find(
                (item) => item["Mã số sinh viên"] == studentResult.rows[0].id
            );
            if (!studentAttendance)
                return res
                    .status(404)
                    .json({ message: "Student not found in course" });
            var student = {};
            student.name = studentAttendance["Tên sinh viên"];
            student.studentId = studentAttendance["Mã số sinh viên"];
            student.class = studentAttendance["Lớp"];
            student.listTimes = [];

            for (var key in studentAttendance) {
                if (key.startsWith("Buổi")) {
                    student.listTimes.push(studentAttendance[key] ?? "");
                }
            }
            return res.status(200).json({ student });
        } catch (error) {
            console.log(error);
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
            const courseResult = await datasource.query(
                courseQuery,
                courseValues
            );
            if (!courseResult.rows[0])
                return res.status(404).json({ message: "Course not found!" });
            const listcourse = courseResult.rows;
            return res.status(200).json({ listcourse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Errors",
            });
        }
    }
}
//----------------------------------------------------------------------
export const studentServiceInstance = StudentService.getInstance();
