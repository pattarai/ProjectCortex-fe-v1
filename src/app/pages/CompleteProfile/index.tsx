/**
 *
 * CompleteProfile
 *
 */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
} from '@mui/material';
import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { BsCamera } from 'react-icons/bs';
import { axiosGet, axiosPatch } from '../../requests';
import { useState, useEffect } from 'react';
import { dateFormat } from '../../components/dateFormat';
import { Loader } from '../../components/Loader';
import { useHistory } from 'react-router-dom';

export function CompleteProfile() {
  const [userData, setUserData] = useState<any | null>(null);
  const formdata = new FormData();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [errors, setErrors] = useState({
    dateOfBirthError: '',
    collegeNameError: '',
    departmentError: '',
    yearError: '',
    rollNumberError: '',
    registerNumberError: '',
    whatsappNumberError: '',
    // instagramUrlError: '',
    githubUrlError: '',
    linkedInUrlError: '',
    descriptionError: '',
    // bitmojiPicError: '',
    // profilePicError: '',
    isError: false,
  });

  async function completeProfileGet() {
    const res = await axiosGet('/users/complete-profile');
    const user = res.data.user;
    setUserData(user);
    setLoading(false);
  }

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
      } else if (
        (key === 'profilePic' || key === 'bitmojiPic') &&
        value === null
      ) {
        err[`${key}Error`] = 'This field is required';
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

  async function completeProfilePatch() {
    setLoading(true);
    try {
      let data = formdata;
      await axiosPatch('/users/complete-profile', data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  const [values, setValues] = useState({
    dateOfBirth: '2000-01-01',
    collegeName: '',
    department: '',
    year: '',
    rollNumber: '',
    registerNumber: '',
    whatsappNumber: '',
    instagramUrl: '',
    githubUrl: '',
    linkedInUrl: '',
    description: '',
  });

  useEffect(() => {
    completeProfileGet();
  }, []);

  // const [profilePic, setProfilePic] = useState<any | null>(null);
  // const [bitmojiPic, setBitmojiPic] = useState<any | null>(null);

  const handleSubmit = () => {
    // formdata.append('profilePic', profilePic);
    // formdata.append('bitmojiPic', bitmojiPic);
    if (checkError()) {
      Object.entries(values).forEach(([key, value]) => {
        formdata.append(key, value);
      });
      completeProfilePatch();
    }
    history.push('/dashboard/profilecv');
  };

  const Input = styled('input')({
    display: 'none',
  });

  if (loading) return <Loader />;

  return (
    <>
      <section className="vh-100">
        <div className="container my-4">
          {userData && (
            <div className="white-box d-flex bg-body flex-column mr-3 p-3 justify-content-between rounded-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <div className="">
                      <Box
                        component="h1"
                        sx={{ letterSpacing: 15, m: 1, color: '#002984' }}
                      >
                        PATTARAI
                      </Box>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Typography component="h2" variant="h5">
                        We'd like to know you better…
                      </Typography>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-center mt-2 p-2">
                      <div className="justify-content-center p-2">
                        <Avatar
                          alt="uploaded"
                          src={profilePic && URL.createObjectURL(profilePic)}
                          sx={{ width: 85, height: 85 }}
                        />
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            required={true}
                            onChange={(e: any) => {
                              setProfilePic(e.target.files[0]);
                            }}
                            className="my-2 p-2"
                          />
                          <Button
                            sx={{ '& > :not(style)': { m: 1 } }}
                            variant="contained"
                            component="span"
                            className="my-2"
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                    </div> */}
                    <div>
                      <div className="d-flex justify-content-center p-2">
                        <Box
                          sx={{
                            '& > :not(style)': { m: 1 },
                            letterSpacing: 15,
                            m: 1,
                          }}
                        >
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label="First Name"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.firstName}
                          />
                          <TextField
                            disabled
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.lastName}
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label="Email"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.email}
                          />
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label="Role"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.roleId}
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box
                          sx={{
                            '& > :not(style)': { m: 1 },
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label="Date Of Birth"
                              value={values.dateOfBirth}
                              onChange={newValue => {
                                const newDate = dateFormat(newValue);
                                setValues({ ...values, dateOfBirth: newDate });
                              }}
                              renderInput={params => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          <TextField
                            id="outlined-basic"
                            label="College Name"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                collegeName: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.collegeName.trim() === '' ? true : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.collegeNameError !== ''
                                ? errors.collegeNameError
                                : '')
                            }
                          />
                        </Box>
                      </div>

                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Dept
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.department}
                              label="Dept"
                              required={true}
                              sx={{ width: '28.7ch' }}
                              onChange={e =>
                                setValues({
                                  ...values,
                                  department: e.target.value as string,
                                })
                              }
                            >
                              <MenuItem value="ECE">ECE</MenuItem>
                              <MenuItem value="EEE">EEE</MenuItem>
                              <MenuItem value="MECH A">MECH A</MenuItem>
                              <MenuItem value="MECH B">MECH B</MenuItem>
                              <MenuItem value="CSE">CSE</MenuItem>
                              <MenuItem value="IT">IT</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Year
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.year}
                              required={true}
                              label="Year"
                              sx={{ width: '28.7ch' }}
                              onChange={e =>
                                setValues({
                                  ...values,
                                  year: e.target.value as string,
                                })
                              }
                            >
                              <MenuItem value="1">1st Year</MenuItem>
                              <MenuItem value="2">2nd Year</MenuItem>
                              <MenuItem value="3">3rd Year</MenuItem>
                              <MenuItem value="4">4th Year</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            id="outlined-basic"
                            label="Roll Number"
                            required={true}
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                rollNumber: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.rollNumber.trim() === '' ? true : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.rollNumberError !== ''
                                ? errors.rollNumberError
                                : '')
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="Register Number"
                            variant="outlined"
                            required={true}
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                registerNumber: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.registerNumber.trim() === ''
                                ? true
                                : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.registerNumberError !== ''
                                ? errors.registerNumberError
                                : '')
                            }
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            id="outlined-basic"
                            label="Instagram Link"
                            variant="outlined"
                            onChange={e =>
                              setValues({
                                ...values,
                                instagramUrl: e.target.value,
                              })
                            }
                            // error={
                            //   errors.isError &&
                            //   (values.instagramUrl.trim() === '' ? true : false)
                            // }
                            // helperText={
                            //   errors.isError &&
                            //   (errors.instagramUrlError !== ''
                            //     ? errors.instagramUrlError
                            //     : '')
                            // }
                          />
                          <TextField
                            id="outlined-basic"
                            label="Linkedin Link"
                            required={true}
                            variant="outlined"
                            onChange={e =>
                              setValues({
                                ...values,
                                linkedInUrl: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.linkedInUrl.trim() === '' ? true : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.linkedInUrlError !== ''
                                ? errors.linkedInUrlError
                                : '')
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="Github Link"
                            required={true}
                            variant="outlined"
                            onChange={e =>
                              setValues({
                                ...values,
                                githubUrl: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.githubUrl.trim() === '' ? true : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.githubUrlError !== ''
                                ? errors.githubUrlError
                                : '')
                            }
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            id="outlined-basic"
                            label="Description"
                            required={true}
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                description: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.description.trim() === '' ? true : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.descriptionError !== ''
                                ? errors.descriptionError
                                : '')
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="WhatsApp Number"
                            required={true}
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                whatsappNumber: e.target.value,
                              })
                            }
                            error={
                              errors.isError &&
                              (values.whatsappNumber.trim() === ''
                                ? true
                                : false)
                            }
                            helperText={
                              errors.isError &&
                              (errors.whatsappNumberError !== ''
                                ? errors.whatsappNumberError
                                : '')
                            }
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Projects
                            </InputLabel>
                            <Select
                              disabled
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              required={true}
                              defaultValue={userData.project}
                              label="Project"
                              sx={{ width: '28.7ch' }}
                            >
                              <MenuItem value="Pager">Pager</MenuItem>
                              <MenuItem value="Cortex">Cortex</MenuItem>
                              <MenuItem value="Helix">Helix</MenuItem>
                              <MenuItem value="Opencloud">Open Cloud</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Committee
                            </InputLabel>
                            <Select
                              disabled
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              required={true}
                              defaultValue={userData.committee}
                              label="Committee"
                              sx={{ width: '28.7ch' }}
                            >
                              <MenuItem value="EV">Events</MenuItem>
                              <MenuItem value="I&M">
                                Innovation and Media
                              </MenuItem>
                              <MenuItem value="HR">Human Resource</MenuItem>
                              <MenuItem value="BD">
                                Business Development
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-center mt-2 p-2">
                      <div className="d-flex justify-content-center p-2">
                        <Avatar
                          alt="uploaded"
                          src={bitmojiPic && URL.createObjectURL(bitmojiPic)}
                          sx={{ width: 75, height: 75 }}
                        />
                        <label htmlFor="contained-button-file-2">
                          <Input
                            accept="image/*"
                            id="contained-button-file-2"
                            type="file"
                            onChange={(e: any) => {
                              setBitmojiPic(e.target.files[0]);
                            }}
                            className="my-2 p-2"
                          />
                          <Button
                            className="mt-3 mx-4 my-3"
                            variant="contained"
                            component="span"
                          >
                            Upload your bitmoji here
                            <BsCamera className="mx-2"></BsCamera>
                          </Button>
                        </label>
                      </div>
                    </div> */}
                    <div className="text-start">
                      <Button
                        type="button"
                        variant="contained"
                        size="medium"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
