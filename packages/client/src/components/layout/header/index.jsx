import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logostu from "/images/logostu.png";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "@contexts/user";
import { useDataProvider } from "@services";
import { useNavigate } from "react-router-dom";
import { displayToast } from "@utils/toast";
import { RED_COLOR } from "../../../constants/color";
import { Button } from "@mui/material";
import { PERMISSIONS } from "@constants/common";
import "./header.scss";
const Header = () => {
  const { logout } = useContext(UserContext);
  const navigation = useNavigate();
  const provider = useDataProvider();

  const { user } = useContext(UserContext) ?? {};
  const { role } = user ?? {};
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await provider.get({
          path: `user/get-profile`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        });
        setProfileData(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    if (user.token) {
      fetchProfile();
    }
  }, [provider, user.token]);

  const handleLogout = async () => {
    await logout();
    displayToast("Đăng xuất thành công !", "success");
    setProfileData(null);
    navigation("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#fafafa" }}>
          <Toolbar>
            <img
              src={logostu}
              style={{ width: "7rem", height: "5rem" }}
              className="py-2 ms-md-5 hiddenimage"
            />
            {profileData && (
              <React.Fragment>
                <Typography
                  className="fontname"
                  component="div"
                  sx={{
                    flexGrow: 1,

                    ml: 3,
                    fontFamily: "time",
                  }}
                >
                  {role === PERMISSIONS.STUDENT && (
                    <React.Fragment>
                      <span style={{ fontWeight: "bold" }}>Sinh Viên/</span>
                    </React.Fragment>
                  )}
                  {role === PERMISSIONS.ADMIN && (
                    <React.Fragment>
                      <span style={{ fontWeight: "bold" }}>Admin/</span>
                    </React.Fragment>
                  )}
                  {role === PERMISSIONS.TEACHER && (
                    <React.Fragment>
                      <span style={{ fontWeight: "bold" }}>Giảng viên/</span>
                    </React.Fragment>
                  )}

                  {profileData.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ background: RED_COLOR, mx: 1 }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Header;
