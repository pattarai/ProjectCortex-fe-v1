import * as React from 'react';
import { useState } from 'react';
import {
  TextField,
  Radio,
  RadioGroup,
  FormGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { dateFormat } from '../../components/dateFormat';

import { useDispatch, useSelector } from 'react-redux';
import { useUserManagementSlice } from './slice';
import { selectUserManagement } from './slice/selectors';

export default function MemberForm({ setOpenModal, updateUser, setLoading }) {
  const { actions } = useUserManagementSlice();
  const dispatch = useDispatch();
  const { users } = useSelector(selectUserManagement);

  const updateUserValue = updateUser
    ? users.find(u => u.userId === updateUser)
    : null;

  const [values, setValues] = useState({
    userId: updateUserValue ? updateUserValue.userId : 0,
    firstName: updateUserValue ? updateUserValue.firstName : '',
    lastName: updateUserValue ? updateUserValue.lastName : '',
    email: updateUserValue ? updateUserValue.email : '',
    // role: updateUserValue ? updateUserValue.role : '',
    // rank: updateUserValue ? updateUserValue.rank : '',
    project: updateUserValue ? updateUserValue.project : '',
    committee: updateUserValue ? updateUserValue.committee : '',
    isActive: updateUserValue ? updateUserValue.isActive : true,
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

  function handleSubmit() {
    if (checkError()) {
      setOpenModal(false);
      setLoading(true);
      dispatch(actions.addUser(values));
    }
  }

  function handleUpdate() {
    if (checkError()) {
      setOpenModal(false);
      if (JSON.stringify(values) !== JSON.stringify(updateUserValue)) {
        setLoading(true);
        dispatch(actions.updateUser(values));
      }
    }
  }

  const projectsList = ['Cortex', 'Pager', 'Opencloud'];
  const committeeList = ['HR', 'BD', 'I&M', 'EV'];

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
          {/* <TextField
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
            inputProps={{ maxLength: 30 }}
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
                name="row-radio-buttons-group"
                value={values.committee}
                onChange={handleCommitteeChange}
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.project}
                label="Project"
                onChange={handleProjectsChange}
              >
                {projectsList.map((proj, index) => (
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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isActive}
                  onChange={() =>
                    setValues({ ...values, isActive: !values.isActive })
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Active User"
            />
          </FormGroup>
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
