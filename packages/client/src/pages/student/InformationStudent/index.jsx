import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import SidebarStudent from "../SidebarStudent";
import { BLUE_COLOR } from "../../../constants/color";
import { Link } from "react-router-dom";
const InformationStudent = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid xs={2}>
                <SidebarStudent />
              </Grid>
              <Grid xs={9.5} sx={{ py: 3, pl: 5 }} container direction="column">
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  THÔNG TIN CÁ NHÂN
                </Grid>
                <form className="my-1">
                  <Grid sx={{ mt: 4, mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Địa chỉ"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white" }}
                      required
                    />
                  </Grid>
                  <Grid sx={{ mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white" }}
                      required
                    />
                  </Grid>
                  <Grid sx={{ mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      sx={{ background: "white" }}
                      required
                    />
                  </Grid>
                  <Grid sx={{ mt: 5 }}>
                    <Button
                      variant="contained"
                      sx={{ mr: 2, py: 2, background: BLUE_COLOR }}
                      type="submit"
                    >
                      Lưu thay đổi
                    </Button>
                    <Link to="/student/change-password">
                      <Button variant="text">Thay đổi mật khẩu</Button>
                    </Link>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default InformationStudent;
