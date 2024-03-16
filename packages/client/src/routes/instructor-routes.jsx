import { Routes, Route, Navigate } from "react-router-dom";
import AttendanceFaceInstructor from "@pages/instructor/face-attendance";
import Attendance from "@pages/instructor/attendance";
import InformationInstructor from "@pages/instructor/information";
import ChangePasswordInstructor from "@pages/instructor/change-password";
import ListAttendanceInstructor from "@pages/instructor/list-attendance";
import InstructorRestrict from "./instructor-Restrict";
import AttendanceInstructor from "../pages/instructor/attendance-instructor";
import FaceAttendanceInstructor from "../pages/instructor/face-attendance-instructor";
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
        path="/attendance-student"
        element={
          <InstructorRestrict>
            <AttendanceInstructor />
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
        path="/attendance-face-student"
        element={
          <InstructorRestrict>
            <FaceAttendanceInstructor />
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
      <Route path="*" element={<Navigate to="/instructor/attendance" />} />
    </Routes>
  );
}
export default InstructorRoutes;
