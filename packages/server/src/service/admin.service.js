import { google } from "googleapis";
import credentials from "../constants/univer-management-3379390da56d.json" assert { type: "json" };
import { CredentialsValidation } from "../constants/common.js";
import { datasource } from "../datasource/index.js";

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
            const title = req.body.title;
            const SCOPES = [
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive.file",
            ];
            const auth = new google.auth.GoogleAuth({
                credentials,
                scopes: SCOPES,
            });

            const authClient = await auth.getClient();
            const sheets = google.sheets({
                version: "v4",
                auth: authClient,
            });

            const response = await sheets.spreadsheets.create({
                requestBody: {
                    properties: {
                        title: title,
                    },
                },
            });

            const spreadsheetId = response.data.spreadsheetId;

            const drive = google.drive({ version: "v3", auth: authClient });

            await drive.permissions.create({
                resource: {
                    role: "writer",
                    type: "user",
                    emailAddress: "duongtrungquoc2002@gmail.com",
                },
                fileId: spreadsheetId,
            });

            console.log(`Created new Google Sheet with ID: ${spreadsheetId}`);
            res.status(200).json({
                linkSheet: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async getUsers(req, res) {
        const account_id = req.params.accountId;

        if (!CredentialsValidation("id", account_id))
            return res.status(400).json({ message: "Invalid Account id" });
        const dataQuery =
            "select account_id,role_id,name,email,phone_number from accounts join profiles on accounts.profile_id = profiles.profile_id";
        const dataValues = await datasource.query(dataQuery);
        if (!dataValues.rows[0])
            return res.status(404).json({ message: "Profile not found" });
        const userList = dataValues.rows.map((user) => {
            return {
                accountId: user.account_id,
                role: user.role_id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phone_number,
            };
        });
        return res
            .status(200)
            .json({ message: "Get list successfully", userList });
    }
    async deleteCourse(req, res) {}
}

export const adminServiceInstance = AdminService.getInstance();
