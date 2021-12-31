/**
 *
 * RankingCrew
 *
 */
import * as React from 'react';

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

import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { FaSearch } from 'react-icons/fa';
import { RiAddFill } from 'react-icons/ri';

interface Props {}

export function RankingCrew(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const top3List = [
    { name: 'Raksha', league: 'Bronze', rank: '1', score: '210' },
    { name: 'Veroni', league: 'Diamond', rank: '3', score: '100' },
    { name: 'Josh', league: 'Silver', rank: '8', score: '50' },
  ];

  const ranklist = [
    { name: 'Jesin', league: 'Silver', rank: '8', score: '50' },
    { name: 'Subi', league: 'Silver', rank: '8', score: '50' },
  ];

  const [userData, setUserData] = useState(ranklist);

  // const phaseList = [
  //   { label: 'Phase I', id: 1 },
  //   { label: 'Phase II', id: 2 },
  //   { label: 'Phase III', id: 3 },
  // ];

  function handleChange(searchedVal: string | null) {
    if (searchedVal === '' || searchedVal === null) {
      setUserData(ranklist);
    } else {
      const filteredUser = ranklist.filter(row =>
        row.name.toLowerCase().includes(searchedVal.toLowerCase()),
      );
      console.log(filteredUser, searchedVal);
      setUserData(filteredUser);
    }
  }

  return (
    <>
      {/* <Autocomplete
        disablePortal
        onClick={handleOpen}
        id="clear-on-escape"
        clearOnEscape
        options={phaseList}
        renderInput={params => <TextField {...params} label="Select Phase" />}
      /> */}
      <section className="vh-100">
        <div className="d-flex justify-content-end p-4">
          <Button onClick={handleOpen}>Phase I</Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            elevation={2}
            sx={{
              display: 'flex',
              textAlign: 'center',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              padding: 2,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Avatar
                alt="Raksha"
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
              <Typography id="modal-modal-title" component="h2" variant="h5">
                Raksha V G - Phase I
              </Typography>
              <List id="modal-modal-description">
                <ListSubheader>
                  <div className="d-flex justify-content-between">
                    <span className="text-start">EVENT</span>
                    <span>SCORE</span>
                  </div>
                </ListSubheader>
                <ListItem>
                  <ListItemIcon>
                    <RiAddFill />
                  </ListItemIcon>
                  <ListItemText primary="INTACTO" />
                  <div className="d-flex justify-content-end">
                    <ListItemText primary="2" />
                  </div>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RiAddFill />
                  </ListItemIcon>
                  <ListItemText primary="FESTX" />
                  <div className="d-flex justify-content-end">
                    <ListItemText primary="5" />
                  </div>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Modal>
        <div className="container my-4">
          <div className="row">
            {
              //ranklist.length > 3 &&
              ranklist.map((list, index) => {
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
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {list.league} | {list.score}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="container my-3">
          <TextField
            label="Search Members"
            id="outlined-start-adornment"
            className="mb-3 mb-md-0 w-md-50 text-white"
            onChange={e => handleChange(e.target.value)}
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
            {ranklist.map((list, index) => {
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
                            #{index + 1}
                          </Typography>
                        </span>
                        <Avatar
                          alt={list.name}
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
                              {list.name}
                            </Typography>
                          </span>
                        </div>
                        <Avatar
                          alt={list.league}
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
                            {list.score}
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
