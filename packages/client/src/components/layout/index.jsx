import { Box, Grid } from "@mui/material";
import Header from "./header";
function MainLayout({children }) {
 
  return (
    <Box>
      <Grid container direction="column">
        <Grid item xs={12} sx={{ background: "tomato" }}>
          <Header />
        </Grid>
        <Grid item xs={12} sx={{ background: "white", minHeight: "37rem" }}>
          {children}
        </Grid>
        <Grid item xs={12} sx={{ background: "lime" }}>
          
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;
