/**
 *
 * ProfileCommonView
 *
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
  TextField,
} from '@mui/material';
import { BiSearch as SearchIcon } from 'react-icons/bi';
import { Box } from '@mui/system';
import { axiosGet } from '../../requests';
import { Loader } from '../../components/Loader';

interface Props {}

export function ProfileCommonView(props: Props) {
  const [userData, setUserData] = useState<any | null>(null);
  const [filteredUser, setFilteredUsers] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getCommonView() {
    const res = await axiosGet('/users/common-view');
    const users = res.data.users;
    setUserData(users);
    setFilteredUsers(users);
    setLoading(false);
  }
  useEffect(() => {
    getCommonView();
  }, []);

  function handleChange(searchedVal: string | null) {
    if (searchedVal === '' || searchedVal === null) {
      setFilteredUsers(userData);
    } else {
      const users = userData?.filter(
        user =>
          user.firstName.toLowerCase().includes(searchedVal.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchedVal.toLowerCase()),
      );
      users && setFilteredUsers(users);
    }
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="container my-3">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon />
          <TextField
            id="input-with-sx"
            label="Search Name"
            variant="standard"
            onChange={e => handleChange(e.target.value)}
          />
        </Box>
      </div>
      <section className="vh-100">
        <div className="container my-4">
          <div className="row">
            {filteredUser &&
              filteredUser.map((data, index) => (
                <div className="col-12 col-md-4 mb-4" key={`${data}-${index}`}>
                  <Card
                    elevation={2}
                    sx={{
                      textAlign: 'center',
                      boxShadow:
                        'rgba(0, 0, 255, 0.5) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px',
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Avatar
                          alt={data.firstName}
                          // src={`${imgurl}/images/${data.userId}.jpg`}
                          sx={{
                            width: 70,
                            height: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            marginBottom: '5%',
                          }}
                        />
                        <Typography component="h2" variant="h5">
                          {data.firstName} {data.lastName}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary">
                          {data.description}
                        </Typography> */}
                        <Typography variant="subtitle1" color="text.secondary">
                          {data.project}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {data.committee}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
