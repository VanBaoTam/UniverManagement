import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box, Button, CircularProgress, Backdrop } from "@mui/material";
import Modal from "react-bootstrap/Modal";
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
import "./face-attendance.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};
const FaceAttendanceInstructor = () => {
  const [open, setOpen] = useState(false);
  const [studentIds, setStudentIds] = useState([]);
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [students, setStudents] = useState([]);
  const [ids, setIds] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(true);
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
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ background: "white", width: "100%" }}>
        <Container>
          {course ? (
            <Row className="d-flex flex-column pt-4">
              <Row className="d-flex flex-row">
                <Col className="col-4">
                  <Link to="/instructor/attendance-student">
                    <Button variant="text" sx={{ fontSize: "2rem" }}>
                      <IoArrowBackSharp />
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Col className="mt-3">
                <p className="fontsizeh">
                  ĐIỂM DANH MÔN:
                  <br />
                  <span className="text-dark fw-bold">
                    {course.course_title}
                  </span>
                </p>
              </Col>
              <Row className="d-flex flex-row">
                <Col className="col-4">
                  <p className="fontday">
                    Ngày bắt đầu:
                    <br />
                    <span className="fw-bold">
                      {dayjs(course.start_date).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </Col>
                <Col className="col-4">
                  <p className="fontday">
                    Ngày kết thúc:
                    <br />
                    <span className="fw-bold">
                      {dayjs(course.end_date).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </Col>
              </Row>
              <Col className="col-12 col-md-4  mt-2">
                <Button
                  className="col-12 "
                  variant="contained"
                  sx={{
                    fontSize: "2rem",

                    background: BLUE_COLOR,
                  }}
                  onClick={handleOpen}
                >
                  <LuScanFace />
                </Button>
              </Col>
              <Col className="col-12 col-md-4 mt-2">
                <Button
                  className="col-12"
                  variant="contained"
                  sx={{
                    fontSize: "2rem",

                    background: BLUE_COLOR,
                  }}
                  onClick={Attendance}
                >
                  <GiConfirmed />
                </Button>
              </Col>
              <Col>
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
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
                </Paper>
              </Col>
            </Row>
          ) : null}
        </Container>
        {/* <Modal
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
          </Modal> */}
        <Modal show={open} onHide={handleClose} fullscreen={fullscreen}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">ĐIỂM DANH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box sx={style}>
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default FaceAttendanceInstructor;
