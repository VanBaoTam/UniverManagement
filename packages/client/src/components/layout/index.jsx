import { Box, Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation from React Router

import Header from "./header";
import Sidebarr from "./sidebar";
function MainLayout({ children }) {
  const location = useLocation();

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/instructor/attendance-student" ||
    location.pathname === "/instructor/attendance-face-student"; 
  
  const renderSidebar = !isHomePage ? (
    <Grid item xs={1.6}>
      <Sidebarr />
    </Grid>
  ) : null;
  return (
    <Box>
      <Grid container direction="column">
        <Grid item xs={12} sx={{ background: "tomato" }}>
          <Header />
        </Grid>
        <Grid item xs={12} sx={{ background: "white", minHeight: "37rem" }}>
          <Grid container direction="column">
            <Grid>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  overflowX: "auto",
                }}
              >
                <Grid container>
                  {renderSidebar}
                  <Grid item xs={isHomePage ? 12 : 9.5} >
                    {children}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;
