import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logostu from "/images/logostu.png";
const Header = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#fafafa" }}>
          <Toolbar>
            <img
              src={logostu}
              style={{ width: "4rem", height: "4rem" }}
              className="py-2 ms-5"
            />
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Header;
