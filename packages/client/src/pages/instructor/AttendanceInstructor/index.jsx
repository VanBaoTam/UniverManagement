import * as React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import SidebarInstructor from "../SidebarInstructor";
import TableAttendanceInstructor from "../../../components/TableAttendanceInstructor";
const AttendanceInstructor = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid xs={2}>
                <SidebarInstructor />
              </Grid>
              <Grid xs={9.5} sx={{ py: 3, pl: 5 }}>
                <TableAttendanceInstructor/>
                </Grid>{" "}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default AttendanceInstructor;