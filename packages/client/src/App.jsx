import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@components/ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "@components/toast";
import MainLayout from "@components/layout";
import { UserContextProvider } from "@contexts/user";

import React, { useContext } from "react";

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
