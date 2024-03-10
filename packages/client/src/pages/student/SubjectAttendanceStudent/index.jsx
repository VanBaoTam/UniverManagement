import * as React from "react";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SidebarStudent from "../SidebarStudent";
import TableSubjectAttendance from "../../../components/TableSubjectAttendance";
const SubjectAttendanceStudent = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    };

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
                <SidebarStudent />
              </Grid>
              <Grid xs={9.5} sx={{ py: 3, pl: 5 }}>
                <Grid xs={3} sx={{mb:3}}>
                  {" "}Môn học:
                  <FormControl
                    size="small"
                    fullWidth
                    sx={{ background: "white" }}
                  >
                    
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <TableSubjectAttendance/>
              </Grid>
              {" "}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default SubjectAttendanceStudent;
