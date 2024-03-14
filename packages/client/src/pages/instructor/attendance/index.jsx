import { Box, Grid } from "@mui/material";
import React, { useEffect, useContext, useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceCourseCol } from "@types";
import UserContext from "@contexts/user";
import { displayToast } from "@utils";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "@services";
const Attendance = () => {
  const { user } = useContext(UserContext) ?? {};
  const navigation = useNavigate();
  const [course, setCourse] = useState();
  const provider = useDataProvider();
  const [courses, setCourses] = useState(null);
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
    } catch (error) {
      console.log(error);
      displayToast(error.response.data.message, "error");
    }
  };
  useEffect(() => {
    GetCourses();
  }, []);
  useEffect(() => {
    if (course) {
      console.log("HERE");
      const json = JSON.stringify(course);
      if (sessionStorage.getItem("COURSE")) sessionStorage.removeItem("COURSE");
      sessionStorage.setItem("COURSE", json);
      navigation("/instructor/attendance-face");
    }
  }, [course]);
  const handleSelectionModel = useCallback(
    (ids) => {
      console.log("HERE IDS", ids);
      if (!ids.length) {
        return;
      }
      console.log(courses);
      setCourse(courses[ids[0] - 1]);
    },
    [courses]
  );
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ py: 3, pl: 5, ml: 4 }}>
                {courses ? (
                  <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
                    <div style={{ minWidth: 960 }}>
                      <DataGrid
                        rows={courses}
                        columns={attendanceCourseCol}
                        pageSizeOptions={[10, 100]}
                        onRowSelectionModelChange={handleSelectionModel}
                      />
                    </div>
                  </Paper>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Attendance;
