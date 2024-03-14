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
import {
  PERMISSIONS,
  
} from "@constants/common";
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
        setError(error.response.data.message);
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
              style={{ width: "4rem", height: "4rem" }}
              className="py-2 ms-5"
            />
            {profileData && (
              <>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: "black",
                    ml: 3,
                    fontFamily: "time",
                  }}
                >
                  {role === PERMISSIONS.STUDENT && (
                    <>
                      <span style={{ fontWeight: "bold" }}>Sinh Viên/</span>{" "}
                    </>
                  )}
                  {role === PERMISSIONS.ADMIN && (
                    <>
                      <span style={{ fontWeight: "bold" }}>Admin/</span>{" "}
                    </>
                  )}
                  {role === PERMISSIONS.TEACHER && (
                    <>
                      <span style={{ fontWeight: "bold" }}>Giảng viên/</span>{" "}
                    </>
                  )}

                  {profileData.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ background: RED_COLOR }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Header;
