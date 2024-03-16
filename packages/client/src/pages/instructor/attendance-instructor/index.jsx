import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useContext, useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceCourseCol } from "@types";
import UserContext from "@contexts/user";
import { displayToast } from "@utils";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "@services";

const AttendanceInstructor = () => {
  const { user } = useContext(UserContext) ?? {};
  const navigation = useNavigate();
  const [course, setCourse] = useState();
  const provider = useDataProvider();
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetCourses = async () => {
    try {
      const resp = await provider.get({
        path: `instructor/get-courses`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 200 && resp.data) {
        const coursesWithId = resp.data.listCourse.map((course, index) => {
          return { ...course, id: index + 1 };
        });
        setCourses(coursesWithId || []);
        displayToast("Truy xuất môn học thành công!", "success");
      }
      setLoading(false);
    } catch (error) {
      displayToast(error.response.data.message, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCourses();
  }, []);

  useEffect(() => {
    if (course) {
      const json = JSON.stringify(course);
      if (sessionStorage.getItem("COURSE")) sessionStorage.removeItem("COURSE");
      sessionStorage.setItem("COURSE", json);
      navigation("/instructor/attendance-face-student");
    }
  }, [course]);

  const handleSelectionModel = useCallback(
    (ids) => {
      if (!ids.length) {
        return;
      }
      //console.log(courses);
      setCourse(courses[ids[0] - 1]);
    },
    [courses]
  );

  return (
    <>
      {" "}
      <Box
        sx={{
          width: "100%",

          background: "white",
          mt: 3,
        }}
      >
        <Container>
          {" "}
          {courses ? (
            <Row>
              <Col>
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <DataGrid
                    rows={courses}
                    columns={attendanceCourseCol}
                    onRowSelectionModelChange={handleSelectionModel}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSize={10}
                    pageSizeOptions={[10, 100]}
                    checkboxSelection
                  />
                </Paper>
              </Col>
            </Row>
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export default AttendanceInstructor;
