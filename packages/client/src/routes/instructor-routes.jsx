import { Routes, Route, Navigate } from "react-router-dom";
import AttendanceFaceInstructor from "@pages/instructor/face-attendance";
import Attendance from "@pages/instructor/attendance";
import InformationInstructor from "@pages/instructor/information";
import ChangePasswordInstructor from "@pages/instructor/change-password";
import ListAttendanceInstructor from "@pages/instructor/list-attendance";
function InstructorRoutes() {
  return (
    <Routes>
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/information" element={<InformationInstructor />} />
      <Route path="/change-password" element={<ChangePasswordInstructor />} />
      <Route path="/attendance-face" element={<AttendanceFaceInstructor />} />
      <Route path="/list-attendance" element={<ListAttendanceInstructor />} />
                <Route path="*" element={<Navigate to="/instructor/attendance" />} />

    </Routes>
  );
}
export default InstructorRoutes;
