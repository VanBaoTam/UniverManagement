import React, {useContext, useState, useEffect } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { BLUE_COLOR, RED_COLOR } from "@constants/color";
import ModalAddClass from "@components/ModalAddClass";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";

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
const ListClassAdmin = () => {
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
      const [courses, setCourses] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

<<<<<<< HEAD
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await provider.get({
          path: `instructor/get-courses`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        });
        setCourses(response.data.listCourse);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const columns = [
    { field: "id", headerName: "Course ID", width: 150 },
    { field: "courseTitle", headerName: "Course Title", width: 200 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    { field: "shift", headerName: "Shift", width: 100 },
    { field: "days", headerName: "Days", width: 100 },
  ];
=======
>>>>>>> 519c44a4ffb4c0abc83bc3c8183636e6ed8afd64
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
              <Grid item xs={10.5} sx={{ py: 3, pl: 5, ml: 4 }}>
                <Grid container sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      sx={{ background: BLUE_COLOR }}
                      onClick={handleOpen}
                    >
                      Thêm lớp học
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button variant="contained" sx={{ background: RED_COLOR }}>
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
<<<<<<< HEAD
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={courses.map((course) => ({
                      id: course.course_id,
                      courseTitle: course.course_title,
                      startDate: course.start_date,
                      endDate: course.end_date,
                      shift: course.shift,
                      days: course.days,
                    }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                  />
                </div>
=======
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <div style={{ minWidth: 960 }}>
                    <DataGrid
                      rows={classRow}
                      columns={classCols}
                      checkboxSelection
                    />
                  </div>
                </Paper>
>>>>>>> 519c44a4ffb4c0abc83bc3c8183636e6ed8afd64
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalAddClass />
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default ListClassAdmin;
