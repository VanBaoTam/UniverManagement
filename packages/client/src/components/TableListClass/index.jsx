import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { classCols } from "../../types";
import { classRow } from "../../constants";

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

export default function TableListClass() {
  return (
    <Paper sx={{ mt: 3, overflowX: "auto" }}>
      <div style={{ minWidth: 960 }}>
        <DataGrid
          rows={classRow}
          columns={classCols}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </div>
    </Paper>
  );
}
