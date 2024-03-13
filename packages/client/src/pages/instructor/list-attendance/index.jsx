import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GREY_COLOR } from "@constants/color";
import React, { useCallback, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { listAttendancesCols } from "@types";
import { listAttendanceRow } from "@constants";

const ListAttendanceInstructor = () => {
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
              <Grid item xs={9.5} sx={{ py: 3, ml: 4 }}>
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
                  <Paper sx={{ mt: 3 }}>
                    <div style={{ minWidth: 960 }}>
                      <DataGrid
                        rows={listAttendanceRow}
                        columns={listAttendancesCols}
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ListAttendanceInstructor;
