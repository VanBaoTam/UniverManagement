import { Routes, Route, Navigate } from "react-router-dom";
import SubjectAttendanceStudent from "@pages/student/subject-attendance";
import InformationStudent from "@pages/student/information";
import ChangePasswordStudent from "@pages/student/change-password";
function StudentRoutes() {
  return (
    <Routes>
      <Route
        path="/subject-attendance"
        element={<SubjectAttendanceStudent />}
      />
      <Route path="/information" element={<InformationStudent />} />
      <Route path="/change-password" element={<ChangePasswordStudent />} />
      <Route path="*" element={<Navigate to="/student/subject-attendance" />} />
    </Routes>
  );
}
export default StudentRoutes;
