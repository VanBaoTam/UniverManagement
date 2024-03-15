import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { CourseAttendanceCols } from "@types";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";
import { displayToast } from "@utils";
const SubjectAttendanceStudent = () => {
  const [age, setAge] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [ids, setIds] = useState([]);
  // /get-attendance-by-student-id/:courseId/:teacherId/:day/:shift
  const GetAttendance = async () => {
    try {
      const resp = await provider.get({
        path: `student/get-attendance-by-student-id`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      const listCourseWithIds = resp.data.result.map((course, index) => {
        const times_ = {};
        course.listTimes.forEach((time, timeIndex) => {
          times_[`times_${timeIndex + 1}`] = time;
        });
        return { ...course, id: index + 1, ...times_ };
      });
      //console.log(listCourseWithIds);
      setCourses(listCourseWithIds || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      displayToast(error.response.data.message, "error");
    }
  };
  const handleSelectionModel = useCallback(
    (ids) => {
      if (ids.length !== 1) {
        return;
      }
      //console.log(ids, courses[ids[0] - 1]);
      setSelectedCourse(courses[ids[0] - 1]);
    },
    [ids, courses]
  );
  useEffect(() => {
    GetAttendance();
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
              <Grid item xs={10.5} sx={{ py: 3, ml: 4, pl: 4 }}>
                <Grid item xs={3} sx={{ mb: 3 }}>
                  <h4>Thống kê điểm danh:</h4>
                </Grid>
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <div style={{ minWidth: 1000, height: 450 }}>
                    <DataGrid
                      rows={courses}
                      columns={CourseAttendanceCols}
                      pageSize={10}
                      checkboxSelection
                      onRowSelectionModelChange={handleSelectionModel}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default SubjectAttendanceStudent;
