import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export default function MemberForm() {
  let memberStatus = '';
  const handleChange = (event: SelectChangeEvent) => {
    memberStatus = event.target.value;
  };
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        sx={{ width: '100%' }}
      />
      <FormControl fullWidth sx={{ my: '20px' }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
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
      <Button variant="outlined" color="primary" sx={{ width: '100%' }}>
        Add Member
      </Button>
    </div>
  );
}
