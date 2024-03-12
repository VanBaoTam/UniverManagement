import React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { userCols } from "../../types";
import { userRow } from "../../constants";
import { Button } from "@mui/material";
import { RED_COLOR } from "../../constants/color";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,

  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function TableListClass() {
  const renderButtonCell = (params) => {
    return (
      <Button
        onClick={() => handleClick(params.row)}
        sx={{ background: RED_COLOR }}
      >
        Vô Hiệu
      </Button>
    );
  };

  const handleClick = (row) => {
    console.log("Button clicked for row:", row);
  };

  return (
    <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
      <div style={{ Width: 960 }}>
        <DataGrid
          rows={userRow}
          columns={[
            ...userCols,
            {
              field: "action",
              headerName: "Thao Tác",
              renderCell: renderButtonCell,
            },
          ]}
          pageSizeOptions={[10, 100]}
        />
      </div>
    </Paper>
  );
}
