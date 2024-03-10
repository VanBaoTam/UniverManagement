import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TABLEATTENDANCEINSTRUCTORS } from "../../constants/common";
import { Button, Checkbox } from "@mui/material";
import { BLUE_COLOR } from "../../constants/color";
import { Link } from "react-router-dom";

export default function TableAttendanceInstructor() {
  return (
    <TableContainer component={Paper} sx={{}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLEATTENDANCEINSTRUCTORS.map((cot) => (
              <TableCell key={cot.id}>{cot.column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell> <TableCell>c</TableCell>
          <TableCell>d</TableCell> <TableCell>e</TableCell>
          <TableCell>f</TableCell>
          <TableCell>
            <Link to="/AttendanceFaceInstructor">
              <Button variant="contained" sx={{ background: BLUE_COLOR }}>
                điểm danh
              </Button>
            </Link>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
