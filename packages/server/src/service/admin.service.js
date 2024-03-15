import { sheets, drive } from "../utils/authSheet.js";
import { CredentialsValidation } from "../constants/common.js";
import { datasource } from "../datasource/index.js";
import jwt from "jsonwebtoken";
export class AdminService {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AdminService();
    }
    return this.instance;
  }

  async createCourse(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey)
        return res.status(400).json({ message: "Invalid accessKey" });

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;

      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });
      const { teacherId, courseId, schedule, startDate, endDate, times } =
        req.body ?? {};

      for (const item of schedule) {
        if (item.day < 2 || item.day > 7 || item.shift < 1 || item.shift > 4) {
          return res.status(400).json({ message: "Invalid day or shift" });
        }
      }

      const courseQuery =
        "select course_title from courses where course_id = $1";
      const courseResult = await datasource.query(courseQuery, [courseId]);

      const teacherQuery =
        "select instructor_id,name,email from profiles join accounts on profiles.profile_id = accounts.profile_id join users on accounts.account_id = users.account_id join instructors on instructors.user_id = users.user_id where instructor_id = $1";
      const teacherResult = await datasource.query(teacherQuery, [teacherId]);

      if (!teacherResult.rows[0])
        return res.status(404).json({ message: "Teacher not found" });
      for (const item of schedule) {
        const courseMappingQuery =
          "select * from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id where  days = $1 and shift = $2 and instructor_id = $3";
        const courseMappingValue = [item.day, item.shift, teacherId];
        const courseMappingResult = await datasource.query(
          courseMappingQuery,
          courseMappingValue
        );
        if (courseMappingResult.rows[0])
          return res.status(400).json({
            message: "Course already exists!",
            course: courseMappingResult.rows[0],
          });
      }

      var resource;
      const defaultData = [
        ["", "", "Đã học"],
        ["Mã số sinh viên", "Tên sinh viên", "Lớp"],
      ];
      for (var i = 1; i <= times; i++) {
        defaultData[1].push(`Buổi ${i}`);
      }

      if (schedule.length > 1) {
        resource = {
          requests: [
            {
              addSheet: {
                properties: {
                  title: `Thứ ${schedule[0].day} - Ca ${schedule[0].shift}`,
                },
              },
            },
            {
              addSheet: {
                properties: {
                  title: `Thứ ${schedule[1].day} - Ca ${schedule[1].shift}`,
                },
              },
            },
            {
              deleteSheet: {
                sheetId: 0,
              },
            },
          ],
        };
      } else {
        resource = {
          requests: [
            {
              addSheet: {
                properties: {
                  title: `Thứ ${schedule[0].day} - Ca ${schedule[0].shift}`,
                },
              },
            },
            {
              deleteSheet: {
                sheetId: 0,
              },
            },
          ],
        };
      }

      const title = `${teacherResult.rows[0].name} - ${courseResult.rows[0].course_title}`;
      const response = await sheets.spreadsheets.create({
        requestBody: { properties: { title: title } },
      });

      const spreadsheetId = response.data.spreadsheetId;
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource,
      });

      const { data } = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId,
        fields: "sheets.properties.title",
      });

      const updatePromises = data.sheets.map(async (sheet) => {
        const updateRequest = {
          spreadsheetId: spreadsheetId,
          resource: {
            valueInputOption: "RAW",
            data: [
              {
                range: sheet.properties.title,
                values: defaultData,
              },
            ],
          },
        };

        await sheets.spreadsheets.values.batchUpdate(updateRequest);
      });
      await drive.permissions.create({
        resource: {
          role: "writer",
          type: "anyone",
        },
        fileId: spreadsheetId,
      });
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
      const insertQuery =
        "Insert into instructorscoursesmapping (instructor_id,course_id,url,days,shift,start_date,end_date) values ($1,$2,$3,$4,$5,$6,$7)";
      for (let element of schedule) {
        var insertValues = [
          teacherId,
          courseId,
          url,
          element.day,
          element.shift,
          startDate,
          endDate,
        ];
        await datasource.query(insertQuery, insertValues);
      }

      res.status(201).json({
        message: "Created",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getUsers(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account id" });
      const dataQuery =
        "select account_id,role_id,name,email,phone_number,status from accounts join profiles on accounts.profile_id = profiles.profile_id";
      const dataValues = await datasource.query(dataQuery);
      if (!dataValues.rows[0])
        return res.status(404).json({ message: "Profile not found" });
      const userList = dataValues.rows.map((user) => {
        return {
          id: user.account_id, 
          accountId: user.account_id,
          role: user.role_id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phone_number,
          status: user.status,
        };
      });
      return res
        .status(200)
        .json({ message: "Get list successfully", userList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async changeStatusAccount(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account id" });
      const account = req.params.account;
      const accountQuery =
        "select account_id,status from accounts where account_id = $1";
      const accountResult = await datasource.query(accountQuery, [account]);
      var status;
      if (!accountResult.rows[0])
        return res.status(404).json({ message: "Account not found!" });
      if (accountResult.rows[0].status == "active") status = "in_active";
      else status = "active";
      const updateQuery =
        "update accounts set status = $1 where account_id = $2";
      const updateValues = [status, account];
      await datasource.query(updateQuery, updateValues);
      return res.status(200).json({ message: " updated status successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getCourseByAdmin(req, res) {
    const accessKey = req.headers["authorization"] ?? "";
    if (!accessKey) return res.status(400).json("Invalid accessKey");

    const decodedToken = jwt.verify(
      accessKey.split(" ")[1],
      process.env.SECRET_KEY
    );
    const accountId = decodedToken.accountId;
    if (!CredentialsValidation("id", accountId))
      return res.status(400).json({ message: "Invalid Account id" });
    const courseQuery =
      "select courses.course_id,course_title,start_date,end_date,shift,days,url from instructorscoursesmapping join courses on instructorscoursesmapping.course_id = courses.course_id ";

    const courseResult = await datasource.query(courseQuery);
    if (!courseResult.rows[0])
      return res.status(404).json({ message: "Course not found!" });
    return res
      .status(200)
      .json({ message: "ok", listCourse: courseResult.rows });
  }
}

export const adminServiceInstance = AdminService.getInstance();
