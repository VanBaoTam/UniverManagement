import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useContext, useState, useCallback } from "react";
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
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          width: "23rem",

          background: "white",
          pt: 3,
        }}
      >
        {" "}
        {courses ? (
          <DataGrid
            sx={{ mx: 1 }}
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
        ) : null}
      </Box>
    </>
  );
};

export default AttendanceInstructor;
