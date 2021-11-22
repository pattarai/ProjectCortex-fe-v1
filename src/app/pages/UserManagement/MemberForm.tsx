import * as React from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

export default function MemberForm() {
  return (
    <>
      <div className="d-md-flex">
        <div className="me-3">
          <TextField id="outlined-basic" label="Full Name" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Role" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Rank" variant="outlined" />
          <br />
        </div>
        <div className="ms-3">
          <FormControl component="fieldset">
            <FormLabel component="legend">Committee</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel
                value="human-resource"
                control={<Radio />}
                label="HR"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="events" control={<Radio />} label="EV" />
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
      </div>
    </>
  );
}
