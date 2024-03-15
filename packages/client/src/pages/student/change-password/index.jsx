import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "@constants/color";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";
import { displayToast } from "@utils/toast";
import { useNavigate } from "react-router-dom";

const ChangePasswordStudent = () => {
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const navigation = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await provider.put({
        path: `user/change-password`,
        body: {
          oldPassword,
          password,
          retypePassword,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });

      navigation("/student/information");
      displayToast("Đổi mật khẩu thành công", "success");
      setMessage(response.data.message);
    } catch (error) {
      displayToast(error.response.data.message, "success");
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          width: "100%",
        }}
      >
        <Container>
          <Grid container direction="column" sx={{ pb: 5 }}>
            <Grid sx={{ mt: 2, ml: 4 }}>
              <Link to="/student/information">
                <Button variant="text" sx={{ fontSize: "2rem" }}>
                  <IoArrowBackSharp />
                </Button>
              </Link>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                my: 4,
                fontFamily: "time",
              }}
            >
              THAY ĐỔI MẬT KHẨU
            </Grid>
            <form className="my-1" onSubmit={handleSubmit}>
              <Grid container direction="column">
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic-old"
                      label="Nhập mật khẩu cũ"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      autoComplete="password"
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic-new"
                      label="Nhập mật khẩu mới"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="password"
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic-retype"
                      label="Nhập lại mật khẩu mới"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                      type="password"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      autoComplete="password"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 3, mb: 5 }}
                >
                  <Grid item xs={5}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ py: 2, fontSize: "1.2rem", background: BLUE_COLOR }}
                    >
                      xác nhận
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};
export default ChangePasswordStudent;
