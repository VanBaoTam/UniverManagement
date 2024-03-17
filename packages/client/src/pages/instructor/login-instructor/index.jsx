import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useContext } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { RiLoginBoxFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useDataProvider } from "@services";
import { displayToast } from "@utils/toast";
import { useNavigate } from "react-router-dom";
import UserContext from "@contexts/user";
const LoginInstuctor = () => {
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
        if (!resp.data.role) {
          displayToast("Có lỗi đã xảy ra!", "error");
        } else {
          if (resp.data.role === 3) {
            displayToast("Đăng nhập thành công!", "success");
            setUserContext(
              {
                token: resp.data.token.value ?? "",
                type: resp.data.token.type ?? "",
                role: resp.data.role ?? "",
                accountId: resp.data.accountId ?? "",
              } || {}
            );
            navigation("/instructor/attendance-student");
          } else {
            displayToast(
              "Chúng tôi chưa hỗ trợ đăng nhập cho sinh viên trên nền tảng mobile!",
              "error"
            );
          }
        }
      }
    } catch (error) {
      displayToast(error.response.data.message, "error");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", height: "40rem", background: "white" }}>
        <Container>
          <Row className="d-flex flex-column">
            <Col className="mt-5">
              <h1
                className="text-center fw-bold"
                style={{ fontFamily: "time" }}
              >
                ĐĂNG NHẬP
              </h1>
            </Col>
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              <Col className="mt-5 col-12">
                <TextField
                  className="col-12"
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
                  sx={{ mb: 2, boxShadow: 2 }}
                  autoComplete="current-username"
                />
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
              </Col>
              <Col>
                <TextField
                  className="col-12"
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
                  sx={{ mb: 3, boxShadow: 2 }}
                  type="password"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </Col>
              <Col>
                <Button
                  className="col-12"
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
              </Col>
            </form>
          </Row>
        </Container>
      </Box>
    </React.Fragment>
  );
};
export default LoginInstuctor;
