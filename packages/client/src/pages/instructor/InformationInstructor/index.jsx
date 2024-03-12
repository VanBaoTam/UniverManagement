import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "../../../constants/color";
import SidebarInstructor from "../SidebarInstructor";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../../../context/user";
import { useDataProvider } from "../../../services";
import { displayToast } from "../../../utils";
const InformationInstructor = () => {
  const [formData, setFormData] = useState({
    address: "",
    phoneNumber: "",
    email: "",
  });
  const navigation = useNavigate();
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleChange = (event, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: event.target.value,
    }));
  };

  const getProfile = async () => {
    try {
      const resp = await provider.get({
        path: `user/get-profile`,
        Headers: user.type + " " + user.token,
      });
      if (resp.status === 200) {
        console.log(resp);
        //  displayToast("Đăng nhập thành công!", "success");
      }
    } catch (error) {
      console.log(error);
      displayToast(error.response.data.message, "error");
    }
  };
  const onSubmit = async (data) => {
    try {
      const resp = await provider.post({
        path: "user/login",
        body: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(import.meta.env.VITE_SECRET_KEY);
      if (resp.status === 200) {
        displayToast("Đăng nhập thành công!", "success");
        setUserContext(
          {
            token: resp.data.token.value,
            type: resp.data.token.type,
            role: resp.data.role,
          } || {}
        );

        if (resp.data.role === 1) navigation("/admin/list-class");
        else if (resp.data.role === 2)
          navigation("/student/subject-attendance");
        else navigation("/instructor/attendance");
      }
    } catch (error) {
      console.log(error);
      displayToast(error.response.data.message, "error");
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
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
              <Grid item xs={2}>
                <SidebarInstructor />
              </Grid>
              <Grid
                item
                xs={9.5}
                sx={{ py: 3, pl: 5 }}
                container
                direction="column"
              >
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid sx={{ mt: 4, mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Địa chỉ"
                      variant="outlined"
                      fullWidth
                      {...register("address", {
                        required: "Address cần được điền!",
                        minLength: {
                          value: 6,
                          message: "Address không hợp lệ!",
                        },
                        maxLength: {
                          value: 50,
                          message: "Address không hợp lệ!",
                        },
                      })}
                      sx={{ background: "white" }}
                      required
                    />
                  </Grid>
                  <Grid sx={{ mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      variant="outlined"
                      {...register("phoneNumber", {
                        required: "Phone number cần được điền!",
                        minLength: {
                          value: 6,
                          message: "Phone number không hợp lệ!",
                        },
                        maxLength: {
                          value: 50,
                          message: "Phone number không hợp lệ!",
                        },
                      })}
                      fullWidth
                      sx={{ background: "white" }}
                      required
                    />
                    {errors.phoneNumber && (
                      <p style={{ color: "red" }}>
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </Grid>
                  <Grid sx={{ mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      {...register("email", {
                        required: "Email cần được điền!",
                        minLength: {
                          value: 4,
                          message: "Email không hợp lệ!",
                        },
                        maxLength: {
                          value: 30,
                          message: "Email không hợp lệ!",
                        },
                      })}
                      sx={{ background: "white" }}
                      required
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email.message}</p>
                    )}
                  </Grid>
                  <Grid sx={{ mt: 5 }}>
                    <Button
                      variant="contained"
                      sx={{ mr: 2, py: 2, background: BLUE_COLOR }}
                      type="submit"
                    >
                      Lưu thay đổi
                    </Button>
                    <Link to="/instructor/change-password">
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
export default InformationInstructor;
