/**
 *
 * Profileview
 *
 */
import * as React from 'react';
import Img from '../DashboardLayout/subhiksha1.jpg';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
} from '@mui/material';
import Popup from '../../components/Popup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import linkedinIcon from '../../components/logos/linkedin.png';
import githubIcon from '../../components/logos/github.png';
import instagramIcon from '../../components/logos/instagram.png';
import gmailIcon from '../../components/logos/gmail.png';
import { axiosGet, imgurl } from '../../requests';
import EditForm from './EditForm';

interface Props {}

export function Profileview(props: Props) {
  const [userData, setUserData] = useState<any | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<any | null>(null);

  async function getProfile() {
    const res = await axiosGet('/users/profile');
    const users = res.data.users;
    console.log(users);
    setUserData(users);
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="white-box d-flex bg-body flex-column mr-3 p-3 rounded-4">
        <Card
          elevation={2}
          sx={{
            textAlign: 'left',
            boxShadow:
              'rgba(0, 0, 255, 0.5) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px',
          }}
        >
          <CardActionArea>
            <CardContent>
              <div className="">
                <Box
                  component="h1"
                  sx={{ letterSpacing: 15, m: 4, color: '#002984' }}
                >
                  PATTARAI
                </Box>
              </div>
              <section
                id="profile"
                className="d-md-flex w-100 align-items-center justfiy-content-between"
              >
                {userData && (
                  <div className="px-4 w-100 align-items-center justfiy-content-between">
                    <CardMedia
                      component="img"
                      src={`${imgurl}/images/${userData.userId}`}
                      sx={{ m: 4, width: 200 }}
                      image={Img}
                      alt="Live from space album cover"
                    />
                    <Typography sx={{ m: 4 }} component="h6" variant="h5">
                      {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography sx={{ m: 4 }} component="h6" variant="h5">
                      {userData.description}
                    </Typography>
                    <Box
                      component="h1"
                      sx={{ letterSpacing: 15, m: 4, color: '#002984' }}
                    >
                      PERSONAL INFORMATION
                    </Box>
                    <Divider variant="middle" />
                    <div className="m-4">
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Date Of Birth:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.dateOfBirth}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        College Name:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.collegeName}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Department:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.department}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Year:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.year}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Roll No:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.rollNumber}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Register No:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.registerNumber}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Phone:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.whatsappNumber}{' '}
                        </span>
                      </Typography>
                    </div>
                    <Box
                      component="h1"
                      sx={{ letterSpacing: 15, m: 4, color: '#002984' }}
                    >
                      STATUS INFORMATION
                    </Box>
                    <Divider variant="middle" />
                    <div className="m-4 align-items-start justfiy-content-start">
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Role:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.office_bearers.officeBearersId}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Committee:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.committee}{' '}
                        </span>
                      </Typography>
                      <Typography
                        style={{ fontWeight: 'bold' }}
                        component="h2"
                        variant="h5"
                      >
                        Project:{' '}
                        <span style={{ fontWeight: 'normal' }}>
                          {' '}
                          {userData.project}{' '}
                        </span>
                      </Typography>
                    </div>
                    <Box
                      component="h1"
                      sx={{ letterSpacing: 15, m: 4, color: '#002984' }}
                    >
                      CONTACT INFORMATION
                    </Box>
                    <Divider variant="middle" />
                    <div className="social-media my-5 mx-1">
                      <a
                        href={userData.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={linkedinIcon}
                          width="50"
                          height="50"
                          alt="Linkedin"
                        />
                      </a>

                      <a href={userData.email} target="_blank" rel="noreferrer">
                        <img
                          src={gmailIcon}
                          width="50"
                          height="50"
                          alt="Gmail"
                        />
                      </a>

                      <a
                        href={userData.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={githubIcon}
                          width="50"
                          height="50"
                          alt="GitHub"
                        />
                      </a>

                      <a
                        href={userData.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={instagramIcon}
                          width="50"
                          height="50"
                          alt="Instagram"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </section>
            </CardContent>
          </CardActionArea>
        </Card>
        <Button
          variant="contained"
          onClick={() => {
            setUpdateUser(userData);
            setLoading(true);
            setOpenPopup(true);
          }}
        >
          Edit
        </Button>
      </div>
      {loading && (
        <Popup
          title={'Update Details'}
          openModal={openPopup}
          setOpenModal={setOpenPopup}
        >
          <EditForm
            setOpenModal={setOpenPopup}
            updateUser={updateUser}
            setLoading={setLoading}
            setUserData={setUserData}
          />
        </Popup>
      )}
    </>
  );
}
