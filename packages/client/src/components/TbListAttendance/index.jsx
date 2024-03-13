import React, { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { listAttendancesCols } from "../../types";
import { listAttendanceRow } from "../../constants";

export default function TableListAttendance() {
  const [ids, setIds] = useState([]);

  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);

  return (
    <Paper sx={{ mt: 3 }}>
      <div style={{ minWidth: 960 }}>
        <DataGrid
          rows={listAttendanceRow}
          columns={listAttendancesCols}
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
