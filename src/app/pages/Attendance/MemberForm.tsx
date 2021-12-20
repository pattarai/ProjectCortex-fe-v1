import { useState } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';

export default function MemberForm({ currentEventId, setOpenModal, actions }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    eventId: currentEventId,
    name: '',
    status: 0,
  });

  const [errors, setErrors] = useState({
    nameError: '',
    isError: false,
  });

  async function handleSubmit() {
    let err = { ...errors };
    if (member.name.trim() === '') {
      err.nameError = 'Name is required';
      err.isError = true;
      setErrors(err);
    } else {
      setLoading(true);
      await dispatch(actions.addUser(member));
      setOpenModal(false);
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
      <FormControl fullWidth sx={{ my: '20px' }}>
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
      </FormControl>
      <LoadingButton
        loading={loading}
        variant="outlined"
        sx={{ width: '100%' }}
        onClick={handleSubmit}
      >
        Add Member
      </LoadingButton>
    </div>
  );
}
