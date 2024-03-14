import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "@constants/color";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";
import { displayToast } from "@utils/toast";
import { useNavigate } from "react-router-dom";

const ChangePasswordInstructor = () => {
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const navigation = useNavigate();

  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "retypePassword") {
      setRetypePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(retypePassword);
    try {
      const response = await provider.put({
        path: `user/change-password`,
        body: {
          password,
          retypePassword,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      navigation("/instructor/information");
      displayToast("Đổi mật khẩu thành công", "success");

      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        displayToast("Password không trùng nhau ! Vui lòng nhập lại", "error");

        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
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
              <Link to="/instructor/information">
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
                      id="outlined-basic"
                      label="Nhập mật mới"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic"
                      label="Nhập lại mật khẩu mới"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                      type="password"
                      name="retypePassword"
                      value={retypePassword}
                      onChange={handleChange}
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
export default ChangePasswordInstructor;
