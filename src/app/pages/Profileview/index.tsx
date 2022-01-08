/**
 *
 * Profileview
 *
 */
import * as React from 'react';
// import  Dashboard from './dashboard';
import Img from '../DashboardLayout/subhiksha1.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

interface Props {}
const marks = [
  {
    value: 0,
    label: '1',
  },
  {
    value: 20,
    label: '5',
  },
  {
    value: 40,
    label: '10',
  },
  {
    value: 60,
    label: '20',
  },
  {
    value: 100,
    label: '35',
  },
];

function valuetext(value) {
  return `${value}°C`;
}
export function Profileview(props: Props) {
  const data = [
    {
      dp: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/cf3851a824eee5981be13591f44bbd5f-1592046164/hitoridraws-prettyportrait-color/draw-your-dp-avatar-profile-pic-and-make-it-simple-and-cute.png',
      name: 'Subhiksha',
      project: 'Cortex',
      committee: 'Events',
      description: 'I love  Coding with Veroni',
      position: '02',
      positionst: 'Dr Of Activities',
      expert: 'Software Engineer',
      github: 'https://github.com/Subhiksha18vic/',
      linkedin: 'https://www.linkedin.com/in/elizabeth-subhiksha-victoria-/',
      email: 'subi@gmail.com',
      address: 'XYZ Nagar, Chennai',
      phone: '8889999777',
      rollno: '311119205013',
      year: 'III',
      college: 'LICET',
      department: 'Mech',
      topskills: 'IoT, Desinging',
      passion: 'Dancing',
    },
  ];
  const [userData, setUserData] = useState(data);
  function handleChange(searchedVal: string | null) {
    if (searchedVal === '' || searchedVal === null) {
      setUserData(data);
    } else {
      const filteredUser = data.filter(data =>
        data.name.toLowerCase().includes(searchedVal.toLowerCase()),
      );
      setUserData(filteredUser);
    }
  }
  return (
    <>
      <section id="profile" className="d-md-flex w-100">
        <div>
          <img src={Img} height="500px" width="auto" alt="" />
          <Box
            component="h1"
            sx={{ letterSpacing: 15, m: 1, color: '#8E54E9' }}
          >
            TOP SKILLS
          </Box>
          <Typography sx={{ m: 1 }} component="h6" variant="h5">
            {data.topskills}
          </Typography>
          <Box
            component="h1"
            sx={{ letterSpacing: 15, m: 1, color: '#8E54E9' }}
          >
            PASSION
          </Box>
          <Typography sx={{ m: 1 }} component="h6" variant="h5">
            {data.passion}
          </Typography>
        </div>
        {userData.map((data, index) => (
          <div className="px-4 w-100">
            <Box
              component="h1"
              sx={{ letterSpacing: 15, m: 2, color: '#8E54E9' }}
            >
              {data.name}
            </Box>
            <Typography sx={{ m: 4 }} component="h6" variant="h5">
              {data.expert}
            </Typography>
            <Typography sx={{ m: 4 }} component="h2" variant="h5">
              Position: {data.position}
            </Typography>
            <Divider variant="middle" />
            <Box
              component="h1"
              sx={{ letterSpacing: 7, m: 5, color: '#8E54E9' }}
            >
              RANK
            </Box>
            <Box sx={{ width: 300, m: 4 }}>
              <Slider
                aria-label="Custom marks"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                color="secondary"
              />
            </Box>
            <Box
              component="h1"
              sx={{ letterSpacing: 15, m: 4, color: '#8E54E9' }}
            >
              PERSONAL INFORMATION
            </Box>
            <Divider variant="middle" />
            <div className="m-4">
              <Typography component="h2" variant="h5">
                College:{' '}
                <span style={{ color: '#4776E6' }}> {data.college} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Department:{' '}
                <span style={{ color: '#4776E6' }}> {data.department} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Year: <span style={{ color: '#4776E6' }}> {data.year} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Roll No:{' '}
                <span style={{ color: '#4776E6' }}> {data.rollno} </span>
              </Typography>
            </div>
            <Box
              component="h1"
              sx={{ letterSpacing: 15, m: 4, color: '#8E54E9' }}
            >
              STATUS INFORMATION
            </Box>
            <Divider variant="middle" />
            <div className="m-4">
              <Typography component="h2" variant="h5">
                Position:{' '}
                <span style={{ color: '#4776E6' }}> {data.positionst} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Committee:{' '}
                <span style={{ color: '#4776E6' }}> {data.committee} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Project:{' '}
                <span style={{ color: '#4776E6' }}> {data.project} </span>
              </Typography>
            </div>
            <Box
              component="h1"
              sx={{ letterSpacing: 15, m: 4, color: '#8E54E9' }}
            >
              CONTACT INFORMATION
            </Box>
            <Divider variant="middle" />
            <div className="m-4">
              <Typography component="h2" variant="h5">
                Phone: <span style={{ color: '#4776E6' }}> {data.phone} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Address:{' '}
                <span style={{ color: '#4776E6' }}> {data.address} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Email: <span style={{ color: '#4776E6' }}> {data.email} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                LinkedIN:{' '}
                <span style={{ color: '#4776E6' }}> {data.linkedin} </span>
              </Typography>
              <Typography component="h2" variant="h5">
                Github:{' '}
                <span style={{ color: '#4776E6' }}> {data.github} </span>
              </Typography>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
