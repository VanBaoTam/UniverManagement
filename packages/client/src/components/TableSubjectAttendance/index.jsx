import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TABLESUBJECT_ATTENDANCES } from "../../constants/common";
import { Checkbox } from "@mui/material";

export default function TableSubjectAttendance() {
  return (
    <TableContainer component={Paper} sx={{}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLESUBJECT_ATTENDANCES.map((cot) => (
              <TableCell key={cot.id}>{cot.column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableCell>a</TableCell>
          <TableCell>b</TableCell> <TableCell>c</TableCell>
          <TableCell>s</TableCell>
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
            <Checkbox />
          </TableCell>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <Checkbox />
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
