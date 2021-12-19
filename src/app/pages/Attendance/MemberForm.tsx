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
import { useDispatch } from 'react-redux';

export default function MemberForm({ currentEventId, setOpenModal, actions }) {
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    eventId: currentEventId,
    name: '',
    status: 0,
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
        error={errors.isError && (member.status === 5 ? true : false)}
      >
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          value={member.status.toString()}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          onChange={e =>
            setMember({ ...member, status: parseInt(e.target.value) })
          }
        >
          <MenuItem value={1}>Present</MenuItem>
          <MenuItem value={0}>Absent</MenuItem>
          <MenuItem value={2}>Informed</MenuItem>
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
