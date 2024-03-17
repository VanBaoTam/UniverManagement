import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "@constants/color";
import { LuScanFace } from "react-icons/lu";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceFacesCols } from "@types";
import { GiConfirmed } from "react-icons/gi";
import { displayToast } from "@utils";
import dayjs from "dayjs";
import UserContext from "@contexts/user";
import { useDataProvider } from "@services";
import AttendanceWebcam from "../../../components/webcam";
const style = {
  position: "absolute",
  top: "45%",
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
  const [studentIds, setStudentIds] = useState([]);
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const handleSelectionModel = useCallback(
    (selectionModel) => {
      const updatedStudents = [...students];
      //console.log(selectionModel);
      updatedStudents.forEach((student, index) => {
        const isSelected = selectionModel.includes(index + 1);
        if (!student.isChecked) {
          student.isAttendance = isSelected;
        }
      });
      setStudents(updatedStudents);
    },
    [students]
  );

  const GetCourseById = async () => {
    try {
      const resp = await provider.get({
        path: `instructor/get-attendance-status?days=${course.days}&shifts=${course.shift}&courseId=${course.course_id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 200 && resp.data) {
        const studentsWithId = resp.data.attendanceStatus.map(
          (course, index) => {
            return { ...course, id: index + 1, isChecked: false };
          }
        );
        setStudents(studentsWithId || []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      displayToast(error.response.data.message, "error");
    }
  };
  const Attendance = async () => {
    setLoading(true);
    const ids = students
      .filter((element) => {
        if (element.isAttendance) return element.studentId;
      })
      .map((element) => element.studentId);
    try {
      const resp = await provider.post({
        path: `instructor/attendance`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: {
          courseId: course.course_id,
          shifts: course.shift,
          days: course.days,
          studentIds: ids,
        },
      });
      if (resp.status === 200) {
        displayToast("Điểm danh thành công", "success");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
  useEffect(() => {
    if (!studentIds.length) return;
    const updatedStudents = [...students];
    updatedStudents.forEach((student, index) => {
      if (studentIds.includes(student.studentId)) {
        student.isAttendance = true;
        student.isChecked = true;
      }
    });
    setStudents(updatedStudents);
  }, [studentIds]);
  return (
    <React.Fragment>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          height: "40rem",
          ml: 5,
        }}
      >
        <Container>
          {course ? (
            <Grid container direction="column" sx={{ pb: 5, py: 1 }}>
              <Grid container>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Link to="/instructor/attendance">
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
                ĐIỂM DANH MÔN: {course.course_title}
              </Grid>
              <Grid container>
                <Grid item xs={3}></Grid>
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
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "2rem",
                      px: 3,
                      py: 1,
                      ml: 1,
                      background: BLUE_COLOR,
                    }}
                    onClick={Attendance}
                  >
                    <GiConfirmed />
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
                    pageSize={10}
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
            <Box
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {course ? (
                <AttendanceWebcam
                  studentIds={studentIds}
                  setStudentIds={setStudentIds}
                  days={course.days}
                  shifts={course.shift}
                  courseId={course.course_id}
                />
              ) : null}
            </Box>
          </Box>
        </Modal>
      </Box>
    </React.Fragment>
  );
};
export default AttendanceFaceInstructor;
