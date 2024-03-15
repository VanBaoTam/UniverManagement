import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
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
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [ids, setIds] = useState([]);
  const GetCourseByStudentId = async () => {
    try {
      const resp = await provider.get({
        path: `student/get-course-by-student-id`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });
      console.log(resp);
      const listCourseWithIds = resp.data.listcourse.map((element, index) => {
        const id = index + 1;
        return { ...element, id };
      });
      console.log(listCourseWithIds);
      setCourses(listCourseWithIds);
    } catch (error) {
      console.error(error);
      displayToast(error.response.data.message, "error");
    }
  };
  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
  useEffect(() => {
    GetCourseByStudentId();
  }, []);
  useEffect(() => {
    if (courses.length) console.log(courses);
  }, [courses]);
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
              <Grid item xs={10} sx={{ py: 3, ml: 4, pl: 4 }}>
                <Grid item xs={3} sx={{ mb: 3 }}>
                  Môn học:
                  <FormControl
                    size="small"
                    fullWidth
                    sx={{ background: "white" }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <div style={{ minWidth: 960 }}>
                    <DataGrid
                      rows={courses}
                      columns={CourseAttendanceCols}
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default SubjectAttendanceStudent;
