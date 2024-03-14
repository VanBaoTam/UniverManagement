import { Routes, Route } from "react-router-dom";
import AttendanceFaceInstructor from "@pages/instructor/face-attendance";
import Attendance from "@pages/instructor/attendance";
import InformationInstructor from "@pages/instructor/information";
import ChangePasswordInstructor from "@pages/instructor/change-password";
import ListAttendanceInstructor from "@pages/instructor/list-attendance";
import InstructorRestrict from "./instructor-Restrict";
function InstructorRoutes() {
  return (
    <Routes>
      <Route
        path="/attendance"
        element={
          <InstructorRestrict>
            <Attendance />
          </InstructorRestrict>
        }
      />
      <Route
        path="/information"
        element={
          <InstructorRestrict>
            <InformationInstructor />
          </InstructorRestrict>
        }
      />
      <Route
        path="/change-password"
        element={
          <InstructorRestrict>
            <ChangePasswordInstructor />
          </InstructorRestrict>
        }
      />
      <Route
        path="/attendance-face"
        element={
          <InstructorRestrict>
            <AttendanceFaceInstructor />
          </InstructorRestrict>
        }
      />
      <Route
        path="/list-attendance"
        element={
          <InstructorRestrict>
            <ListAttendanceInstructor />
          </InstructorRestrict>
        }
      />
    </Routes>
  );
}
export default InstructorRoutes;
