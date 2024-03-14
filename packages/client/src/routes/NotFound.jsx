import React, { useContext } from "react";
import UserContext from "../contexts/user";
import { Navigate } from "react-router-dom";

export const NotFound = () => {
  const { user } = useContext(UserContext);

  return user.role === 1 ? (
    <Navigate to="/admin/list-courses" />
  ) : user.role === 2 ? (
    <Navigate to="/student/subject-attendance" />
  ) : (
    <Navigate to="/instructor/attendance" />
  );
};

export default NotFound;
