import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logostu from "../../../../public/images/logostu.png";
const Header = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#fafafa" }}>
          <Toolbar>
            <img
              src={logostu}
              style={{ width: "7rem", height: "7rem" }}
              className="py-2 ms-5"
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "black", ml: 3 }}
            >
              Name User
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Header;
