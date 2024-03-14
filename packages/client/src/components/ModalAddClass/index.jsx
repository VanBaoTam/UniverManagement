import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BLUE_COLOR } from "@constants/color";

const ModalAddClass = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);
  return (
    <React.Fragment>
      <form className="my-3">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid fontWeight="bold" fontSize="1.5rem">
            THÊM LỚP HỌC
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} sx={{ pr: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Giảng viên
                </InputLabel>
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
            <Grid item xs={6} sx={{ pr: 1, mt: 2 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Môn học</InputLabel>
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
            <Grid item xs={6} sx={{ pl: 1, mt: 2 }}>
              <TextField
                required
                type="number"
                id="outlined-basic"
                label="Số buổi học"
                variant="outlined"
                fullWidth
                sx={{ background: "white" }}
                min={1}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ pr: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Ca I</InputLabel>
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
            <Grid item xs={6} sx={{ pl: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Thứ I</InputLabel>
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
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ pr: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Ca II</InputLabel>
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
            <Grid item xs={6} sx={{ pl: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Thứ II</InputLabel>
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
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ pr: 1 }}>
              Ngày mở lớp:
              <TextField
                required
                type="date"
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: 1 }}>
              Ngày kết thúc:
              <TextField
                required
                type="date"
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ background: "white" }}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 2, fontSize: "1.1rem", background: BLUE_COLOR }}
                type="submit"
              >
                Thêm lớp
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
export default ModalAddClass;
