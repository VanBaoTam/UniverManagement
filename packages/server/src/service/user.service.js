//import { createCrypto } from "google-auth-library/build/src/crypto/crypto.js";
import { CredentialsValidation } from "../constants/common.js";
import { datasource } from "../datasource/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//------------------------------------------------
export class UserService {
  static instance;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  // -----------------------------------------------
  async login(req, res) {
    const { username, password } = req.body ?? {};
    if (!username || !password)
      return res.status(400).json({ message: "Invalid Username or Password" });
    const isValidUserCredential = CredentialsValidation("password", password);
    if (!isValidUserCredential)
      return res.status(400).json({ message: "Invalid User Credential" });
    try {
      const authQuery = "select password from accounts where username = $1";
      const authValues = [username];
      const authResult = await datasource.query(authQuery, authValues);
      if (!authResult.rows.length) {
        return res.status(404).json({
          message: "User not found!",
        });
      }
      const storedPassword = authResult.rows[0].password;

      const checkpassword = await bcrypt.compare(password, storedPassword);
      if (!checkpassword)
        return res
          .status(400)
          .json({ message: "Tài khoản hoặc Mật khẩu không đúng" });

      const dataQuery =
        "SELECT account_id, role_id as role ,status FROM accounts WHERE username = $1";

      const dataValues = [username];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0])
        return res.status(404).json({ message: "User not found!" });

      if (dataResult.rows[0].status != "active")
        return res.status(403).json({ message: "Account Deactivated" });
      const data = {
        accountId: dataResult.rows[0].account_id,
      };

      let expiresIn;
      if (dataResult.rows[0].role === 1) expiresIn = "30m";
      else expiresIn = "1d";

      const token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: expiresIn,
      });
      console.log(data);
      return res.status(200).json({
        message: "Login Successful",
        role: dataResult.rows[0].role,
        accountId: dataResult.rows[0].account_id,
        token: { value: token, type: "Bearer" },
        expiresIn: expiresIn,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }

  async getProfile(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      //  console.log(decodedToken);
      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account ID" });
      const dataQuery =
        "select name,phone_number,address,email from accounts join profiles on accounts.profile_id=profiles.profile_id where account_id = $1";
      const dataValues = [accountId];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0])
        return res.status(404).json({ message: "Profile not found!" });
      res.status(200).json({
        name: dataResult.rows[0].name,
        address: dataResult.rows[0].address,
        phoneNumber: dataResult.rows[0].phone_number,
        email: dataResult.rows[0].email,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");
      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;

      if (!CredentialsValidation("id", accountId))
        return res.status(400).json({ message: "Invalid Account Id" });

      const dataQuery =
        "select profiles.profile_id, phone_number,address,email from accounts join profiles on accounts.profile_id=profiles.profile_id where account_id = $1";
      const dataValues = [accountId];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0])
        return res.status(404).json({ message: "Profile not found!" });
      const profile = {
        profile_id: dataResult.rows[0].profile_id,
        email: req.body.data.email ?? "",
        phoneNumber: req.body.data.phoneNumber ?? "",
        address: req.body.data.address ?? "",
      };
      console.log("PROFILE", profile);
      if (
        !CredentialsValidation("email", profile.email) ||
        !CredentialsValidation("phone", profile.phoneNumber)
      )
        return res
          .status(400)
          .json({ message: "Invalid email or phone number" });
      let updateQuery = "UPDATE profiles SET";
      let updateValues = [];
      let updateIndex = 1;
      if (profile.email) {
        updateQuery += ` email = $${updateIndex},`;
        updateValues.push(profile.email);
        updateIndex++;
      }
      if (profile.phoneNumber) {
        updateQuery += ` phone_number = $${updateIndex},`;
        updateValues.push(profile.phoneNumber);
        updateIndex++;
      }
      if (profile.address) {
        updateQuery += ` address = $${updateIndex},`;
        updateValues.push(profile.address);
        updateIndex++;
      }
      if (updateIndex === 1)
        return res.status(305).json({ message: " Not Modified" });
      updateQuery = updateQuery.replace(/,\s*$/, "");
      updateQuery += " WHERE profile_id = $" + updateIndex;
      updateValues.push(profile.profile_id);
      await datasource.query(updateQuery, updateValues);
      return res.status(200).json("Profile updated successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }
  async changePassword(req, res) {
    try {
      const accessKey = req.headers["authorization"] ?? "";
      if (!accessKey) return res.status(400).json("Invalid accessKey");

      const { oldPassword, password, retypePassword } = req.body ?? {};
      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;

      if (!oldPassword || !password || !retypePassword) {
        return res.status(400).json({
          message:
            "Please provide old password, new password, and retype password",
        });
      }

      const authQuery = "SELECT password FROM accounts WHERE account_id = $1";
      const authValues = [accountId];
      const authResult = await datasource.query(authQuery, authValues);
      if (!authResult.rows[0]) {
        return res.status(404).json({ message: "Account not found" });
      }

      const storedPassword = authResult.rows[0].password;
      const checkpassword = await bcrypt.compare(oldPassword, storedPassword);
      if (!checkpassword)
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
      if (
        !CredentialsValidation("password", password) ||
        !CredentialsValidation("password", retypePassword)
      ) {
        return res.status(400).json({
          message: "Invalid new password or retype password",
        });
      }
      if (password !== retypePassword) {
        return res.status(400).json({
          message: "Mật khẩu mới không trùng khớp",
        });
      }
      if (password.length < 8 || password.length > 50)
        return res.status(400).json({ message: "Mật khẩu dài từ 8-50 ký tự" });
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.error("Lỗi khi mã hóa mật khẩu:", err);
          return;
        }

        const updateQuery =
          "UPDATE accounts SET password = $1 WHERE account_id = $2";
        const updateValues = [hash, accountId];
        await datasource.query(updateQuery, updateValues);
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Errors",
      });
    }
  }
}

//------------------------------------------------
export const userServiceInstance = UserService.getInstance();
