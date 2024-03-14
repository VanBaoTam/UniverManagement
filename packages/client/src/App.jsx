import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@components/ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "@components/toast";
import Home from "./pages/home";
import MainLayout from "@components/layout";
import { UserContextProvider } from "@contexts/user";
import AdminRoutes from "@routes/admin-routes";
import StudentRoutes from "@routes/student-routes";
import InstructorRoutes from "@routes/instructor-routes";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <UserContextProvider>
          <CssBaseline />
          <ScrollToTop />
          <Toast />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/instructor/*" element={<InstructorRoutes />} />
              <Route path="/student/*" element={<StudentRoutes />} />
            </Routes>
          </MainLayout>
        </UserContextProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
