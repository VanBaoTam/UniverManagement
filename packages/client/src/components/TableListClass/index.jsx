import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TABLELISTCLASSS, TABLELISTUSERS } from "../../constants/common";
import { Button } from "@mui/material";
import { YELLOW_COLOR } from "../../constants/color";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalClass from "../ModalClass";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};

export default function TableListClass() {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  return (
    <>
      <TableContainer component={Paper} sx={{}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {TABLELISTCLASSS.map((cot) => (
                <TableCell key={cot.id}>{cot.column}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableCell>a</TableCell>
            <TableCell>b</TableCell> <TableCell>c</TableCell>
            <TableCell>d</TableCell> <TableCell>e</TableCell>
            <TableCell>e</TableCell>
            <TableCell>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
                  mr: 1,
                }}
              >
                Xoá{" "}
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: YELLOW_COLOR,
                  color: "black",
                }}
                onClick={handleOpen}
              >
                Sửa{" "}
              </Button>
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
         <ModalClass/>
        </Box>
      </Modal>
    </>
  );
}
