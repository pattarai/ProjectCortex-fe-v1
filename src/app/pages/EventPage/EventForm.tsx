import * as React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { InputLabel, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';
import { Events } from './slice/types';
import { dateTimeFormat } from '../../components/dateFormat';

export default function MemberForm({ setOpenModal, updateUser, setLoading }) {
  const { actions } = useEventsSlice();
  const dispatch = useDispatch();
  const { events, projects, committee } = useSelector(selectEvents);

  let updateUserValue = updateUser
    ? events.find(u => u.eventId === updateUser)
    : null;

  const [values, setValues] = useState<Events>({
    eventId: updateUserValue ? updateUserValue.eventId : 0,
    eventName: updateUserValue ? updateUserValue.eventName : '',
    phase: updateUserValue ? updateUserValue.phase : 0,
    eventDate: updateUserValue ? dateTimeFormat(updateUserValue.eventDate) : '',
    eventType: updateUserValue ? updateUserValue.eventType : '',
    conductedBy: updateUserValue ? updateUserValue.conductedBy : '',
    speaker: updateUserValue ? updateUserValue.speaker : '',
  });

  const [errors, setErrors] = useState({
    eventNameError: '',
    phaseError: '',
    eventDateError: '',
    eventTypeError: '',
    conductedByError: '',
    speakerError: '',
    isError: false,
  });

  function checkError() {
    let noofErrors = 0;
    let err = { ...errors };

    if (values.eventType !== 'crew') {
      if (values.eventName === '') {
        err.eventNameError = 'This field is required';
        noofErrors++;
      }
      if (values.phase === 0) {
        err.phaseError = 'This field is required';
        noofErrors++;
      }
      if (values.eventDate === '') {
        err.eventDateError = 'This field is required';
        noofErrors++;
      }
      if (values.eventType === '') {
        err.eventTypeError = 'This field is required';
        noofErrors++;
      }

      if (values.conductedBy === '' || values.conductedBy === null) {
        err.conductedByError = 'This field is required';
        noofErrors++;
      } else {
        err.conductedByError = '';
        if (values.conductedBy === 'individual') {
          if (values.speaker === '' || values.speaker === null) {
            err.speakerError = 'This field is required';
            noofErrors++;
          } else {
            err.speakerError = '';
          }
        }
      }
    } else {
      err.conductedByError = '';
      err.speakerError = '';
      if (values.eventName === '') {
        err.eventNameError = 'This field is required';
        noofErrors++;
      }
      if (values.phase === 0) {
        err.phaseError = 'This field is required';
        noofErrors++;
      }
      if (values.eventDate === '') {
        err.eventDateError = 'This field is required';
        noofErrors++;
      }
    }

    if (noofErrors === 0) {
      return true;
    } else {
      err.isError = true;
      console.log(err);
      setErrors(err);
      return false;
    }
  }

  function handleSubmit() {
    if (checkError()) {
      setOpenModal(false);
      setLoading(true);
      dispatch(actions.addEvent(values));
    }
  }

  function handleUpdate() {
    if (checkError()) {
      setOpenModal(false);
      setLoading(true);
      dispatch(actions.updateEvent(values));
    }
  }

  return (
    <>
      <div className="d-md-flex">
        <div className="me-3">
          <TextField
            value={values.eventName}
            error={
              errors.isError && (values.eventName.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.eventNameError !== '' ? errors.eventNameError : '')
            }
            id="outlined-basic"
            className="mb-3"
            label="Event Name"
            variant="outlined"
            onChange={e => setValues({ ...values, eventName: e.target.value })}
          />
          <br />
          <TextField
            type="number"
            value={values.phase}
            error={
              errors.isError &&
              (values.phase === null || values.phase === 0 ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.phaseError !== '' ? errors.phaseError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Phase"
            variant="outlined"
            onChange={e =>
              setValues({ ...values, phase: parseInt(e.target.value) })
            }
          />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.eventType}
              label="Event Type"
              onChange={e =>
                setValues({ ...values, eventType: e.target.value })
              }
            >
              <MenuItem value={'crew'}>Crew</MenuItem>
              <MenuItem value={'learnzeit'}>Learnzeit</MenuItem>
              <MenuItem value={'external'}>External</MenuItem>
            </Select>
          </FormControl>
          <br />
        </div>
        <div className="ms-md-3">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Event Date"
                value={values.eventDate}
                ampm={false}
                onChange={newValue => {
                  setValues({ ...values, eventDate: newValue });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={
                      errors.isError &&
                      (values.eventDate === null ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.eventDateError !== ''
                        ? errors.eventDateError
                        : '')
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
            <FormControl
              sx={{ m: 1, minWidth: 180 }}
              error={errors.isError && values.conductedBy === '' ? true : false}
            >
              <InputLabel htmlFor="grouped-native-select">
                Conducted By
              </InputLabel>
              <Select
                native
                id="grouped-native-select"
                label="Conducted By"
                value={values.conductedBy}
                disabled={
                  values.eventType === 'external' ||
                  values.eventType === 'learnzeit'
                    ? false
                    : true
                }
                onChange={e =>
                  setValues({ ...values, conductedBy: e.target.value })
                }
              >
                <option aria-label="None" value="" />
                <optgroup label="Projects">
                  {projects &&
                    projects.map((project, key) => (
                      <option key={`${project}-${key}`} value={project}>
                        {project}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Committee">
                  {committee &&
                    committee.map((com, key) => (
                      <option key={`${com}-${key}`} value={com}>
                        {com}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Individual">
                  <option value={'individual'}>Individual</option>
                </optgroup>
              </Select>
              <FormHelperText>
                {errors.isError &&
                  (errors.conductedByError !== ''
                    ? errors.conductedByError
                    : '')}
              </FormHelperText>
            </FormControl>
            <br />
            <TextField
              value={values.speaker}
              error={
                errors.isError &&
                (values.conductedBy === 'individual' &&
                (values.speaker === null || values.speaker === '')
                  ? true
                  : false)
              }
              helperText={
                errors.isError &&
                (errors.speakerError !== '' ? errors.speakerError : '')
              }
              id="outlined-basic"
              className="mb-3"
              label="Speaker"
              variant="outlined"
              disabled={values.conductedBy === 'individual' ? false : true}
              onChange={e => setValues({ ...values, speaker: e.target.value })}
            />
            <br />
          </div>
          <div className="d-flex mt-4">
            {updateUserValue ? (
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
