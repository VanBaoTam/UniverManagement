import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TABLEATTENDANCEFACES, TABLEATTENDANCEINSTRUCTORS } from "../../constants/common";
import { Button, Checkbox } from "@mui/material";
import { BLUE_COLOR, MAIN_COLOR } from "../../constants/color";
import { Link } from "react-router-dom";

export default function TableAttendanceFace() {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} >
      <Table aria-label="simple table" >
        <TableHead >
          <TableRow
           
          >
            {TABLEATTENDANCEFACES.map((cot) => (
              <TableCell key={cot.id}>{cot.column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell> <TableCell>c</TableCell>
          <TableCell>d</TableCell> <TableCell>e</TableCell>
          <TableCell
            sx={{
              background: MAIN_COLOR,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Đã điểm danh
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
