/**
 *
 * EventsPage
 *
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  ListSubheader,
  Select,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useRef } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { RiAddFill } from 'react-icons/ri';
import { styled } from '@mui/material/styles';

import Popup from '../UserManagement/Popup';
import EventForm from './EventForm';

import { useSelector, useDispatch } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';

interface Props {}

const options = ['Crew', 'Learnzeit', 'External'];
const phaseOptions = ['1', '2', '3', '4'];

export function EventPage(props: Props) {
  const { actions } = useEventsSlice();
  const dispatch = useDispatch();
  const user = useSelector(selectEvents);
  const [userData, setUserData] = useState(user);

  const conductedByDisplayRef = useRef<HTMLDivElement>(null);
  const conductedByRef = useRef<HTMLSelectElement>(null);
  const topicRef = useRef<HTMLInputElement | null>(null);
  const phaseRef = useRef<HTMLInputElement | null>(null);
  const nameDisplayRef = useRef<HTMLDivElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const [conductedByValue, setConductedByValue] = React.useState<string | null>(
    '',
  );
  const [datevalue, setDateValue] = React.useState<Date | null>(null);
  const [updateUser, setUpdateUser] = useState<number | null>(null);
  const [openPopup, setOpenPopup] = useState(false);

  function handleSubmit() {
    const conductedBy = conductedByRef.current?.value;
    const name = nameFieldRef.current?.value;
    const topic = topicRef.current?.value;
    const date = dateRef.current?.value;
    console.log(conductedBy, name, topic, date, conductedByValue);
  }

  function handleDelete() {
    console.log('delete');
  }

  function handleChange(e: string | null) {
    console.log(e);
    if (e === 'External' || e === 'Learnzeit') {
      conductedByDisplayRef.current &&
        (conductedByDisplayRef.current.style.display = 'block');
    }
    if (e === 'Crew' || e === null) {
      conductedByDisplayRef.current &&
        (conductedByDisplayRef.current.style.display = 'none');
    }
  }

  const handleConductedByChange = (event: SelectChangeEvent) => {
    setConductedByValue(event.target.value);
    if (event.target.value === 'individual') {
      nameDisplayRef.current &&
        (nameDisplayRef.current.style.display = 'block');
    } else {
      nameDisplayRef.current && (nameDisplayRef.current.style.display = 'none');
    }
    console.log(event.target.value);
  };

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const CustomTable = styled(Table)(({ theme }) => ({
    table: {
      marginTop: theme.spacing(3),
      '& thead th': {
        fontWeight: '600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
      '& tbody td': {
        fontWeight: '300',
      },
      '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
      },
    },
  }));

  function handleChangeSearch(searchedVal: string | null) {
    if (searchedVal === '' || searchedVal === null) {
      setUserData(user);
    } else {
      const filteredUser = user.filter(row =>
        row.name.toLowerCase().includes(searchedVal.toLowerCase()),
      );
      setUserData(filteredUser);
    }
  }

  return (
    <>
      <section className="w-100">
        <div className="mt-2 d-md-flex justify-content-around">
          <div className="">
            <Autocomplete
              id="controllable-states-demo"
              options={options}
              sx={{
                width: {
                  xs: '100%',
                  md: 250,
                },
              }}
              renderInput={params => (
                <TextField {...params} label="Event Type" />
              )}
              onChange={(e, v) => {
                handleChange(v);
              }}
            />
          </div>

          <div
            className="my-md-0 mx-md-2 mx-0 my-2"
            style={{ display: 'none' }}
            ref={conductedByDisplayRef}
          >
            <FormControl
              sx={{
                width: {
                  xs: '100%',
                  md: 250,
                },
              }}
            >
              <InputLabel htmlFor="grouped-select">Conducted By</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                inputRef={conductedByRef}
                onChange={handleConductedByChange}
              >
                <ListSubheader>Projects</ListSubheader>
                <MenuItem value="cortex">Cortex</MenuItem>
                <MenuItem value="helix">Helix</MenuItem>
                <MenuItem value="pager">Pager</MenuItem>
                <MenuItem value="website">Website</MenuItem>
                <MenuItem value="opencloud">Opencloud</MenuItem>
                <ListSubheader>Committee</ListSubheader>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="bd">Business Dev</MenuItem>
                <MenuItem value="inm">Innovation and Media</MenuItem>
                <ListSubheader>Individual</ListSubheader>
                <MenuItem value="individual">
                  <em>Individual</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="my-md-0 my-2">
            <TextField
              sx={{
                width: {
                  xs: '100%',
                  md: 250,
                },
              }}
              id="outlined-basic"
              label="Topic"
              variant="outlined"
              inputRef={topicRef}
            />
          </div>

          <div className="">
            <Autocomplete
              id="controllable-states-demo"
              options={phaseOptions}
              sx={{ width: { xs: '100%', md: 250 } }}
              renderInput={params => <TextField {...params} label="Phase" />}
              onChange={(e, v) => {
                handleChange(v);
              }}
            />
          </div>

          <div className="my-md-0 my-2 mx-md-2 mx-0">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={props => (
                  <TextField
                    {...props}
                    sx={{
                      width: { xs: '100%', md: 250 },
                    }}
                  />
                )}
                label="Date Time"
                value={datevalue}
                ampm={false}
                onChange={newValue => {
                  setDateValue(newValue);
                }}
                inputRef={dateRef}
              />
            </LocalizationProvider>
          </div>

          <div className="" style={{ display: 'none' }} ref={nameDisplayRef}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              inputRef={nameFieldRef}
            />
          </div>
        </div>

        <div
          className="vh-75 d-flex flex-column align-justify-center"
          style={{
            backgroundColor: '#f4f5fd',
          }}
        >
          <Card
            className="d-flex flex-column align-justify-center p-3 p-md-5"
            style={{ width: '90%' }}
          >
            <div className="d-md-flex justify-content-between align-items-center mb-4 w-md-100">
              <TextField
                label="Search Event"
                id="outlined-start-adornment"
                className="mb-3 mb-md-0 w-md-50"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
                onChange={e => handleChangeSearch(e.target.value)}
              />
              <div>
                <Button
                  variant="outlined"
                  className="w-100"
                  style={{ width: '100%' }}
                  onClick={() => {}}
                >
                  <RiAddFill />
                  <span className="">Add Event</span>
                </Button>
              </div>
            </div>
            <TableContainer>
              <CustomTable sx={{ minWidth: 650 }} aria-label="Events table">
                <TableHead sx={{ bgcolor: '#dee2fc' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Date and time</TableCell>
                    <TableCell align="center">Phase</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.length > 0 ? (
                    userData.map(row => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.dateTime}</TableCell>
                        <TableCell align="center">{row.phase}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="Edit"
                            color="primary"
                            onClick={() => {
                              setUpdateUser(row.id);
                              setOpenPopup(true);
                            }}
                          >
                            <MdEdit />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            color="secondary"
                            className="ms-2"
                            onClick={() =>
                              dispatch(actions.deleteEvent(row.id))
                            }
                          >
                            <MdDelete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No Event</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </CustomTable>
            </TableContainer>
          </Card>
        </div>
      </section>
      <Popup
        title="Event Form"
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        <EventForm setOpenModal={setOpenPopup} updateUser={updateUser} />
      </Popup>
    </>
  );
}
