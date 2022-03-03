import * as React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { dateFormat } from '../../components/dateFormat';
import { axiosPatch } from '../../requests';

export default function EditForm({
  setOpenModal,
  updateUser,
  setLoading,
  setUserData,
}) {
  const updateUserValue = updateUser;

  const [values, setValues] = useState({
    userId: updateUserValue ? updateUserValue.userId : 0,
    firstName: updateUserValue ? updateUserValue.firstName : '',
    lastName: updateUserValue ? updateUserValue.lastName : '',
    email: updateUserValue ? updateUserValue.email : '',
    year: updateUserValue ? updateUserValue.year : '',
    rollNumber: updateUserValue ? updateUserValue.rollNumber : '',
    registerNumber: updateUserValue ? updateUserValue.registerNumber : '',
    whatsappNumber: updateUserValue ? updateUserValue.whatsappNumber : '',
    instagramUrl: updateUserValue ? updateUserValue.instagramUrl : '',
    githubUrl: updateUserValue ? updateUserValue.githubUrl : '',
    linkedInUrl: updateUserValue ? updateUserValue.linkedInUrl : '',
    description: updateUserValue ? updateUserValue.description : '',
    dateOfBirth: updateUserValue
      ? dateFormat(updateUserValue.dateOfBirth)
      : null,
  });

  const [errors, setErrors] = useState({
    yearError: '',
    rollNumberError: '',
    registerNumberError: '',
    whatsappNumberError: '',
    instagramUrlError: '',
    githubUrlError: '',
    linkedInUrlError: '',
    descriptionError: '',
    dateOfBirthError: '',
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

  async function handleUpdateOrSubmit() {
    if (checkError()) {
      setUserData({ ...updateUser, ...values });
      console.log({ ...updateUser, ...values });
      await axiosPatch('/users/profile', values);
      setOpenModal(false);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="d-md-flex mt-2">
        <div className="me-md-3">
          <TextField
            value={values.firstName}
            id="outlined-basic"
            className="mb-3"
            label="First Name"
            variant="outlined"
            inputProps={{ maxLength: 15 }}
            disabled={true}
          />
          <br />
          <TextField
            value={values.lastName}
            className="mb-3"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            inputProps={{ maxLength: 15 }}
            disabled={true}
          />
          <br />
          <TextField
            value={values.email}
            className="mb-3"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            disabled={true}
          />
          <br />
          <TextField
            value={String(values.year)}
            id="outlined-basic"
            className="mb-3"
            error={
              errors.isError &&
              (String(values.year).trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.yearError !== '' ? errors.yearError : '')
            }
            label="Year"
            variant="outlined"
            required={true}
            onChange={e => setValues({ ...values, year: e.target.value })}
          />
        </div>
        <div className="mx-md-3">
          <TextField
            value={values.rollNumber}
            id="outlined-basic"
            className="mb-3"
            error={
              errors.isError && (values.rollNumber.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.rollNumberError !== '' ? errors.rollNumberError : '')
            }
            label="Roll Number"
            variant="outlined"
            required={true}
            onChange={e => setValues({ ...values, rollNumber: e.target.value })}
          />
          <br />
          <TextField
            value={values.registerNumber}
            id="outlined-basic"
            className="mb-3"
            error={
              errors.isError &&
              (values.registerNumber.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.registerNumberError !== ''
                ? errors.registerNumberError
                : '')
            }
            label="Register Number"
            variant="outlined"
            required={true}
            onChange={e =>
              setValues({ ...values, registerNumber: e.target.value })
            }
          />
          <br />
          <TextField
            value={values.whatsappNumber}
            id="outlined-basic"
            className="mb-3"
            error={
              errors.isError &&
              (values.whatsappNumber.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.whatsappNumberError !== ''
                ? errors.whatsappNumberError
                : '')
            }
            label="Whatsapp Number"
            variant="outlined"
            required={true}
            onChange={e =>
              setValues({ ...values, whatsappNumber: e.target.value })
            }
          />
          <br />
          <TextField
            value={values.instagramUrl}
            id="outlined-basic"
            className="mb-3"
            error={
              errors.isError &&
              (values.instagramUrl.trim() === '' ? true : false)
            }
            helperText={
              errors.isError &&
              (errors.instagramUrlError !== '' ? errors.instagramUrlError : '')
            }
            label="Instagram URL"
            variant="outlined"
            required={true}
            onChange={e =>
              setValues({ ...values, instagramUrl: e.target.value })
            }
          />
        </div>
        <div className="ms-md-3">
          <div className="">
            <TextField
              value={values.linkedInUrl}
              id="outlined-basic"
              className="mb-3"
              error={
                errors.isError &&
                (values.linkedInUrl.trim() === '' ? true : false)
              }
              helperText={
                errors.isError &&
                (errors.linkedInUrlError !== '' ? errors.linkedInUrlError : '')
              }
              label="LinkedIn URL"
              variant="outlined"
              required={true}
              onChange={e =>
                setValues({ ...values, linkedInUrl: e.target.value })
              }
            />
            <br />
            <TextField
              value={values.description}
              id="outlined-basic"
              className="mb-3"
              error={
                errors.isError &&
                (values.description.trim() === '' ? true : false)
              }
              helperText={
                errors.isError &&
                (errors.descriptionError !== '' ? errors.descriptionError : '')
              }
              label="Description"
              multiline={true}
              variant="outlined"
              required={true}
              onChange={e =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <br />
            <TextField
              value={values.githubUrl}
              id="outlined-basic"
              className="mb-3"
              error={
                errors.isError &&
                (values.githubUrl.trim() === '' ? true : false)
              }
              helperText={
                errors.isError &&
                (errors.githubUrlError !== '' ? errors.githubUrlError : '')
              }
              label="Github URL"
              variant="outlined"
              required={true}
              onChange={e =>
                setValues({ ...values, githubUrl: e.target.value })
              }
            />
            {/* <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth}
                onChange={newValue => {
                  const newDate = dateFormat(newValue);
                  setValues({ ...values, dateOfBirth: newDate });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={
                      errors.isError &&
                      (values.dateOfBirth === null ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.dateOfBirthError !== ''
                        ? errors.dateOfBirthError
                        : '')
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider> */}
          </div>
          <div className="d-flex mt-4">
            <Button variant="contained" onClick={handleUpdateOrSubmit}>
              Update User
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
