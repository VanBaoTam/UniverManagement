import React, { useContext } from "react";
import UserContext from "../contexts/user";
import { Navigate } from "react-router-dom";

export const StudentRestrict = ({ children }) => {
  const { user } = useContext(UserContext) ?? "";
  return user.role === 2 ? children : <Navigate to="/instructor/attendance" />;
};

export default StudentRestrict;
