import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SidebarInstructor from "../SidebarInstructor";
import { GREY_COLOR } from "../../../constants/color";
import TableListAttendance from "../../../components/TableListAttendance";
const ListAttendanceInstructor = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
              <Grid item xs={2}>
                <SidebarInstructor />
              </Grid>
              <Grid item xs={9.5} sx={{ py: 3, pl: 5 }}>
                <Grid container>
                  <Grid item xs={2}>
                    Môn học:
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
                  <form className="mt-4 ps-2">
                    <Grid container>
                      <Grid item xs={8}>
                        <TextField
                          id="outlined-basic"
                          label="Mã sinh viên"
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ background: "white" }}
                          required
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ pl: 1 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          type="submit"
                          sx={{ background: GREY_COLOR }}
                        >
                          Tìm kiếm
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <TableListAttendance />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ListAttendanceInstructor;
