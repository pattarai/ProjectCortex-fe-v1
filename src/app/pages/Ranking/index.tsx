/**
 *
 * Ranking
 *
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Button,
  CardActionArea,
  TextField,
  InputAdornment,
} from '@mui/material';
import AvatarIcon from './images/noAvatar.png';
import Diamond from './images/diamond.png';
import Gold from './images/gold.png';
import Silver from './images/silver.png';
import Bronze from './images/bronze.png';
import Copper from './images/copper.png';
import { FaSearch } from 'react-icons/fa';
import MemberScoreCard from './MemberScoreCard';
import { axiosGet, imgurl } from '../../requests';
import LinearProgress from '@mui/material/LinearProgress';

type Users = {
  firstName: string;
  lastName: string;
};
interface MemberData {
  users: Users;
  rank: string;
  total: number;
  league: string;
  userId: number;
}

export function Ranking() {
  const [openDetails, setOpenDetails] = useState(false);
  const [userData, setUserData] = useState<MemberData[] | null>(null);
  const [userSearchData, setUserSearchData] = useState<MemberData[] | null>(
    null,
  );
  const [top3, setTop3] = useState<MemberData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosGet('/users/ranks').then(res => {
      const user = res.data.data;
      const top3List = user.slice(0, 3);
      const userList = user.slice(3);
      setTop3(top3List);
      setUserData(userList);
      setUserSearchData(userList);
      setLoading(false);
    });
  }, []);

  function handleChange(searchedVal: string | null) {
    if (searchedVal === '' || searchedVal === null) {
      setUserSearchData(userData);
    } else {
      const filteredUser = userData?.filter(row =>
        row.users.firstName.toLowerCase().includes(searchedVal.toLowerCase()),
      );
      console.log(filteredUser, searchedVal);
      filteredUser && setUserSearchData(filteredUser);
    }
  }

  return (
    <>
      <section className="vh-100">
        <div className="d-flex justify-content-end p-4">
          <Button
            sx={{ color: 'grey.900' }}
            onClick={() => {
              setOpenDetails(false);
            }}
          >
            Crew
          </Button>
          <Typography component="h2" variant="h5" sx={{ color: 'grey.900' }}>
            |
          </Typography>
          <Button
            sx={{ color: 'grey.900' }}
            onClick={() => {
              setOpenDetails(true);
            }}
          >
            User Details
          </Button>
        </div>
        {openDetails ? (
          <MemberScoreCard />
        ) : (
          <>
            {loading ? (
              <LinearProgress className="container" />
            ) : (
              <>
                <div className="container my-4">
                  <div className="row">
                    {top3 &&
                      top3.map((list, index) => {
                        return (
                          <div
                            key={`${list}-${index}`}
                            className="col-12 col-md-4 mb-4"
                          >
                            <Card elevation={2} sx={{ textAlign: 'center' }}>
                              <CardActionArea>
                                <CardContent>
                                  <Avatar
                                    alt={list.users.firstName}
                                    src={`${imgurl}/bitmoji/${list.userId}.jpg`}
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
                                    {list.users.firstName} {list.users.lastName}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                  >
                                    {list.league} | {list.total}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="container my-3">
                  <TextField
                    fullWidth
                    label="Search Members"
                    variant="outlined"
                    className="mb-3 mb-md-0"
                    onChange={e => handleChange(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" color="white">
                          <FaSearch />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="container align-items-center d-flex justify-content-center">
                  <div className="col m-2">
                    {userSearchData &&
                      userSearchData.length > 0 &&
                      userSearchData.map((data, index) => {
                        let ranknum = 4;
                        return (
                          <div key={index} className="row mb-2">
                            <Card elevation={2}>
                              <CardContent>
                                <div className="align-items-center d-flex justify-content-center">
                                  <span className="me-3">
                                    <Typography
                                      component="h1"
                                      variant="h6"
                                      color="text.secondary"
                                    >
                                      #{ranknum + index}
                                    </Typography>
                                  </span>
                                  <Avatar
                                    alt={data.users.firstName}
                                    src={`${imgurl}/bitmoji/${data.userId}.jpg`}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      margin: 'auto',
                                    }}
                                  />
                                  <div style={{ width: '50%' }}>
                                    <span className="d-none d-md-block ms-2">
                                      <Typography component="h2" variant="h6">
                                        {data.users.firstName}
                                        {data.users.lastName}
                                      </Typography>
                                    </span>
                                  </div>
                                  <Avatar
                                    alt={data.league}
                                    src={
                                      data.league === 'DIAMOND'
                                        ? Diamond
                                        : data.league === 'GOLD'
                                        ? Gold
                                        : data.league === 'SILVER'
                                        ? Silver
                                        : data.league === 'BRONZE'
                                        ? Bronze
                                        : data.league === 'COPPER'
                                        ? Copper
                                        : ''
                                    }
                                    variant="square"
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      margin: 'auto',
                                    }}
                                  />
                                  <div
                                    className="d-flex flex-column justify-content-end align-items-end"
                                    style={{ width: '60%' }}
                                  >
                                    <Typography component="h2" variant="h6">
                                      {data.total}
                                    </Typography>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}
