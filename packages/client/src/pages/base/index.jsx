import * as React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import SidebarAdmin from "../SidebarAdmin";
const Base = () => {
  return (
    <>
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
              <Grid xs={9.5} sx={{ py: 3, pl: 5 }}></Grid>{" "}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Base;
