import React, { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { BLUE_COLOR, RED_COLOR } from "@constants/color";
import ModalAddClass from "@components/ModalAddClass";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { classCols } from "@types";
import { classRow } from "@constants";

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
              <Grid item xs={10.5} sx={{ py: 3, pl: 5, ml: 4 }}>
                <Grid container sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      sx={{ background: BLUE_COLOR }}
                      onClick={handleOpen}
                    >
                      Thêm lớp học
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button variant="contained" sx={{ background: RED_COLOR }}>
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <div style={{ minWidth: 960 }}>
                    <DataGrid
                      rows={classRow}
                      columns={classCols}
                      checkboxSelection
                    />
                  </div>
                </Paper>
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
