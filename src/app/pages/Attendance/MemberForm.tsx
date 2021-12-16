import { useState } from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';

export default function MemberForm({ currentEventId, setOpenModal, actions }) {
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    eventId: currentEventId,
    name: '',
    status: '',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    statusError: '',
    isError: false,
  });

  function handleSubmit() {
    let noofErrors = 0;
    let err = { ...errors };

    Object.entries(member).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '') {
        err[`${key}Error`] = 'This field is required';
        noofErrors++;
      }
    });

    if (noofErrors === 0) {
      dispatch(actions.addUser(member));
      setOpenModal(false);
    } else {
      err.isError = true;
      setErrors(err);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setMember({ ...member, status: event.target.value });
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        error={errors.isError && (member.name.trim() === '' ? true : false)}
        helperText={
          errors.isError && (errors.nameError !== '' ? errors.nameError : '')
        }
        label="Name"
        variant="outlined"
        sx={{ width: '100%' }}
        onChange={e => setMember({ ...member, name: e.target.value })}
      />
      <FormControl
        fullWidth
        sx={{ my: '20px' }}
        error={errors.isError && (member.status === '' ? true : false)}
      >
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          value={member.status}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Informed">Informed</MenuItem>
        </Select>
        <FormHelperText>
          {errors.isError &&
            (errors.statusError !== '' ? errors.statusError : '')}
        </FormHelperText>
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: '100%' }}
        onClick={handleSubmit}
      >
        Add Member
      </Button>
    </div>
  );
}
