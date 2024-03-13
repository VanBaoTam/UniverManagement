import credentials from "../constants/univer-management-3379390da56d.json" assert { type: "json" };
import { google } from "googleapis";
const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
];
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const authClient = await auth.getClient();
const sheets = google.sheets({ version: "v4", auth: authClient });
const drive = google.drive({ version: "v3", auth: authClient });
export { sheets, drive };
