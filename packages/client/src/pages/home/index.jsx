import React, { useContext } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import backgroundimgae from "/images/stu.jpg";
import { RiLoginBoxFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useDataProvider } from "@services";
import { displayToast } from "@utils/toast";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/user";
const Home = () => {
  const provider = useDataProvider();
  const navigation = useNavigate();
  const { setUserContext } = useContext(UserContext) ?? {};
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resp = await provider.post({
        path: "user/login",
        body: {
          username: data.username,
          password: data.password,
        },
      });
      if (resp.status === 200) {
        setUserContext(
          {
            token: resp.data.token.value ?? "",
            type: resp.data.token.type ?? "",
            role: resp.data.role ?? "",
            accountId: resp.data.accountId ?? "",
          } || {}
        );
        if (!resp.data.role) {
          displayToast("Có lỗi đã xảy ra!", "error");
        } else {
          displayToast("Đăng nhập thành công!", "success");
          if (resp.data.role === 1) navigation("/admin/list-courses");
          else if (resp.data.role === 2)
            navigation("/student/subject-attendance");
          else navigation("/instructor/attendance");
        }
      }
    } catch (error) {
      displayToast(error.response.data.message, "error");
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundImage: `url(${backgroundimgae})`,
          backgroundPosition: " center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "50rem",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 5 }}
        >
          <Grid item md={5} xs={10} sx={{ pt: 5 }}>
            <Box
              sx={{
                background: "white",
                width: "100%",
                borderRadius: "11px",
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                sx={{ py: 5 }}
              >
                <Grid
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "time",
                  }}
                >
                  ĐĂNG NHẬP
                </Grid>
                <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                  <Grid>
                    <TextField
                      id="outlined-basic-username"
                      label="Email/Tên Đăng Nhập"
                      {...register("username", {
                        required: "Username cần được điền!",
                        minLength: {
                          value: 4,
                          message: "Username/Email không hợp lệ!",
                        },
                        maxLength: {
                          value: 30,
                          message: "Username/Email không hợp lệ!",
                        },
                      })}
                      variant="outlined"
                      sx={{ width: "25rem", mb: 2, boxShadow: 2 }}
                      autoComplete="current-username"
                    />
                    {errors.username && (
                      <p style={{ color: "red" }}>{errors.username.message}</p>
                    )}
                  </Grid>
                  <Grid>
                    <TextField
                      id="outlined-basic-password"
                      label="Mật khẩu"
                      {...register("password", {
                        required: "Password cần được điền!",
                        minLength: {
                          value: 6,
                          message: "Password không hợp lệ!",
                        },
                        maxLength: {
                          value: 50,
                          message: "Password không hợp lệ!",
                        },
                      })}
                      variant="outlined"
                      sx={{ width: "25rem", mb: 3, boxShadow: 2 }}
                      type="password"
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </Grid>
                  <Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 2,
                        background:
                          "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
                        fontSize: "1.1rem",
                      }}
                    >
                      <RiLoginBoxFill />
                      &nbsp; ĐĂNG NHẬP
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Home;
