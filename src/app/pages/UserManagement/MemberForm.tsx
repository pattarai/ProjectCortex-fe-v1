import * as React from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function MemberForm() {
  const [age, setAge] = React.useState('');
  const [value, setValue] = React.useState<Date | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="d-md-flex">
        <div className="me-3">
          <TextField
            id="outlined-basic"
            className="mb-3"
            label="Full Name"
            variant="outlined"
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Role"
            variant="outlined"
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Rank"
            variant="outlined"
          />
          <br />
        </div>
        <div className="ms-3">
          <div className="mb-2">
            <FormControl component="fieldset">
              <FormLabel component="legend">Committee</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="human-resource"
                  control={<Radio />}
                  label="HR"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="events"
                  control={<Radio />}
                  label="EV"
                />
                <FormControlLabel
                  value="business-dev"
                  control={<Radio />}
                  label="BD"
                />
                <FormControlLabel
                  value="Innovation-media"
                  control={<Radio />}
                  label="I&M"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Project"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="my-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={value}
                onChange={newValue => {
                  setValue(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="d-flex mt-4">
            <Button variant="contained">Submit</Button>
            <Button variant="contained" color="secondary" className="ms-2">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
