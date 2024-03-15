import React, { useContext, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BLUE_COLOR, RED_COLOR } from "@constants/color";
import { useForm } from "react-hook-form";
import UserContext from "@contexts/user";
import { useDataProvider } from "@services";
import { displayToast } from "@utils";

const InformationInstructor = () => {
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { address, phoneNumber, email } = watch();

  const handleChange = (event, type) => {
    //console.log(event.target.value, type);
    setValue(type, event.target.value);
  };
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const resp = await provider.get({
        path: `user/get-profile`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 200 && resp.data) {
        Object.keys(resp.data).forEach((key) => {
          setValue(key, resp.data[key]);
        });
        displayToast("Truy xuất thông tin giảng viên thành công!", "success");
      }
      setLoading(false);
    } catch (error) {
      displayToast(error.response.data.message, "error");
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const resp = await provider.put({
        path: "user/update-profile",
        body: {
          data,
          accountId: user.accountId,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 200) {
        displayToast("Cập nhật thành công!", "success");
      }
    } catch (error) {
      displayToast(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <React.Fragment>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column">
        <Grid>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={9.5}
                sx={{ py: 3, pl: 5, ml: 4 }}
                container
                direction="column"
              >
                <Grid
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "time",
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
                      onChange={(event) => handleChange(event, "address")}
                      {...register("address", {
                        required: "Address cần được điền!",
                        minLength: {
                          value: 2,
                          message: "Address không hợp lệ!",
                        },
                        maxLength: {
                          value: 50,
                          message: "Address không hợp lệ!",
                        },
                      })}
                      sx={{ background: "white" }}
                      value={address || ""}
                      required
                    />
                    {errors.address && (
                      <p style={{ color: "red" }}>{errors.address.message}</p>
                    )}
                  </Grid>
                  <Grid sx={{ mb: 2 }}>
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      variant="outlined"
                      onChange={(event) => handleChange(event, "phoneNumber")}
                      {...register("phoneNumber", {
                        required: "Phone number cần được điền!",
                        minLength: {
                          value: 10,
                          message: "Phone number không hợp lệ!",
                        },
                        maxLength: {
                          value: 10,
                          message: "Phone number không hợp lệ!",
                        },
                      })}
                      fullWidth
                      sx={{ background: "white" }}
                      value={phoneNumber || ""}
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
                      onChange={(event) => handleChange(event, "email")}
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
                      value={email || ""}
                      required
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email.message}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{}}>
                    <Button
                      variant="contained"
                      sx={{ mr: 2, py: 2, background: BLUE_COLOR }}
                      type="submit"
                    >
                      Lưu thay đổi
                    </Button>
                    <Link
                      to="/instructor/change-password"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          mr: 1,
                          background: RED_COLOR,
                          py: 2,
                          textDecoration: "none",
                        }}
                      >
                        Thay đổi mật khẩu
                      </Button>
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
