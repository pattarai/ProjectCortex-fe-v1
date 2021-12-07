/**
 *
 * RankingCrew
 *
 */
import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, TextField } from '@mui/material';
import Img from '../DashboardLayout/subiksha.jpeg';

import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useProfileCommonViewSlice } from './slice';

interface Props {}

export function ProfileCommonView(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = [
    {
      dp: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/cf3851a824eee5981be13591f44bbd5f-1592046164/hitoridraws-prettyportrait-color/draw-your-dp-avatar-profile-pic-and-make-it-simple-and-cute.png',
      name: 'Subhiksha',
      project: 'Cortex',
      committee: 'Events',
      description: 'I love  Coding with Veroni',
    },
    {
      dp: 'data:image/jpeg;base64,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',
      name: 'Veroni',
      project: 'Helix',
      committee: 'HR',
      description: 'I love  Coding with Subhiksha',
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
      {/* <Autocomplete
         disablePortal
         onClick={handleOpen}
         id="clear-on-escape"
         clearOnEscape
         options={phaseList}
         renderInput={params => <TextField {...params} label="Select Phase" />}
       /> */}
      <div className="container my-3">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 1 }} />
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
            {userData.map((data, index) => (
              <div className="col-12 col-md-4 mb-4">
                <Card elevation={2} sx={{ textAlign: 'center' }}>
                  <CardActionArea>
                    <CardContent>
                      <Avatar
                        alt="Raksha"
                        src={data.dp}
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
                        {data.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {data.project}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {data.committee}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {data.description}
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
