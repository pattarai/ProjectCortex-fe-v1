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
  Chip,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueGetterParams,
  GridActionsCellItem,
  GridRowParams,
} from '@mui/x-data-grid';

import Popup from '../../components/Popup';
import { dateFormat } from '../../components/dateFormat';
import DeleteForm from '../../components/DeleteForm';
import MemberForm from './MemberForm';
import { RiAddFill } from 'react-icons/ri';
import { MdDelete, MdOutlineCheck, MdClear, MdEdit } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { useAttendanceSlice } from './slice';
import { selectAttendance } from './slice/selectors';

interface Props {}

export function Attendance(props: Props) {
  const { actions } = useAttendanceSlice();
  const dispatch = useDispatch();
  const { crewAttendance, externalAttendance, eventId, isExist } =
    useSelector(selectAttendance);

  type AttendanceType = {
    crewAttendance: typeof crewAttendance;
    externalAttendance: typeof externalAttendance;
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [updateOrDeleteMember, setUpdateOrDeleteMember] = useState({
    updateMemberId: 0,
    deleteMemberId: 0,
  });
  // const [eventMsg, setEventMsg] = useState('');

  const [value, setValue] = useState({
    eventName: 'Grievance Meet',
    eventType: 'crew',
    eventDate: '2022-01-01T00:00:00.000Z',
  });

  const [rows, setRows] = useState<AttendanceType>({
    crewAttendance: [],
    externalAttendance: [],
  });

  useEffect(() => {
    if (crewAttendance.length) {
      setRows({
        crewAttendance,
        externalAttendance,
      });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crewAttendance, externalAttendance]);

  function customCellRender(params: GridRenderCellParams) {
    if (params.row.status === 0) {
      return <Chip variant="outlined" color="error" label="Absent" />;
    } else if (params.row.status === 2) {
      return <Chip variant="outlined" color="info" label="Informed" />;
    } else {
      return <Chip variant="outlined" color="success" label="Present" />;
    }
  }
  function customIsCrewCellRender(params: GridRenderCellParams) {
    if (params.row.users) {
      return (
        <MdOutlineCheck
          style={{ color: '#53bd83', height: '30px', width: 'auto' }}
        />
      );
    } else {
      return (
        <MdClear style={{ color: '#d64545', height: '30px', width: 'auto' }} />
      );
    }
  }

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.name) {
          return params.row.name;
        } else {
          return `${params.row.users.firstName} ${params.row.users.lastName}`;
        }
      },
    },
    {
      field: 'isCrew',
      headerName: 'IsCrew',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: customIsCrewCellRender,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: customCellRender,
      valueFormatter: params => {
        if (params.value === 0) {
          return `Absent`;
        } else if (params.value === 2) {
          return `Informed`;
        } else {
          return `Present`;
        }
      },
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => {
        if (params.row.externalId) {
          return [
            <GridActionsCellItem
              disabled={loading}
              icon={<MdDelete style={{ fontSize: '23px' }} />}
              color="secondary"
              onClick={() => {
                setUpdateOrDeleteMember({
                  deleteMemberId: params.row.externalId,
                  updateMemberId: 0,
                });
                setOpenPopup(true);
              }}
              label="Delete"
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              icon={<MdEdit style={{ fontSize: '23px' }} />}
              disabled={loading}
              color="primary"
              onClick={() => {
                setUpdateOrDeleteMember({
                  deleteMemberId: 0,
                  updateMemberId: params.row.userId,
                });
                setOpenPopup(true);
              }}
              label="Edit"
            />,
          ];
        }
      },
    },
  ];

  function EditToolbar() {
    return (
      <>
        <div className="w-100 d-flex justify-content-start justify-content-md-end pt-3 px-2 mb-3">
          {!isExist && (
            <Button
              disabled={loading}
              variant="outlined"
              onClick={() => {
                setUpdateOrDeleteMember({
                  deleteMemberId: 0,
                  updateMemberId: 0,
                });
                setOpenPopup(true);
              }}
              className="me-2"
            >
              <RiAddFill />
              Add
            </Button>
          )}
          <Button
            disabled={loading}
            variant="outlined"
            onClick={() => {
              dispatch(
                actions.updateAttendance({
                  crewAttendance: rows.crewAttendance,
                  externalAttendance: rows.externalAttendance,
                  isExist,
                }),
              );
              setLoading(true);
            }}
          >
            Send
          </Button>
        </div>
      </>
    );
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
            <TextField
              fullWidth
              value={value.eventName}
              // error={
              // }
              // helperText={
              //   errors.isError &&
              //   (errors.firstNameError !== '' ? errors.firstNameError : '')
              // }
              id="outlined-basic"
              className="mb-3"
              label="First Name"
              variant="outlined"
              inputProps={{ maxLength: 15 }}
              onChange={e => setValue({ ...value, eventName: e.target.value })}
            />
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
              disabled={crewAttendance.length > 0 && loading}
              variant="contained"
              sx={{
                width: { xs: '100%', md: '50%' },
                mt: { xs: '20px', md: '0px' },
                mx: { xs: '0px', md: '20px' },
              }}
              onClick={() => {
                dispatch(actions.getAttendance(value));
                setLoading(true);
              }}
            >
              Submit
            </Button>
          </div>
        </Card>
        {rows.crewAttendance.length ? (
          <div className="mt-3" style={{ height: 500, width: '100%' }}>
            <DataGrid
              disableSelectionOnClick
              getRowId={r =>
                r.userId
                  ? `${r.users.firstName}-${r.userId}`
                  : `${r.name}-${r.externalId}`
              }
              rows={[...rows.crewAttendance, ...rows.externalAttendance]}
              columns={columns}
              loading={loading}
              components={{
                Toolbar: EditToolbar,
              }}
              sx={{
                boxShadow: 2,
                backgroundColor: 'white',
                padding: { xs: '10px', md: '15px' },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#dee2fc',
                  borderRadius: '5px',
                  fontSize: '16px',
                },
              }}
            />
          </div>
        ) : (
          <h2 className="mt-5" style={{ color: 'white' }}>
            {`No Events`}
          </h2>
        )}
      </div>

      <Popup
        title={
          updateOrDeleteMember.deleteMemberId
            ? 'Are you sure wanna delete'
            : updateOrDeleteMember.updateMemberId
            ? 'Update Status'
            : 'Add Member'
        }
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        {updateOrDeleteMember.deleteMemberId ? (
          <DeleteForm
            setLoading={setLoading}
            setOpenModal={setOpenPopup}
            action={actions.deleteExternalMember({
              externalId: updateOrDeleteMember.deleteMemberId,
            })}
          />
        ) : (
          <MemberForm
            updateMember={updateOrDeleteMember.updateMemberId}
            crewAttendance={crewAttendance}
            actions={actions}
            currentEventId={eventId}
            setOpenModal={setOpenPopup}
          />
        )}
      </Popup>
    </>
  );
}
