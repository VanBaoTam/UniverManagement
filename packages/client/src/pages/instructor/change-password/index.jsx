import React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "@constants/color";

const ChangePasswordInstructor = () => {
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
            <Grid sx={{ mt: 2 }}>
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
            <form className="my-1">
              <Grid container direction="column">
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic"
                      label="Nhập mật khẩu cũ"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="outlined-basic"
                      label="Nhập mật mới"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white", mb: 2 }}
                      required
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
