import React, { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { CourseAttendanceCols } from "../../types";
import { CourseAttendanceRow } from "../../constants";

export default function TableSubjectAttendance() {
  const [ids, setIds] = useState([]);

  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
  return (
    <Paper sx={{ mt: 3, overflowX: "auto" }}>
      <div style={{ minWidth: 960 }}>
        <DataGrid
          rows={CourseAttendanceRow}
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
  );
}
