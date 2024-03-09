import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "./components/toast";
import Home from './pages/home';
import MainLayout from './components/layout';
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
           
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
