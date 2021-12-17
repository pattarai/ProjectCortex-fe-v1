/**
 *
 * Attendance
 *
 */
import { useState, useEffect } from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Card,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { DataGrid, GridColDef, GridValueSetterParams } from '@mui/x-data-grid';

import Popup from '../../components/Popup';
import { dateFormat } from '../../components/dateFormat';
import MemberForm from './MemberForm';
import { RiAddFill } from 'react-icons/ri';

import { useSelector, useDispatch } from 'react-redux';
import { useAttendanceSlice } from './slice';
import { selectAttendance } from './slice/selectors';
import { MemberAttendanceType } from './slice/types';

interface Props {}

export function Attendance(props: Props) {
  const { actions } = useAttendanceSlice();
  const dispatch = useDispatch();
  const user = useSelector(selectAttendance);

  const eventsList = ['Think Tank', 'Elevate'];
  const [openPopup, setOpenPopup] = useState(false);

  const [value, setValue] = useState({
    eventName: '',
    eventType: '',
    eventDate: '',
  });
  const [eventMsg, setEventMsg] = useState('');

  const [rows, setRows] = useState<null | MemberAttendanceType[]>(null);
  const [currentEventId, setCurrentEventId] = useState<null | number>(null);

  useEffect(() => {
    if (rows && user.currentAction === 'addMember') {
      const searchedEvent = user.events.find(
        e => e.id === currentEventId,
      )?.members;
      searchedEvent && setRows(searchedEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function setStatus(params: GridValueSetterParams) {
    const newRow = { ...params.row, status: params.value };
    dispatch(actions.updateUser({ eventId: currentEventId, member: newRow }));
    return newRow;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'S.No.', width: 400 },
    { field: 'name', headerName: 'Name', width: 400 },
    {
      field: 'status',
      type: 'singleSelect',
      headerName: 'Status',
      width: 400,
      editable: true,
      valueOptions: ['Present', 'Absent', 'Informed'],
      valueSetter: setStatus,
    },
  ];

  function EditToolbar() {
    return (
      <>
        <div className="w-100 d-flex justify-content-start justify-content-md-end pt-3 px-2 mb-3">
          <Button variant="outlined" onClick={() => setOpenPopup(true)}>
            <RiAddFill />
            Add
          </Button>
        </div>
      </>
    );
  }

  function handleSubmit() {
    const rowData = user.events.find(
      item =>
        item.eventDate === value.eventDate &&
        item.eventName === value.eventName,
    );
    if (typeof rowData === 'undefined') {
      setRows(null);
      setEventMsg('No such Event');
    } else {
      setCurrentEventId(rowData.id);
      setRows(rowData.members);
    }
  }

  return (
    <>
      <div className="py-4 py-md-0 mx-3 mx-md-5 d-flex flex-column align-justify-center vh-100">
        <Card
          className="d-flex flex-column align-justify-center py-4 px-3 p-md-5"
          sx={{ width: '100%', height: '100%' }}
        >
          <div className="pb-3 d-md-flex w-md-100">
            <FormControl fullWidth sx={{ mr: '20px' }}>
              <InputLabel id="demo-simple-select-label">Event Name</InputLabel>
              <Select
                name="eventName"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value.eventName}
                label="Event Name"
                onChange={event =>
                  setValue({
                    ...value,
                    eventName: event.target.value,
                  })
                }
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
                onChange={event =>
                  setValue({
                    ...value,
                    eventType: event.target.value,
                  })
                }
              >
                <MenuItem value="crew">Crew</MenuItem>
                <MenuItem value="learnzeit">Learnzeit</MenuItem>
                <MenuItem value="external">External</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={value.eventDate === '' ? null : value.eventDate}
                onChange={newValue => {
                  const newDate = dateFormat(newValue);
                  setValue({ ...value, eventDate: newDate });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    sx={{ width: '100%', mx: { md: '20px' } }}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', md: '50%' },
                mt: { xs: '20px', md: '0px' },
                mx: { xs: '0px', md: '20px' },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          {rows !== null ? (
            <div className="mt-3" style={{ height: 400, width: '100%' }}>
              <DataGrid
                components={{
                  Toolbar: EditToolbar,
                }}
                rows={rows}
                columns={columns}
              />
            </div>
          ) : (
            <h2 className="mt-4">{eventMsg}</h2>
          )}
        </Card>
      </div>
      <Popup
        title="Add Member"
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        <MemberForm
          actions={actions}
          currentEventId={currentEventId}
          setOpenModal={setOpenPopup}
        />
      </Popup>
    </>
  );
}
