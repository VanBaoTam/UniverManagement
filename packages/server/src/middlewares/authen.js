import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//------------------------------------
export function authenToken(req, res, next) {
    const authorizationHeader = req.headers["authorization"] ?? "";
    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let token = "";
    if (authorizationHeader.includes(" ")) {
        token = authorizationHeader.split(" ")[1];
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let isTokenValid = true;
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
        if (error) {
            isTokenValid = false;
        }
    });

    if (!isTokenValid) {
        return res.status(401).json({ message: "Forbidden" });
    }
    next();
}
