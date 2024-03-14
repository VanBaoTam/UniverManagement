import { Box, Button, Container, Grid, Modal, TextField } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "@constants/color";
import { LuScanFace } from "react-icons/lu";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceFacesCols } from "@types";
import { displayToast } from "@utils";
import dayjs from "dayjs";
import UserContext from "@contexts/user";
import { useDataProvider } from "@services";
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
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ids, setIds] = useState([]);
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState();
  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
  const GetCourseById = async () => {
    try {
      const resp = await provider.get({
        path: `instructor/get-attendance-status?days=${course.days}&shifts=${course.shift}&courseId=${course.course_id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      console.log(resp);
      if (resp.status === 200 && resp.data) {
        const studentsWithId = resp.data.attendanceStatus.map(
          (course, index) => {
            return { ...course, id: index + 1 };
          }
        );
        setStudents(studentsWithId || []);
      }
    } catch (error) {
      console.log(error);
      displayToast(error.response.data.message, "error");
    }
  };
  useEffect(() => {
    const json = sessionStorage.getItem("COURSE");
    const data = JSON.parse(json);
    setCourse(data);
  }, []);
  useEffect(() => {
    if (course) GetCourseById();
  }, [course]);
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
          {course ? (
            <Grid container direction="column" sx={{ pb: 5, py: 1 }}>
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
                    item
                    xs={9}
                    sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}
                  >
                    Ngày bắt đầu: <br />
                    {dayjs(course.start_date).format("DD/MM/YYYY")}
                  </Grid>
                  <Grid item xs={3}>
                    Ngày kết thúc:
                    <br />
                    {dayjs(course.end_date).format("DD/MM/YYYY")}
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
              <Paper sx={{ mt: 3, overflowX: "auto" }}>
                <div style={{ minWidth: 960 }}>
                  <DataGrid
                    rows={students}
                    columns={attendanceFacesCols}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10, 100]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionModel}
                  />
                </div>
              </Paper>
            </Grid>
          ) : null}
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
