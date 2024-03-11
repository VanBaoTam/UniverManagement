import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { attendanceCourseCol } from "../../types";
import { attendanceCourseRow } from "../../constants";

export default function TableAttendanceInstructor() {
  return (
    <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
      <div style={{ minWidth: 960 }}>
        <DataGrid
          rows={attendanceCourseRow}
          columns={attendanceCourseCol}
          pageSizeOptions={[10]}
        />
      </div>
    </Paper>
  );
}
