import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GREY_COLOR } from "@constants/color";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { listAttendancesCols } from "@types";
import UserContext from "@contexts/user";
import { useDataProvider } from "@services/DataProvider";
import { displayToast } from "@utils";
const ListAttendanceInstructor = () => {
  const [age, setAge] = useState("");
  const { user } = useContext(UserContext) ?? {};
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const provider = useDataProvider();
  const [ids, setIds] = useState([]);
  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };
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
        setSelectedCourse(coursesWithId[0]);
      }
      setLoading(false);
    } catch (error) {
      displayToast(error.response.data.message, "error");
      setLoading(false);
    }
  };
  const GetCourseById = async () => {
    try {
      const resp = await provider.get({
        path: `instructor/get-attendances-by-course?days=${selectedCourse.days}&shifts=${selectedCourse.shift}&courseId=${selectedCourse.course_id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      if (resp.status === 200 && resp.data) {
        const studentsWithId = resp.data.listStudent.map((course, index) => {
          const times_ = {};
          course.listTimes.forEach((time, timeIndex) => {
            times_[`times_${timeIndex + 1}`] = time;
          });
          return { ...course, id: index + 1, ...times_ };
        });
        setStudents(studentsWithId || []);
        displayToast("Truy xuất môn học thành công!", "success");
      }
    } catch (error) {
      displayToast(error.response.data.message, "error");
    }
  };
  useEffect(() => {
    GetCourses();
  }, []);
  useEffect(() => {
    if (selectedCourse) GetCourseById();
  }, [selectedCourse]);
  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
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
              <Grid item xs={10.5} sx={{ py: 3, ml: 9 }}>
                <Grid container direction="column">
                  <Grid item xs={6}>
                    Môn học:
                    <FormControl
                      size="small"
                      fullWidth
                      sx={{ background: "white" }}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCourse}
                        onChange={handleChange}
                      >
                        {courses
                          ? courses.map((element) => (
                              <MenuItem key={element.id} value={element}>
                                {element.course_title}, thứ {element.days} - ca
                                {element.shift}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ mt: 3 }}>
                      <div>
                        <DataGrid
                          rows={students}
                          columns={listAttendancesCols}
                          sx={{ px: 2 }}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 10,
                              },
                            },
                          }}
                          onRowSelectionModelChange={handleSelectionModel}
                        />
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ListAttendanceInstructor;
