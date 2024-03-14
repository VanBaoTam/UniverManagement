import { createCrypto } from "google-auth-library/build/src/crypto/crypto.js";
import { CredentialsValidation } from "../constants/common.js";
import { datasource } from "../datasource/index.js";
import jwt from "jsonwebtoken";
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
    const isValidUserCredential =
      CredentialsValidation("username", username) &&
      CredentialsValidation("password", password);
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

      if (password !== storedPassword) {
        return res
          .status(401)
          .json({ message: "Username or Password is wrong!" });
      }

      const dataQuery =
        "SELECT account_id, role_id as role ,status FROM accounts WHERE username = $1";

      const dataValues = [username];
      const dataResult = await datasource.query(dataQuery, dataValues);
      if (!dataResult.rows[0])
        return res.status(404).json({ message: "User not found!" });

      if (dataResult.rows[0].status != "active")
        return res.status(403).json("Account Deactivated");
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
      console.log(decodedToken);
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
        email: req.body.email ?? "",
        phoneNumber: req.body.phone_number ?? "",
        address: req.body.address ?? "",
      };
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
      const { password, retypePassword } = req.body ?? {};
      const decodedToken = jwt.verify(
        accessKey.split(" ")[1],
        process.env.SECRET_KEY
      );
      const accountId = decodedToken.accountId;
      if (
        !password ||
        !CredentialsValidation("password", password) ||
        !retypePassword ||
        !CredentialsValidation("password", retypePassword)
      )
        return res
          .status(400)
          .json({ message: "Invalid password or retypePassword" });
      if (password != retypePassword)
        return res.status(400).json({ message: "Password mismatch" });
      const authQuery = "select account_id from accounts where account_id = $1";
      const authValues = [accountId];
      const authResult = await datasource.query(authQuery, authValues);
      if (!authResult.rows[0])
        return res.status(404).json({ message: "Account not found" });
      const updateQuery =
        "update accounts set password = $1 where account_id = $2";
      const updateValues = [password, accountId];
      await datasource.query(updateQuery, updateValues);
      return res.status(200).json({ message: "Password changed successfully" });
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
