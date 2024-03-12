import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "./components/toast";
import Home from "./pages/home";
import MainLayout from "./components/layout";
import AttendanceInstructor from "./pages/instructor/AttendanceInstructor";
import ListUserAdmin from "./pages/admin/ListUserAdmin";
import ListClassAdmin from "./pages/admin/ListClassAdmin";
import SubjectAttendanceStudent from "./pages/student/SubjectAttendanceStudent";
import InformationStudent from "./pages/student/InformationStudent";
import ChangePasswordStudent from "./pages/student/ChangePasswordStudent";
import InformationInstructor from "./pages/instructor/InformationInstructor";
import ChangePasswordInstructor from "./pages/instructor/ChangePasswordInstructor";
import AttendanceFaceInstructor from "./pages/instructor/AttendanceFaceInstructor";
import ListAttendanceInstructor from "./pages/instructor/ListAttendanceInstructor";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline />
        <ScrollToTop />
        <Toast />
        <MainLayout>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/admin/list-user" index element={<ListUserAdmin />} />
            <Route
              path="/admin/list-class"
              index
              element={<ListClassAdmin />}
            />

            <Route
              path="/instructor/attendance"
              index
              element={<AttendanceInstructor />}
            />
            <Route
              path="/instructor/information"
              index
              element={<InformationInstructor />}
            />
            <Route
              path="/instructor/change-password"
              index
              element={<ChangePasswordInstructor />}
            />
            <Route
              path="/instructor/attendance-face"
              index
              element={<AttendanceFaceInstructor />}
            />
            <Route
              path="/instructor/list-attendance"
              index
              element={<ListAttendanceInstructor />}
            />

            <Route
              path="/student/subject-attendance"
              index
              element={<SubjectAttendanceStudent />}
            />
            <Route
              path="/student/information"
              index
              element={<InformationStudent />}
            />
            <Route
              path="/student/change-password"
              index
              element={<ChangePasswordStudent />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
