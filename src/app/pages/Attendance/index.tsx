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
import {
  DataGrid,
  GridColDef,
  GridValueSetterParams,
  GridSelectionModel,
} from '@mui/x-data-grid';

import Popup from '../../components/Popup';
import { dateFormat } from '../../components/dateFormat';
import DeleteForm from '../../components/DeleteForm';
import MemberForm from './MemberForm';
import { RiAddFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { useAttendanceSlice } from './slice';
import { selectAttendance } from './slice/selectors';
import { MemberAttendanceType } from './slice/types';

interface Props {}

export function Attendance(props: Props) {
  const { actions } = useAttendanceSlice();
  const dispatch = useDispatch();
  const user = useSelector(selectAttendance);

  const eventsList = ['React basics', 'Elevate'];
  const [openPopup, setOpenPopup] = useState(false);

  const [value, setValue] = useState({
    eventName: '',
    eventType: '',
    eventDate: '',
  });
  const [eventMsg, setEventMsg] = useState('');

  const [rows, setRows] = useState<null | MemberAttendanceType[]>(null);
  const [currentEventId, setCurrentEventId] = useState<null | number>(null);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (rows) {
      const searchedEvent = user.find(e => e.id === currentEventId)?.members;
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
    { field: 'id', headerName: 'S.No.', minWidth: 400 },
    { field: 'name', headerName: 'Name', minWidth: 400 },
    {
      field: 'status',
      type: 'singleSelect',
      headerName: 'Status',
      minWidth: 400,
      editable: true,
      valueOptions: [0, 1, 2],
      valueSetter: setStatus,
      valueFormatter: params => {
        if (params.value === 0) {
          return `Absent`;
        } else if (params.value === 1) {
          return `Present`;
        } else if (params.value === 2) {
          return `Informed`;
        }
      },
    },
  ];

  function EditToolbar() {
    return (
      <>
        {showButton && (
          <div className="w-100 d-flex justify-content-start justify-content-md-end pt-3 px-2 mb-3">
            <Button
              variant="outlined"
              onClick={() => {
                setSelectionModel([]);
                setOpenPopup(true);
              }}
            >
              <RiAddFill />
              Add
            </Button>
            {selectionModel.length > 0 && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => setOpenPopup(true)}
              >
                <MdDelete />
                Delete
              </Button>
            )}
          </div>
        )}
      </>
    );
  }

  function handleSubmit() {
    const rowData = user.find(
      item =>
        item.eventDate === value.eventDate &&
        item.eventName === value.eventName &&
        item.eventType === value.eventType,
    );
    if (typeof rowData === 'undefined') {
      setRows(null);
      setEventMsg('No such Event');
    } else {
      rowData.eventType !== 'crew' ? setShowButton(true) : setShowButton(false);
      setCurrentEventId(rowData.id);
      setRows(rowData.members);
    }
  }

  return (
    <>
      <div className="py-4 py-md-0 mx-3 mx-md-5 d-flex flex-column align-justify-center vh-100">
        <Card
          className="d-flex flex-column align-justify-center p-4 p-md-5"
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <div className="d-md-flex w-md-100">
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
        </Card>
        {rows !== null ? (
          <div className="mt-3" style={{ height: 500, width: '100%' }}>
            <DataGrid
              checkboxSelection={showButton}
              disableSelectionOnClick
              rows={rows}
              columns={columns}
              //loading={rows.length === 0}
              selectionModel={selectionModel}
              onSelectionModelChange={newSelectionModel => {
                setSelectionModel(newSelectionModel);
              }}
              components={{
                Toolbar: EditToolbar,
              }}
              sx={{
                boxShadow: 2,
                backgroundColor: 'white',
                padding: { xs: '10px', md: '15px' },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#e8f3ff',
                  fontSize: '16px',
                },
              }}
            />
          </div>
        ) : (
          <h2 className="mt-5" style={{ color: 'white' }}>
            {eventMsg}
          </h2>
        )}
      </div>

      <Popup
        title={
          selectionModel.length > 0 ? 'Are you sure wanna delete' : 'Add Member'
        }
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        {selectionModel.length > 0 ? (
          <DeleteForm
            setOpenModal={setOpenPopup}
            action={actions.deleteUser({
              eventId: currentEventId,
              deleteMembers: selectionModel,
            })}
          />
        ) : (
          <MemberForm
            actions={actions}
            currentEventId={currentEventId}
            setOpenModal={setOpenPopup}
          />
        )}
      </Popup>
    </>
  );
}
