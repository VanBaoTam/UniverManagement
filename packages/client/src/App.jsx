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
import Apps from "./components/App";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <UserContextProvider>
          <CssBaseline />
          <ScrollToTop />
          <Toast />
          <MainLayout>
           <Apps/>
          </MainLayout>
        </UserContextProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
