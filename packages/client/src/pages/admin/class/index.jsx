import React, { useContext, useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";
import { BLUE_COLOR, RED_COLOR } from "@constants/color";
import ModalAddClass from "@components/ModalAddClass";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";
import dayjs from "dayjs";

const stylee = {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await provider.get({
          path: `admin/get-course-by-admin`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        });

        //console.log(response.data.listCourse);
        const coursesWithId = response.data.listCourse.map((course, index) => {
          return { ...course, id: index + 1 };
        });

        setCourses(coursesWithId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { field: "course_id", headerName: "Mã môn học", width: 110 },
    { field: "course_title", headerName: "Môn học", width: 270 },
    {
      field: "start_date",
      headerName: "Ngày mở lớp",
      width: 150,
      valueFormatter: (data) => {
        return dayjs(data.value).format("DD/MM/YYYY");
      },
    },
    {
      field: "end_date",
      headerName: "Ngày kết thúc",
      width: 150,
      valueFormatter: (data) => {
        return dayjs(data.value).format("DD/MM/YYYY");
      },
    },
    { field: "shift", headerName: "Ca", width: 150 },
    {
      field: "days",
      headerName: "Thứ",
      width: 150,
      valueFormatter: (data) => {
        return `Thứ ${data.value}`;
      },
    },
  ];
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
              <Grid item xs={12} sx={{ py: 3, pl: 5, ml: 4 }}>
                <Grid container sx={{ mb: 3 }}>
                  {/* <Grid item xs={6}>
                    <Button
                      variant="contained"
                      sx={{ background: BLUE_COLOR }}
                      onClick={handleOpen}
                    >
                      Thêm lớp học
                    </Button>
                  </Grid> */}
                </Grid>
                <div style={{ height: 520, width: "100%" }}>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <DataGrid
                      rows={courses}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 20]}
                      sx={{ background: "white", px: 3 }}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylee}>
          <ModalAddClass />
        </Box>
      </Modal> */}
    </React.Fragment>
  );
};
export default ListClassAdmin;
