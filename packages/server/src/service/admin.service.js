import { google } from "googleapis";
import credentials from "../constants/univer-management-3379390da56d.json" assert { type: "json" };

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
            const title = req.body.title; // Lấy tiêu đề từ body của yêu cầu
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

    async updateCourse(req, res) {}
    async deleteCourse(req, res) {}
}

export const adminServiceInstance = AdminService.getInstance();
