import { useState } from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { useAttendanceSlice } from './slice';

export default function MemberForm({ currentEventId, setOpenModal }) {
  const { actions } = useAttendanceSlice();
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    eventId: currentEventId,
    name: '',
    status: '',
  });

  const handleChange = (event: SelectChangeEvent) => {
    setMember({ ...member, status: event.target.value });
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        sx={{ width: '100%' }}
        onChange={e => setMember({ ...member, name: e.target.value })}
      />
      <FormControl fullWidth sx={{ my: '20px' }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          value={member.status}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="present">Present</MenuItem>
          <MenuItem value="absent">Absent</MenuItem>
          <MenuItem value="informed">Informed</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: '100%' }}
        onClick={() => {
          dispatch(actions.addUser(member));
          setOpenModal(false);
        }}
      >
        Add Member
      </Button>
    </div>
  );
}
