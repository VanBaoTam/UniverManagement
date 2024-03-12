import { Routes, Route } from "react-router-dom";
import SubjectAttendanceStudent from "../pages/student/SubjectAttendanceStudent";
import InformationStudent from "../pages/student/InformationStudent";
import ChangePasswordStudent from "../pages/student/ChangePasswordStudent";
function StudentRoutes() {
  return (
    <Routes>
      <Route
        path="/subject-attendance"
        element={<SubjectAttendanceStudent />}
      />
      <Route path="/information" element={<InformationStudent />} />
      <Route path="/change-password" element={<ChangePasswordStudent />} />
    </Routes>
  );
}
export default StudentRoutes;
