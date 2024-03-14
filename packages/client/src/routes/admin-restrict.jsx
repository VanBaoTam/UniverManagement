import React, { useContext } from "react";
import UserContext from "../contexts/user";
import { Navigate } from "react-router-dom";

export const AdminRestrict = ({ children }) => {
  const { user } = useContext(UserContext);

  return user.role === 1 ? (
    children
  ) : (
    <Navigate to="/student/subject-attendance" />
  );
};

export default AdminRestrict;
