/**
 *
 * Attendance
 *
 */
import { useState } from 'react';
import {
  Button,
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
import { DataGrid } from '@mui/x-data-grid';

import Popup from '../../components/Popup';
import MemberForm from './MemberForm';

interface Props {}

type AttendanceType = {
  eventName: string;
  eventDate: Date | null;
  eventType: string;
};

export function Attendance(props: Props) {
  const [openPopup, setOpenPopup] = useState(false);
  const eventsList = ['Event 1', 'Event 2', 'Event 3'];

  const [value, setValue] = useState<AttendanceType>({
    eventName: '',
    eventType: '',
    eventDate: null,
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

  const [rows, setRows] = useState([
    { id: 1, sno: 1, name: 'Joshua', status: 'Present' },
    { id: 2, sno: 2, name: 'Jeinthan', status: 'Absent' },
    { id: 3, sno: 3, name: 'Dhivya', status: 'Informed' },
  ]);

  const columns = [
    { field: 'sno', headerName: 'S.No.', width: 400 },
    { field: 'name', headerName: 'Name', width: 400 },
    {
      field: 'status',
      headerName: 'Status',
      width: 400,
      editable: true,
      valueOptions: ['Present', 'Absent', 'Informed'],
    },
  ];

  function EditToolbar() {
    return (
      <div className="w-100 d-flex justify-content-start justify-content-md-end pt-3 px-2">
        <Button variant="outlined" onClick={() => setOpenPopup(true)}>
          Add
        </Button>
      </div>
    );
  }

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
                sx={{ width: '100%', mx: { md: '20px' } }}
              />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained" sx={{ width: '50%' }}>
          Submit
        </Button>
      </div>
      <div className="mt-3 px-4" style={{ height: 400, width: '100%' }}>
        <DataGrid
          components={{
            Toolbar: EditToolbar,
          }}
          rows={rows}
          columns={columns}
        />
      </div>
      <Popup
        title="Add Member"
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        <MemberForm />
      </Popup>
    </>
  );
}
