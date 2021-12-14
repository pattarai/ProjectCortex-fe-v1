import * as React from 'react';
import { useState } from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';

type MemberData = {
  id?: number;
  name: string;
  phase: number | null;
  dateTime: string | null;
};

export default function MemberForm({ setOpenModal, updateUser }) {
  const { actions } = useEventsSlice();
  const dispatch = useDispatch();
  const user = useSelector(selectEvents);

  let updateUserValue = user.find(u => u.id === updateUser);
  console.log(updateUserValue);

  const [values, setValues] = useState<MemberData>({
    id: updateUserValue ? updateUserValue.id : 0,
    name: updateUserValue ? updateUserValue.name : '',
    phase: updateUserValue ? updateUserValue.phase : null,
    dateTime: updateUserValue ? updateUserValue.dateTime : '',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    roleError: '',
    rankError: '',
    projectError: '',
    committeeError: '',
    dateError: '',
    isError: false,
  });

  // const handleProjectsChange = (event: SelectChangeEvent) => {
  //   setValues({ ...values, project: event.target.value });
  // };
  // const handleCommitteeChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setValues({
  //     ...values,
  //     committee: (event.target as HTMLInputElement).value,
  //   });
  // };

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
      dispatch(actions.addEvent(values));
      setOpenModal(false);
    }
  }

  function handleUpdate() {
    if (checkError()) {
      dispatch(actions.updateEvent(values));
      setOpenModal(false);
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
              (errors.emailError !== '' ? errors.emailError : '')
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
            value={values.dateTime}
            error={errors.isError && (values.dateTime === '' ? true : false)}
            helperText={
              errors.isError &&
              (errors.roleError !== '' ? errors.roleError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Role"
            variant="outlined"
            onChange={e => setValues({ ...values, dateTime: e.target.value })}
          />
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
            {updateUserValue ? (
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
