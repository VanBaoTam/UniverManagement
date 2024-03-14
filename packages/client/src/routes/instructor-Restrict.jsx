import React, { useContext } from "react";
import UserContext from "../contexts/user";
import { Navigate } from "react-router-dom";

export const InstructorRestrict = ({ children }) => {
  const { user } = useContext(UserContext) ?? "";
  return user.role === 3 ? children : <Navigate to="/admin/list-class" />;
};

export default InstructorRestrict;
