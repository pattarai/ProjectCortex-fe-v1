import * as React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';

type EventData = {
  id?: number;
  name: string;
  phase: number | null;
  dateTime: string | null;
};

export default function EventForm({ setOpenModal, updateEvent, setLoading }) {
  const { actions } = useEventsSlice();
  const dispatch = useDispatch();
  const { events } = useSelector(selectEvents);

  let updateEventValue = updateEvent
    ? events.find(u => u.event_id === updateEvent)
    : null;

  console.log(updateEventValue);

  const [values, setValues] = useState<EventData>({
    id: updateEventValue ? updateEventValue.event_id : 0,
    name: updateEventValue ? updateEventValue.event_name : '',
    phase: updateEventValue ? updateEventValue.phase : null,
    dateTime: updateEventValue ? updateEventValue.event_date : '',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    phaseError: '',
    dateError: '',
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
            value={values.name}
            error={errors.isError && (values.name.trim() === '' ? true : false)}
            helperText={
              errors.isError &&
              (errors.nameError !== '' ? errors.nameError : '')
            }
            id="outlined-basic"
            className="mb-3"
            label="Event Name"
            variant="outlined"
            onChange={e => setValues({ ...values, name: e.target.value })}
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

          <br />
        </div>
        <div className="ms-md-3">
          <div className="my-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={values.dateTime}
                onChange={newValue => {
                  setValues({ ...values, dateTime: newValue });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={
                      errors.isError &&
                      (values.dateTime === null ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.dateError !== '' ? errors.dateError : '')
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="d-flex mt-4">
            {updateEventValue ? (
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() =>
                setValues({
                  id: 0,
                  name: '',
                  phase: null,
                  dateTime: '',
                })
              }
              color="secondary"
              className="ms-2"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
