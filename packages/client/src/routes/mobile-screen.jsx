import React from "react";
import { Navigate } from "react-router-dom";

export const MobileScreen = ({ children }) => {
  return window.screen.width > 979 ? children : <Navigate to="/login" />;
};

export default MobileScreen;
