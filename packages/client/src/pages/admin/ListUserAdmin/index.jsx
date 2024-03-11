import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import SidebarAdmin from "../SidebarAdmin";
import { GREY_COLOR } from "../../../constants/color";
import TableListUser from "../../../components/TableListUser";
const ListUserAdmin = () => {
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
                <form className="my-3">
                  <Grid container>
                    <Grid xs={3}>
                      <TextField
                        id="outlined-basic"
                        label="Tìm kiếm"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ background: "white" }}
                        required
                      />
                    </Grid>
                    <Grid xs={4}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ background: GREY_COLOR, ml: 1 }}
                      >
                        Tìm kiếm
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <TableListUser />
              </Grid>{" "}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ListUserAdmin;
