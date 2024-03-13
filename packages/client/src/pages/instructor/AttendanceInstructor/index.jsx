import React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import TableAttendanceInstructor from "../../../components/TableAttendanceInstructor";
const AttendanceInstructor = () => {
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
                <TableAttendanceInstructor />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default AttendanceInstructor;
