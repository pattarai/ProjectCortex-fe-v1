/**
 *
 * Profileview
 *
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Button,
  Avatar,
} from '@mui/material';
import Popup from '../../components/Popup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import linkedinIcon from '../../components/logos/linkedin.png';
import githubIcon from '../../components/logos/github.png';
import instagramIcon from '../../components/logos/instagram.png';
import gmailIcon from '../../components/logos/gmail.png';
import projectIcon from '../../components/logos/Project.png';
import committeeIcon from '../../components/logos/committee.png';
import teamIcon from '../../components/logos/team.png';
import { axiosGet } from '../../requests';
import EditForm from './EditForm';

interface Props {}

export function ProfileView(props: Props) {
  const [userData, setUserData] = useState<any | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<any | null>(null);

  async function getProfile() {
    const res = await axiosGet('/users/profile');
    const users = res.data.users;
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
                  sx={{ letterSpacing: 10, m: 4, color: '#002984' }}
                >
                  Welcome to your Profile
                </Box>
              </div>
              <section
                id="profile"
                className="d-md-flex w-100 align-items-center justfiy-content-between"
              >
                {userData && (
                  <div className="d-flex">
                    <div className="px-4 mx-1 w-100 align-items-center justfiy-content-between">
                      <Avatar
                        alt={userData.firstName}
                        // src={`${imgurl}/images/${userData.userId}.jpg`}
                        sx={{
                          width: 150,
                          height: 150,
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: 'auto',
                          marginBottom: '5%',
                        }}
                      />
                      <Box
                        component="h1"
                        sx={{
                          letterSpacing: 1,
                          m: 4,
                          color: '#002984',
                          fontWeight: 'bold',
                        }}
                      >
                        STATUS INFORMATION
                      </Box>
                      <Divider variant="middle" />
                      <div className="m-4 align-items-start justfiy-content-start">
                        <div className="d-flex my-3">
                          <img
                            src={teamIcon}
                            width="35"
                            height="35"
                            alt="Role"
                            className="mx-3"
                          />
                          <Typography
                            style={{ fontWeight: 'normal' }}
                            component="h2"
                            variant="h5"
                          >
                            {userData.roles}
                          </Typography>
                        </div>
                        <div className="d-flex my-3">
                          <img
                            src={committeeIcon}
                            width="35"
                            height="35"
                            alt="Committee"
                            className="mx-3"
                          />
                          <Typography
                            style={{ fontWeight: 'normal' }}
                            component="h2"
                            variant="h5"
                          >
                            {userData.committee}
                          </Typography>
                        </div>
                        <div className="d-flex my-3">
                          <img
                            src={projectIcon}
                            width="35"
                            height="35"
                            alt="Project"
                            className="mx-3"
                          />
                          <Typography
                            style={{ fontWeight: 'normal' }}
                            component="h2"
                            variant="h5"
                          >
                            {userData.project}
                          </Typography>
                        </div>
                      </div>
                      <Box
                        component="h1"
                        sx={{
                          letterSpacing: 1,
                          m: 4,
                          color: '#002984',
                          fontWeight: 'bold',
                        }}
                      >
                        CONTACT INFORMATION
                      </Box>
                      <Divider variant="middle" />
                      <div className="social-media my-5 mx-2 p-2">
                        <a
                          href={userData.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={linkedinIcon}
                            width="35"
                            height="35"
                            alt="Linkedin"
                          />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href={`mailto:${userData.email}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={gmailIcon}
                            width="35"
                            height="35"
                            alt="Gmail"
                          />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href={userData.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={githubIcon}
                            width="35"
                            height="35"
                            alt="GitHub"
                          />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href={userData.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={instagramIcon}
                            width="35"
                            height="35"
                            alt="Instagram"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="px-5 w-100 align-items-center justfiy-content-between">
                      <div className="m-4">
                        <div className="my-5 mx-4">
                          <Typography
                            component="h1"
                            variant="h5"
                            style={{ fontWeight: 'bold' }}
                          >
                            {userData.firstName} {userData.lastName}
                          </Typography>
                          <div className="my-5">
                            <Typography
                              component="h2"
                              variant="h5"
                              style={{ fontWeight: 'normal' }}
                            >
                              {userData.description}
                            </Typography>
                          </div>
                        </div>
                        <Box
                          component="h1"
                          sx={{
                            letterSpacing: 1,
                            m: 4,
                            color: '#002984',
                            fontWeight: 'bold',
                          }}
                        >
                          PERSONAL INFORMATION
                        </Box>
                        <Divider variant="middle" />
                        <div className="m-4 align-items-start justfiy-content-start">
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
                          <Button
                            sx={{
                              '& > :not(style)': { m: 1 },
                              backgroundColor: '#002984',
                            }}
                            variant="contained"
                            component="span"
                            className="my-5"
                            onClick={() => {
                              setUpdateUser(userData);
                              setLoading(true);
                              setOpenPopup(true);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </CardContent>
          </CardActionArea>
        </Card>
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
