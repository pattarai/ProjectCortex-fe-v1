/**
 *
 * RankingCrew
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
import AvatarIcon from './images/raksha.png';
import Diamond from './images/diamond.png';
import { FaSearch } from 'react-icons/fa';
import Modal from '@mui/material/Modal';
import MemberScoreCard from './MemberScoreCard';
import axios from 'axios';
interface MemberData {
  rank: string;
  score: number;
  league: string;
}

export function RankingCrew() {
  const [openPopup, setOpenPopup] = useState(false);

  const top3List = [
    { name: 'Raksha', league: 'Bronze', rank: '1', score: '210' },
    { name: 'Veroni', league: 'Diamond', rank: '3', score: '100' },
    { name: 'Josh', league: 'Silver', rank: '8', score: '50' },
  ];

  // const details = [
  //   { name: 'Jesin', league: 'Silver', rank: '8', score: '50' },
  //   { name: 'Subi', league: 'Silver', rank: '8', score: '50' },
  // ];

  const [userData, setUserData] = useState<MemberData[] | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/ranking').then(res => {
      const user = res.data.data;
      console.log(user);
      setUserData(user);
    });
  }, []);

  // function handleChange(searchedVal: string | null) {
  //   if (searchedVal === '' || searchedVal === null) {
  //     setUserData(top3List);
  //   } else {
  //     const filteredUser = top3List.filter(row =>
  //       row.name.toLowerCase().includes(searchedVal.toLowerCase()),
  //     );
  //     console.log(filteredUser, searchedVal);
  //     setUserData(filteredUser);
  //   }
  // }

  return (
    <>
      <section className="vh-100">
        <div className="d-flex justify-content-end p-4">
          <Button
            sx={{ color: '#dee2fc' }}
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            Score Details
          </Button>
        </div>
        <Modal
          open={openPopup}
          onClose={setOpenPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MemberScoreCard />
        </Modal>
        <div className="container my-4">
          <div className="row">
            {top3List.map((list, index) => {
              return (
                <div key={index} className="col-12 col-md-4 mb-4">
                  <Card elevation={2} sx={{ textAlign: 'center' }}>
                    <CardActionArea>
                      <CardContent>
                        <Avatar
                          alt={list.name}
                          src={AvatarIcon}
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
                          {list.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {list.league} | {list.score}
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
            label="Search Members"
            className="mb-3 mb-md-0 w-md-50"
            //onChange={e => handleChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="container align-items-center d-flex justify-content-center">
          <div className="col m-2">
            {userData &&
              userData.length > 0 &&
              userData.map((data, index) => {
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
                              #{data.rank}
                            </Typography>
                          </span>
                          <Avatar
                            alt="hi"
                            src={AvatarIcon}
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
                                Raksha
                              </Typography>
                            </span>
                          </div>
                          <Avatar
                            alt={data.league}
                            src={Diamond}
                            variant="square"
                            sx={{
                              width: 40,
                              height: 40,
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
                              {data.score}
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
      </section>
    </>
  );
}
