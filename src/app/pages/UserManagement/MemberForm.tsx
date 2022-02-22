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
import { dateFormat, randomString } from '../../components/dateFormat';

import { useDispatch, useSelector } from 'react-redux';
import { useUserManagementSlice } from './slice';
import { selectUserManagement } from './slice/selectors';

export default function MemberForm({ setOpenModal, updateUser, setLoading }) {
  const { actions } = useUserManagementSlice();
  const dispatch = useDispatch();
  const { users, projectList, committeeList, roleList } =
    useSelector(selectUserManagement);

  const updateUserValue = updateUser
    ? users.find(u => u.userId === updateUser)
    : null;

  function findRole(val: any) {
    if (val.roles) {
      return val.roles.role;
    } else {
      return val.role;
    }
  }

  const [values, setValues] = useState({
    userId: updateUserValue ? updateUserValue.userId : 0,
    firstName: updateUserValue ? updateUserValue.firstName : '',
    lastName: updateUserValue ? updateUserValue.lastName : '',
    email: updateUserValue ? updateUserValue.email : '',
    password: updateUserValue ? 'abc' : randomString(),
    role: updateUserValue ? findRole(updateUserValue) : 'Crew',
    // rank: updateUserValue ? updateUserValue.rank : '',
    project: updateUserValue ? updateUserValue.project : '',
    committee: updateUserValue ? updateUserValue.committee : '',
    status: updateUserValue ? updateUserValue.status : 1,
    startDate: updateUserValue ? dateFormat(updateUserValue.startDate) : null,
  });

  const [errors, setErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    roleError: '',
    rankError: '',
    projectError: '',
    committeeError: '',
    startDateError: '',
    isError: false,
  });

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'project') {
      setValues({ ...values, project: event.target.value });
    } else if (event.target.name === 'committee') {
      setValues({ ...values, committee: event.target.value });
    } else if (event.target.name === 'role') {
      setValues({ ...values, role: event.target.value });
    } else if (event.target.name === 'status') {
      setValues({ ...values, status: parseInt(event.target.value) });
    }
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
      } else if (
        key === 'email' &&
        typeof value === 'string' &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        err[`${key}Error`] = 'Invalid email address';
        noofErrors++;
      } else {
        err[`${key}Error`] = '';
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

  function handleUpdateOrSubmit() {
    console.log(values);
    if (checkError()) {
      console.log('submit');
      setOpenModal(false);
      if (JSON.stringify(values) !== JSON.stringify(updateUserValue)) {
        setLoading(true);
        if (updateUser) {
          dispatch(actions.updateUser(values));
        } else {
          dispatch(actions.addUser(values));
        }
      }
    }
  }

  return (
    <>
      <div className="d-md-flex mt-2">
        <div className="me-3">
          <TextField
            value={values.firstName}
            error={
              errors.isError && (values.firstName.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.firstNameError !== '' ? errors.firstNameError : '')
            }
            id="outlined-basic"
            className="mb-3"
            label="First Name"
            variant="outlined"
            inputProps={{ maxLength: 15 }}
            onChange={e => setValues({ ...values, firstName: e.target.value })}
          />
          <br />
          <TextField
            value={values.lastName}
            error={
              errors.isError && (values.lastName.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.lastNameError !== '' ? errors.lastNameError : '')
            }
            className="mb-3"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            inputProps={{ maxLength: 15 }}
            onChange={e => setValues({ ...values, lastName: e.target.value })}
          />
          <br />
          <TextField
            value={values.email}
            error={
              errors.isError &&
              (values.email.trim() === '' || errors.emailError !== ''
                ? true
                : false)
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
          <FormControl
            error={errors.isError && (values.role === '' ? true : false)}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">Roles</InputLabel>
            <Select
              name="role"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.role}
              label="Roles"
              onChange={handleChange}
            >
              {roleList.map((rol, index) => (
                <MenuItem key={`${rol}-${index}`} value={rol}>
                  {rol}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.isError &&
                (errors.roleError !== '' ? errors.roleError : '')}
            </FormHelperText>
          </FormControl>
          <br />
          {/* <TextField
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
          <br /> */}
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
                name="committee"
                value={values.committee}
                onChange={handleChange}
              >
                {committeeList.map((com, index) => (
                  <FormControlLabel
                    key={`${com}-${index}`}
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
                name="project"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.project}
                label="Project"
                onChange={handleChange}
              >
                {projectList.map((proj, index) => (
                  <MenuItem key={`${proj}-${index}`} value={proj}>
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
                value={values.startDate}
                onChange={newValue => {
                  const newDate = dateFormat(newValue);
                  setValues({ ...values, startDate: newDate });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={
                      errors.isError &&
                      (values.startDate === null ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.startDateError !== ''
                        ? errors.startDateError
                        : '')
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              name="status"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.status.toString()}
              label="Project"
              onChange={handleChange}
            >
              <MenuItem value={0}>Not a Member</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>On Break</MenuItem>
              <MenuItem value={3}>Alumni</MenuItem>
            </Select>
          </FormControl>
          <div className="d-flex mt-4">
            <Button variant="contained" onClick={handleUpdateOrSubmit}>
              {updateUser ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
