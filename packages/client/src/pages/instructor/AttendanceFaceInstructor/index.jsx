import React, { useState } from "react";
import { Box, Button, Container, Grid, Modal, TextField } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "../../../constants/color";
import { LuScanFace } from "react-icons/lu";
import TableAttendanceFace from "../../../components/TableAttendanceFace";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const AttendanceFaceInstructor = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          height: "40rem",
        }}
      >
        <Container>
          <Grid container direction="column" sx={{ pb: 5 }}>
            <Grid container>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <Link to="/AttendanceInstructor">
                  <Button variant="text" sx={{ fontSize: "2rem" }}>
                    <IoArrowBackSharp />
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} container>
                <Grid
                  xs={9}
                  sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}
                >
                  Ngày bắt đầu: <br />
                  19/05/2024
                </Grid>
                <Grid item xs={3}>
                  Ngày kết thúc:
                  <br />
                  19/05/2024
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                mb: 4,
                mt: 3,
              }}
            >
              ĐIỂM DANH MÔN:
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Mã sinh viên"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ background: "white" }}
                />
              </Grid>
              <Grid
                item
                xs={9}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "2rem",
                    px: 3,
                    py: 1,
                    background: BLUE_COLOR,
                  }}
                  onClick={handleOpen}
                >
                  <LuScanFace />
                </Button>
              </Grid>
            </Grid>
            <TableAttendanceFace />
          </Grid>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container direction="column">
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Điểm Danh Khuôn Mặt
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </React.Fragment>
  );
};
export default AttendanceFaceInstructor;
