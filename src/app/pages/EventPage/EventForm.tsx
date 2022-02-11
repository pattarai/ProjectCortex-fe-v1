import * as React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';
import { Events } from './slice/types';

export default function MemberForm({ setOpenModal, updateUser, setLoading }) {
  const { actions } = useEventsSlice();
  const dispatch = useDispatch();
  const { events } = useSelector(selectEvents);

  let updateUserValue = updateUser
    ? events.find(u => u.eventId === updateUser)
    : null;

  const [values, setValues] = useState<Events>({
    eventId: updateUserValue ? updateUserValue.eventId : 0,
    eventName: updateUserValue ? updateUserValue.eventName : '',
    phase: updateUserValue ? updateUserValue.phase : 0,
    eventDate: updateUserValue ? updateUserValue.eventDate : '',
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

    Object.entries(values).forEach(([key, value]) => {
      if (
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        err[`${key}Error`] = 'This field is required';
        noofErrors++;
      }
    });

    if (noofErrors === 0) {
      return true;
    } else {
      err.isError = true;
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
            error={errors.isError && (values.phase === null ? true : false)}
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
          <TextField
            value={values.eventType}
            error={errors.isError && (values.eventType === '' ? true : false)}
            helperText={
              errors.isError &&
              (errors.eventTypeError !== '' ? errors.eventTypeError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Event Type"
            variant="outlined"
            onChange={e => setValues({ ...values, eventType: e.target.value })}
          />
          <br />
        </div>
        <div className="ms-md-3">
          <div className="my-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Event Date"
                value={values.eventDate}
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
            <TextField
              value={values.conductedBy}
              error={
                errors.isError &&
                (values.conductedBy.trim() === '' ? true : false)
              }
              helperText={
                errors.isError &&
                (errors.conductedByError !== '' ? errors.conductedByError : '')
              }
              id="outlined-basic"
              className="mb-3"
              label="Event Type"
              variant="outlined"
              onChange={e =>
                setValues({ ...values, conductedBy: e.target.value })
              }
            />
            <br />
            <TextField
              value={values.speaker}
              error={
                errors.isError && (values.speaker.trim() === '' ? true : false)
              }
              helperText={
                errors.isError &&
                (errors.speakerError !== '' ? errors.speakerError : '')
              }
              id="outlined-basic"
              className="mb-3"
              label="Event Type"
              variant="outlined"
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
