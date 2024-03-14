import { Routes, Route } from "react-router-dom";
import SubjectAttendanceStudent from "@pages/student/subject-attendance";
import InformationStudent from "@pages/student/information";
import ChangePasswordStudent from "@pages/student/change-password";
import StudentRestrict from "./student-restrict";
function StudentRoutes() {
  return (
    <Routes>
      <Route
        path="/subject-attendance"
        element={
          <StudentRestrict>
            <SubjectAttendanceStudent />
          </StudentRestrict>
        }
      />
      <Route
        path="/information"
        element={
          <StudentRestrict>
            <InformationStudent />
          </StudentRestrict>
        }
      />
      <Route
        path="/change-password"
        element={
          <StudentRestrict>
            <ChangePasswordStudent />
          </StudentRestrict>
        }
      />
    </Routes>
  );
}
export default StudentRoutes;
