import * as React from 'react';
import { useState } from 'react';
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
  const projectsList = [
    'Project Cortex',
    'Project Cortex 2',
    'Project Cortex 3',
  ];
  const committeeList = ['HR', 'BD', 'I&M', 'EV'];

  const [date, setDate] = React.useState<Date | null>(null);
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: '',
    rank: '',
    project: '',
    committee: '',
  });

  const handleProjectsChange = (event: SelectChangeEvent) => {
    setValues({ ...values, project: event.target.value });
  };
  const handleCommitteeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({
      ...values,
      committee: (event.target as HTMLInputElement).value,
    });
  };

  function handleSubmit() {
    console.log(values);
  }

  return (
    <>
      <div className="d-md-flex">
        <div className="me-3">
          <TextField
            id="outlined-basic"
            className="mb-3"
            label="Full Name"
            variant="outlined"
            onChange={e => setValues({ ...values, name: e.target.value })}
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={e => setValues({ ...values, email: e.target.value })}
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Role"
            variant="outlined"
            onChange={e => setValues({ ...values, role: e.target.value })}
          />
          <br />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Rank"
            variant="outlined"
            onChange={e => setValues({ ...values, rank: e.target.value })}
          />
          <br />
        </div>
        <div className="ms-3">
          <div className="mb-2">
            <FormControl component="fieldset">
              <FormLabel component="legend">Committee</FormLabel>
              <RadioGroup
                row
                aria-label="committee"
                name="row-radio-buttons-group"
                value={values.committee}
                onChange={handleCommitteeChange}
              >
                {committeeList.map((com, index) => (
                  <FormControlLabel
                    key={index}
                    value={com}
                    control={<Radio />}
                    label={com}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.project}
                label="Project"
                onChange={handleProjectsChange}
              >
                {projectsList.map((proj, index) => (
                  <MenuItem key={index} value={proj}>
                    {proj}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="my-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={date}
                onChange={newValue => {
                  setDate(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="d-flex mt-4">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" className="ms-2">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
