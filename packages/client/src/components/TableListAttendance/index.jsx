import React, { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { listAttendancesCols } from "../../types";

const listAttendanceRow = [
  {
    id: 1,
    studentId: "DH52006097",
    studentName: "Văn Bảo Tâm",
    class: "D20_TH09",
    times_1: "X",
    times_2: "O",
    times_3: "X",
    times_4: "X",
    times_5: "O",
    times_6: "X",
    times_7: "X",
    times_8: "O",
    times_9: "X",
    times_10: "X",
    times_11: "O",
    times_12: "X",
    times_13: "X",
    times_14: "O",
    times_15: "X",
  },
  {
    id: 2,
    studentId: "DH52006098",
    studentName: "Văn Bảo Tâm",
    class: "D20_TH10",
    times_1: "X",
    times_2: "O",
    times_3: "X",
    times_4: "O",
    times_5: "O",
    times_6: "X",
    times_7: "X",
    times_8: "O",
    times_9: "X",
    times_10: "X",
    times_11: "O",
    times_12: "X",
    times_13: "X",
    times_14: "O",
    times_15: "X",
  },
  {
    id: 3,
    studentId: "DH52006099",
    studentName: "Văn Bảo Tâm",
    class: "D20_TH08",
    times_1: "X",
    times_2: "O",
    times_3: "X",
    times_4: "X",
    times_5: "O",
    times_6: "X",
    times_7: "X",
    times_8: "O",
    times_9: "X",
    times_10: "X",
    times_11: "O",
    times_12: "X",
    times_13: "X",
    times_14: "O",
    times_15: "X",
  },
  {
    id: 4,
    studentId: "DH52006100",
    studentName: "Văn Bảo Tâm",
    class: "D20_TH09",
    times_1: "X",
    times_2: "O",
    times_3: "X",
    times_4: "O",
    times_5: "O",
    times_6: "X",
    times_7: "X",
    times_8: "O",
    times_9: "X",
    times_10: "X",
    times_11: "O",
    times_12: "X",
    times_13: "X",
    times_14: "O",
    times_15: "X",
  },
];

export default function TableListAttendance() {
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
          rows={listAttendanceRow}
          columns={listAttendancesCols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModel}
        />
      </div>
    </Paper>
  );
}
