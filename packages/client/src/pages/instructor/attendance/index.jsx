import { Box, Grid } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceCourseCol } from "@types";
import { attendanceCourseRow } from "@constants";
const Attendance = () => {
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
                <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
                  <div style={{ minWidth: 960 }}>
                    <DataGrid
                      rows={attendanceCourseRow}
                      columns={attendanceCourseCol}
                      pageSizeOptions={[10, 100]}
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
export default Attendance;
