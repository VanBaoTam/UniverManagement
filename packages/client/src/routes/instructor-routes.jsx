import { Routes, Route } from "react-router-dom";
import AttendanceFaceInstructor from "../pages/instructor/AttendanceFaceInstructor";
import AttendanceInstructor from "../pages/instructor/AttendanceInstructor";
import InformationInstructor from "../pages/instructor/InformationInstructor";
import ChangePasswordInstructor from "../pages/instructor/ChangePasswordInstructor";
import ListAttendanceInstructor from "../pages/instructor/ListAttendanceInstructor";
function InstructorRoutes() {
  return (
    <Routes>
      <Route path="/attendance" element={<AttendanceInstructor />} />
      <Route path="/information" element={<InformationInstructor />} />
      <Route path="/change-password" element={<ChangePasswordInstructor />} />
      <Route path="/attendance-face" element={<AttendanceFaceInstructor />} />
      <Route path="/list-attendance" element={<ListAttendanceInstructor />} />
    </Routes>
  );
}
export default InstructorRoutes;
