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
import { useUserManagementSlice } from './slice';
import { selectUserManagement } from './slice/selectors';

type MemberData = {
  id?: number;
  name: string;
  email: string;
  rank: string;
  role: string;
  project: string;
  committee: string;
  date: Date | null;
};

export default function MemberForm({ setOpenModal, updateUser }) {
  const { actions } = useUserManagementSlice();
  const dispatch = useDispatch();
  const user = useSelector(selectUserManagement);

  let updateUserValue = user.find(u => u.id === updateUser);

  const [values, setValues] = useState<MemberData>({
    id: updateUserValue ? updateUserValue.id : 0,
    name: updateUserValue ? updateUserValue.name : '',
    email: updateUserValue ? updateUserValue.email : '',
    role: updateUserValue ? updateUserValue.role : '',
    rank: updateUserValue ? updateUserValue.rank : '',
    project: updateUserValue ? updateUserValue.project : '',
    committee: updateUserValue ? updateUserValue.committee : '',
    date: updateUserValue ? updateUserValue.date : null,
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

  const handleProjectsChange = (event: SelectChangeEvent) => {
    setValues({ ...values, project: event.target.value });
  };
  const handleCommitteeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({
      ...values,
      committee: (event.target as HTMLInputElement).value,
    });
  };

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
      dispatch(actions.addUser(values));
      setOpenModal(false);
    }
  }

  function handleUpdate() {
    if (checkError()) {
      dispatch(actions.updateUser(values));
      setOpenModal(false);
    }
  }

  const projectsList = ['Project Cortex', 'Project Pager', 'Project Opencloud'];
  const committeeList = ['HR', 'BD', 'I&M', 'EV'];

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
            label="Full Name"
            variant="outlined"
            onChange={e => setValues({ ...values, name: e.target.value })}
          />
          <br />
          <TextField
            value={values.email}
            error={
              errors.isError && (values.email.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.emailError !== '' ? errors.emailError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={e => setValues({ ...values, email: e.target.value })}
          />
          <br />
          <TextField
            value={values.role}
            error={errors.isError && (values.role.trim() === '' ? true : false)}
            helperText={
              errors.isError &&
              (errors.roleError !== '' ? errors.roleError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Role"
            variant="outlined"
            onChange={e => setValues({ ...values, role: e.target.value })}
          />
          <br />
          <TextField
            value={values.rank}
            error={errors.isError && (values.rank.trim() === '' ? true : false)}
            helperText={
              errors.isError &&
              (errors.rankError !== '' ? errors.rankError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Rank"
            variant="outlined"
            onChange={e => setValues({ ...values, rank: e.target.value })}
          />
          <br />
        </div>
        <div className="ms-md-3">
          <div className="mb-2">
            <FormControl
              error={errors.isError && (values.committee === '' ? true : false)}
              component="fieldset"
            >
              <FormLabel component="legend">Committee</FormLabel>
              <RadioGroup
                row
                aria-label="committee"
                name="row-radio-buttons-group"
                value={values.committee}
                onChange={handleCommitteeChange}
              >
                {committeeList.map((com, index) => (
                  <FormControlLabel
                    key={index}
                    value={com}
                    control={<Radio />}
                    label={com}
                  />
                ))}
              </RadioGroup>
              <FormHelperText>
                {errors.isError &&
                  (errors.committeeError !== '' ? errors.committeeError : '')}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="my-3">
            <FormControl
              error={errors.isError && (values.project === '' ? true : false)}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.project}
                label="Project"
                onChange={handleProjectsChange}
              >
                {projectsList.map((proj, index) => (
                  <MenuItem key={index} value={proj}>
                    {proj}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.isError &&
                  (errors.projectError !== '' ? errors.projectError : '')}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="my-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={values.date}
                onChange={newValue => {
                  setValues({ ...values, date: newValue });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={
                      errors.isError && (values.date === null ? true : false)
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
                  name: '',
                  email: '',
                  role: '',
                  rank: '',
                  project: '',
                  committee: '',
                  date: null,
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
