/**
 *
 * Attendance
 *
 */
import { useState } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {}

type AttendanceType = {
  eventName: string;
  eventDate: Date | null;
  eventType: string;
};

export function Attendance(props: Props) {
  const eventsList = ['Event 1', 'Event 2', 'Event 3'];

  const [value, setValue] = useState<AttendanceType>({
    eventName: '',
    eventDate: null,
    eventType: '',
  });

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'eventType') {
      setValue({
        ...value,
        eventType: event.target.value,
      });
    }
    if (event.target.name === 'eventName') {
      setValue({
        ...value,
        eventName: event.target.value,
      });
    }
  };
  return (
    <>
      <div className="py-3 px-4 d-md-flex">
        <FormControl fullWidth sx={{ mr: '20px' }}>
          <InputLabel id="demo-simple-select-label">Event Name</InputLabel>
          <Select
            name="eventName"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value.eventName}
            label="Event Name"
            onChange={handleChange}
          >
            {eventsList.map(event => (
              <MenuItem key={event} value={event}>
                {event}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mx: { md: '20px' }, my: { xs: '20px', md: '0px' } }}
        >
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            name="eventType"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value.eventType}
            label="Event type"
            onChange={handleChange}
          >
            <MenuItem value="crew">Crew</MenuItem>
            <MenuItem value="learnzeit">Learnzeit</MenuItem>
            <MenuItem value="external">External</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={value.eventDate}
            onChange={newValue => {
              setValue({ ...value, eventDate: newValue });
            }}
            renderInput={params => (
              <TextField
                {...params}
                sx={{ width: '100%', ml: { md: '20px' } }}
              />
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
