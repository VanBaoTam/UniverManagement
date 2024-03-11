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
                <TableListUser />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ListUserAdmin;
