import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "./components/toast";
import Home from './pages/home';
import MainLayout from './components/layout';
import AttendanceInstructor from "./pages/instructor/AttendanceInstructor";
import ListUserAdmin from "./pages/admin/ListUserAdmin";
import ListClassAdmin from './pages/admin/ListClassAdmin';
import SubjectAttendanceStudent from './pages/student/SubjectAttendanceStudent';
import InformationStudent from './pages/student/InformationStudent';
import ChangePasswordStudent from './pages/student/ChangePasswordStudent';
import InformationInstructor from './pages/instructor/InformationInstructor';
import ChangePasswordInstructor from './pages/instructor/ChangePasswordInstructor';
import AttendanceFaceInstructor from "./pages/instructor/AttendanceFaceInstructor";
import ListAttendanceInstructor from './pages/instructor/ListAttendanceInstructor';
function App() {
  

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <ScrollToTop />
        <Toast />
        <MainLayout>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/ListUserAdmin" index element={<ListUserAdmin />} />
            <Route path="/ListClassAdmin" index element={<ListClassAdmin />} />


            <Route path="/AttendanceInstructor" index element={<AttendanceInstructor />} />
             <Route path="/InformationInstructor" index element={<InformationInstructor />} />
             <Route path="/ChangePasswordInstructor" index element={<ChangePasswordInstructor />} />
             <Route path="/AttendanceFaceInstructor" index element={<AttendanceFaceInstructor />} />
              <Route path="/ListAttendanceInstructor" index element={<ListAttendanceInstructor />} />

              
            <Route path="/SubjectAttendanceStudent" index element={<SubjectAttendanceStudent />} />
            <Route path="/InformationStudent" index element={<InformationStudent />} />
             <Route path="/ChangePasswordStudent" index element={<ChangePasswordStudent />} />
            

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
