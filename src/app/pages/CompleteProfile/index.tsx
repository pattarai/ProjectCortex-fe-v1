/**
 *
 * CompleteProfile
 *
 */
import * as React from 'react';
import TextField from '@mui/material/TextField';
// import { createTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  // TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import { useRef } from 'react';
import Img from './Circle_logo_White.svg';
import { dateFormat } from '../../components/dateFormat';
import { styled } from '@mui/material/styles';
import { BsCamera } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { axiosGet, axiosPatch, imgurl } from '../../requests';
import { useState, useEffect } from 'react';

const ariaLabel = { 'aria-label': 'description' };

interface Props {}

export function CompleteProfile({ updateUser }) {
  const [userData, setUserData] = useState<any | null>(null);
  async function completeProfileGet() {
    const res = await axiosGet('/users/complete-profile');
    const user = res.data.user;
    console.log(res.data.user);
    setUserData(user);
    console.log('hello');
  }
  // async function completeProfilePatch() {
  //   const data = { value };
  //   const res = await axiosPatch('/users/complete-profile', data);
  //   console.log(res);
  //   console.log(data);
  // }
  async function handleUpdateOrSubmit() {
    setUserData({ ...updateUser, ...values });
    console.log({ ...updateUser, ...values });
    await axiosPatch('/users/complete-profile', values);
  }

  useEffect(() => {
    completeProfileGet();
    // completeProfilePatch();
  }, []);

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const [dept, setDept] = React.useState('');
  const [year, setYear] = React.useState('');
  const [values, setValues] = useState({
    dateOfBirth: new Date('2014-08-18T21:11:54'),
    collegeName: '',
    department: dept,
    year: year,
    rollNumber: '',
    registerNumber: '',
    whatsappNumber: '',
    instagramUrl: '',
    githubUrl: '',
    linkedInUrl: '',
    description: '',
  });

  const handleThis = (event: SelectChangeEvent) => {
    setDept(event.target.value as string);
    setYear(event.target.value as string);
  };

  const [fileSelected, setFileSelected] = React.useState('');

  const handleImageChange = function (event: any) {
    setFileSelected(URL.createObjectURL(event.target.files[0]));
  };

  const Input = styled('input')({
    display: 'none',
  });

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
                    <div className="d-flex align-items-center justify-content-center mt-2 p-2">
                      <div className="justify-content-center p-2">
                        <Avatar
                          alt="Avatar"
                          src={
                            fileSelected
                              ? fileSelected
                              : `${imgurl}/images/${userData.userId}`
                          }
                          sx={{ width: 85, height: 85 }}
                        />
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={e => handleImageChange(e)}
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
                    </div>
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
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.firstName}
                          />
                          <TextField
                            disabled
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
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
                            sx={{ width: '34.5ch' }}
                            defaultValue={userData.email}
                          />
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label="Role"
                            variant="outlined"
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
                              inputFormat="MM/dd/yyyy"
                              value={value}
                              onChange={handleChange}
                              // onChange={newValue => {
                              //   const newDate = dateFormat(newValue);
                              //   setValues({ ...values, dateOfBirth: newDate });
                              // }}
                              renderInput={params => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          <TextField
                            id="outlined-basic"
                            label="College Name*"
                            variant="outlined"
                            sx={{ width: '34ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                collegeName: e.target.value,
                              })
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
                              value={dept}
                              label="Dept"
                              sx={{ width: '28.7ch' }}
                              onChange={handleThis}
                              // onChange={e =>
                              //   setValues({
                              //     ...values,
                              //     department: e.target.value,
                              //   })
                              // }
                            >
                              <MenuItem value={10}>ECE</MenuItem>
                              <MenuItem value={20}>EEE</MenuItem>
                              <MenuItem value={30}>MECH A</MenuItem>
                              <MenuItem value={30}>MECH B</MenuItem>
                              <MenuItem value={30}>CSC</MenuItem>
                              <MenuItem value={30}>IT</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Year
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={year}
                              label="Year"
                              sx={{ width: '28.7ch' }}
                              // onChange={handleThis}
                              onChange={e => handleThis(e)}
                            >
                              <MenuItem value="1">1</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            id="outlined-basic"
                            label="Roll Number*"
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                rollNumber: e.target.value,
                              })
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="Register Number*"
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                registerNumber: e.target.value,
                              })
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
                          />
                          <TextField
                            id="outlined-basic"
                            label="Linkedin Link*"
                            variant="outlined"
                            onChange={e =>
                              setValues({
                                ...values,
                                linkedInUrl: e.target.value,
                              })
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="Github Link*"
                            variant="outlined"
                            onChange={e =>
                              setValues({
                                ...values,
                                githubUrl: e.target.value,
                              })
                            }
                          />
                        </Box>
                      </div>
                      <div className="d-flex justify-content-center p-2">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <TextField
                            id="outlined-basic"
                            label="Description*"
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                description: e.target.value,
                              })
                            }
                          />
                          <TextField
                            id="outlined-basic"
                            label="WhatsApp Number*"
                            variant="outlined"
                            sx={{ width: '34.5ch' }}
                            onChange={e =>
                              setValues({
                                ...values,
                                whatsappNumber: e.target.value,
                              })
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
                              defaultValue={userData.project}
                              label="Dept"
                              sx={{ width: '28.7ch' }}
                              onChange={handleThis}
                            >
                              <MenuItem value={10}>Pager</MenuItem>
                              <MenuItem value={20}>Cortex</MenuItem>
                              <MenuItem value={30}>Helix</MenuItem>
                              <MenuItem value={30}>Open Cloud</MenuItem>
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
                              defaultValue={userData.committee}
                              label="Dept"
                              sx={{ width: '28.7ch' }}
                              onChange={handleThis}
                            >
                              <MenuItem value={10}>Events</MenuItem>
                              <MenuItem value={20}>
                                Innovation and Media
                              </MenuItem>
                              <MenuItem value={20}>Human Resource</MenuItem>
                              <MenuItem value={20}>
                                Business Development
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                      {/* <Avatar
                  alt="uploaded"
                  src={fileSelected ? fileSelected : undefined}
                  sx={{ width: 75, height: 75 }}
                /> */}
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={e => handleImageChange(e)}
                        />
                        <Button
                          className="mt-3"
                          variant="contained"
                          component="span"
                        >
                          Upload your bitmoji here
                          <BsCamera className="mx-2"></BsCamera>
                        </Button>
                      </label>
                    </div>
                    <div className="text-start">
                      <Button
                        type="button"
                        variant="contained"
                        size="medium"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        onClick={handleUpdateOrSubmit}
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
