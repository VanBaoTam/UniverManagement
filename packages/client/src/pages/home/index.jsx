
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import backgroundimgae from "../../../public/images/stu.jpg"
import { RiLoginBoxFill } from "react-icons/ri";

const Home=()=>{
    return (
      <>
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
            <Grid md={5} xs={10} sx={{ pt: 5 }}>
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
                  <Grid sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                    ĐĂNG NHẬP
                  </Grid>
                  <form className="my-4">
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Email/Tên Đăng Nhập"
                        variant="outlined"
                        sx={{ width: "25rem", mb: 2, boxShadow: 2 }}
                        required
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Mật khẩu"
                        variant="outlined"
                        sx={{ width: "25rem", mb: 3, boxShadow: 2 }}
                        required
                        type="password"
                      />
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
      </>
    );
}
export default Home;