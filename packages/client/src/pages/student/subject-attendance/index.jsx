import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { CourseAttendanceCols } from "@types";
import { CourseAttendanceRow } from "@constants";

const SubjectAttendanceStudent = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [ids, setIds] = useState([]);

  const handleSelectionModel = useCallback((ids) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
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
              <Grid item xs={9} sx={{ py: 3, ml: 4 }}>
                <Grid item xs={3} sx={{ mb: 3 }}>
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
                <Paper sx={{ mt: 3, overflowX: "auto" }}>
                  <div style={{ minWidth: 960 }}>
                    <DataGrid
                      rows={CourseAttendanceRow}
                      columns={CourseAttendanceCols}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[10, 100]}
                      checkboxSelection
                      onRowSelectionModelChange={handleSelectionModel}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default SubjectAttendanceStudent;
