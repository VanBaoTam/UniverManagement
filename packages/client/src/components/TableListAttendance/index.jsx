import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  TABLELIST_ATTENDANCES,
  TABLESUBJECT_ATTENDANCES,
} from "../../constants/common";
import { Button, Checkbox } from "@mui/material";

export default function TableListAttendance() {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLELIST_ATTENDANCES.map((cot) => (
              <TableCell key={cot.id}>{cot.column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell> <TableCell>c</TableCell>
          <TableCell>s</TableCell>{" "}
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            {" "}
            <Checkbox />
          </TableCell>
          <TableCell>
            {" "}
            <Checkbox />
          </TableCell>
          <TableCell>
            {" "}
            <Checkbox />
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
