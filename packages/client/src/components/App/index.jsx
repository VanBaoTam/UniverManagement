import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../pages/home";
import AdminRoutes from "@routes/admin-routes";
import StudentRoutes from "@routes/student-routes";
import InstructorRoutes from "@routes/instructor-routes";
import { PERMISSIONS } from "@constants/common";
import React, { useContext, useEffect } from "react";
import UserContext from "@contexts/user";
import { Navigate } from "react-router-dom";

function Apps() {
  const { user } = useContext(UserContext) ?? {};
  const { role } = user ?? {};
  return (
    <Routes>
      {role === PERMISSIONS.STUDENT && (
        <>
          {" "}
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route
            path="*"
            element={<Navigate to="/student/subject-attendance" />}
          />
        </>
      )}
      {role === PERMISSIONS.ADMIN && (
        <>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<Navigate to="/admin/list-class" />} />
        </>
      )}
      {role === PERMISSIONS.TEACHER && (
        <>
          <Route path="/instructor/*" element={<InstructorRoutes />} />
          <Route path="*" element={<Navigate to="/instructor/attendance" />} />
        </>
      )}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Apps;
