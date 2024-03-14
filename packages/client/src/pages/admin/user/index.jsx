import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { GREY_COLOR } from "@constants/color";
import TableListUser from "@components/TbListUser";
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
              <Grid item xs={12} sx={{ py: 3, pl: 5, ml: 4 }}>
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
