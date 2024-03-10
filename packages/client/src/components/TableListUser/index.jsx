import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TABLELISTUSERS } from "../../constants/common";
import { Button } from "@mui/material";



export default function TableListUser() {
  return (
    <TableContainer component={Paper} sx={{}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLELISTUSERS.map((cot) => (
              <TableCell key={cot.id}>{cot.column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableCell>a</TableCell>
           <TableCell>b</TableCell>{" "}
          <TableCell>c</TableCell>
          <TableCell>d</TableCell>{" "}
          <TableCell>e</TableCell>
          <TableCell>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
              }}
            >
              Vô hiệu{" "}
            </Button>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
