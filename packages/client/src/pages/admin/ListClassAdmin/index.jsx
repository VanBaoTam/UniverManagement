import React, { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import SidebarAdmin from "../SidebarAdmin";
import { BLUE_COLOR, RED_COLOR } from "../../../constants/color";
import TableListClass from "../../../components/TableListClass";
import ModalAddClass from "../../../components/ModalAddClass";
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
const ListClassAdmin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid xs={2}>
                <SidebarAdmin />
              </Grid>
              <Grid xs={9.5} sx={{ py: 3, pl: 5 }}>
                <Grid container sx={{ mb: 3 }}>
                  <Grid xs={6}>
                    <Button
                      variant="contained"
                      sx={{ background: BLUE_COLOR }}
                      onClick={handleOpen}
                    >
                      Thêm lớp học
                    </Button>
                  </Grid>
                  <Grid
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button variant="contained" sx={{ background: RED_COLOR }}>
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
                <TableListClass />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalAddClass />
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default ListClassAdmin;
